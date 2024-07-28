import { userService } from '../../services/user'
import { socketService } from '../../services/socket.service'
import { store } from '../store'
import { LOADING_DONE, LOADING_START } from '../reducers/system.reducer'
import { REMOVE_USER, SET_USER, SET_USERS, SET_WATCHED_USER } from '../reducers/user.reducer'

export async function loadUsers(filterBy) {
    try {
        store.dispatch({ type: LOADING_START })
        const users = await userService.getUsers(filterBy)
        store.dispatch({ type: SET_USERS, users })
        return users
    } catch (err) {
        console.log('UserActions: err in loadUsers', err)
    } finally {
        store.dispatch({ type: LOADING_DONE })
    }
}

export async function removeUser(userId) {
    try {
        await userService.remove(userId)
        store.dispatch({ type: REMOVE_USER, userId })
    } catch (err) {
        console.log('UserActions: err in removeUser', err)
    }
}

export async function login(credentials) {
    try {
        const user = await userService.login(credentials)
        store.dispatch({ type: SET_USER, user })
        // socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot login', err)
        throw err
    }
}

export async function signup(credentials) {
    try {
        const user = await userService.signup(credentials)
        store.dispatch({ type: SET_USER, user })
        // socketService.login(user._id)
        return user
    } catch (err) {
        console.log('Cannot signup', err)
        throw err
    }
}

export async function logout() {
    try {
        await userService.logout()
        store.dispatch({ type: SET_USER, user: null })
        // socketService.logout()
    } catch (err) {
        console.log('Cannot logout', err)
        throw err
    }
}

export async function loadUser(userId) {
    try {
        const user = await userService.getById(userId)
        store.dispatch({ type: SET_WATCHED_USER, user })
    } catch (err) {
        console.log('Cannot load user', err)
    }
}

export async function saveStory(story, user) {
    try {
        const idx = user.savedStories.findIndex(storyItem => storyItem._id === story._id)
        if (idx === -1) {
            user.savedStories.push(story)
        } else {
            user.savedStories.splice(idx, 1)
        }
        user = await userService.update(user)
        store.dispatch({ type: SET_USER, user })
        return user
    } catch (err) {
        console.log('Cannot save story', err)
    }
}