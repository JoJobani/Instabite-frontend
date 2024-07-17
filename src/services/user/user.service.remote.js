import { httpService } from '../http.service'

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
}

function getUsers() {
	return httpService.get(`user`)
}

async function getById(userId) {
	return await httpService.get(`user/${userId}`)
}

function remove(userId) {
	return httpService.delete(`user/${userId}`)
}

async function update(updatedUser) {
	const user = await httpService.put(`user/${_id}`, ...updatedUser)

	// When admin updates other user's details, do not update loggedinUser
	const loggedinUser = getLoggedinUser()
	if (loggedinUser._id === user._id) saveLoggedinUser(user)

	return user
}

async function login(userCred) {
	const user = await httpService.post('auth/login', userCred)
	if (user) return saveLoggedinUser(user)
}

async function signup(userCred) {
	if (!userCred.imgUrl) userCred.imgUrl = 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
	userCred.following = []
	userCred.followers = []
	userCred.likedStories = []
	userCred.savedStories = []
	const user = await httpService.post('auth/signup', userCred)
	return saveLoggedinUser(user)
}

async function logout() {
	sessionStorage.removeItem(STORAGE_KEY_LOGGEDIN_USER)
	return await httpService.post('auth/logout')
}

function getLoggedinUser() {
	return JSON.parse(sessionStorage.getItem(STORAGE_KEY_LOGGEDIN_USER))
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