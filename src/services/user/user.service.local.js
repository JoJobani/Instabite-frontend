import demoUsers from '../../../demoData/demoUsers.json'
import { storageService } from '../async-storage.service'

const STORAGE_KEY = 'userDB'
const STORAGE_KEY_LOGGEDIN_USER = 'loggedinUser'

export const userService = {
    login,
    logout,
    signup,
    getUsers,
    getById,
    remove,
    update,
    getLoggedinUser,
    saveLoggedinUser,
    toggleStorySave,
    addDemoUsers
}

async function getUsers(filterBy = {}) {
    const users = await storageService.query(STORAGE_KEY)
    return users.map(user => {
        delete user.password
        return user
    })
}

async function getById(userId) {
    return await storageService.get(STORAGE_KEY, userId)
}

function remove(userId) {
    return storageService.remove(STORAGE_KEY, userId)
}

async function update(updatedUser) {
    const user = await storageService.get(STORAGE_KEY, updatedUser._id)
    user.fullname = updatedUser.fullname
    user.imgUrl = updatedUser.imgUrl
    await storageService.put(STORAGE_KEY, user)

    const loggedinUser = getLoggedinUser()
    if (loggedinUser._id === user._id) saveLoggedinUser(user)

    return user
}

async function login(userCred) {
    const users = await storageService.query(STORAGE_KEY)
    const user = users.find(user => user.username === userCred.username
        && user.password === userCred.password)

    if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
    if (!userCred.imgUrl) userCred.imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
    if (!userCred.bio) userCred.bio = ''
    userCred.followers = []
    userCred.following = []
    userCred.savedStories = []
    userCred.taggedStories = []
    if (userCred.isAdmin) userCred.isAdmin = true
    return await storageService.post(STORAGE_KEY, userCred)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
}

async function toggleStorySave(storyToSave, savingUser) {
    const idx = savingUser.savedStories.find(story => story._id === storyToSave._id)
    if (idx === -1) {
        savingUser.savedStories.push(storyToSave)
    } else {
        savingUser.savedStories.splice(idx, 1)
    }
    return await storageService.put(STORAGE_KEY, savingUser)
}

async function addDemoUsers() {
    let users = await getUsers()
    if (!users || !users.length) {
        console.log('no users found. loading new users. please wait for a couple of seconds')
        for (let user of demoUsers) {
            await signup(user)
        }
        console.log('finished loading users')
    }
}