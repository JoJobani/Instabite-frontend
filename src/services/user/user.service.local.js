import demoUsers from '../../../demoData/demoUsers.json'
import { storageService } from '../async-storage.service'
import adminPicture from '../../assets/img/adminPicture.jpg'

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
    const user = await storageService.post(STORAGE_KEY, userCred)
    return saveLoggedinUser(user)
}

async function logout() {
    sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
}

function getLoggedinUser() {
    //temp hardcoded user
    return {
        _id: 'admin',
        username: 'jona_menashe',
        fullname: 'Jonathan Menashe',
        imgUrl: adminPicture,
        bio: 'Lorem ipsum odor amet, consectetuer adipiscing elit. Magna dis arcu mus ligula habitasse ex fames dignissim condimentum iaculis non fusce fames finibus sapien imperdiet cursus bibendum',
        followers: [],
        following: [],
        savedStories: [],
        taggedStories: [],
        isAdmin: true
    }
    // return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
}

function saveLoggedinUser(user) {
    user = {
        _id: user._id,
        fullname: user.fullname,
        imgUrl: user.imgUrl,
        isAdmin: user.isAdmin
    }
    sessionStorage.setItem(STORAGE_KEY_LOGGEDIN_USER, JSON.stringify(user))
    return user
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