const { VITE_LOCAL } = import.meta.env

import { userService as local } from './user.service.local'
import { userService as remote } from './user.service.remote'

function getEmptyUser() {
    return {
        username: '',
        password: '',
        fullname: '',
        imgUrl: '',
        bio: '',
        followers: [],
        following: [],
        uploadedStories: [],
        savedStories: [],
        taggedStories: [],
        isAdmin: false
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const userService = { ...service, getEmptyUser }