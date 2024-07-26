const { VITE_LOCAL } = import.meta.env

import { storyService as local } from './story.service.local.js'
import { storyService as remote } from './story.service.remote.js'

function getEmptyStory() {
    return {
        txt: '',
        imgUrl: '',
        by: {
            _id: '',
            fullname: '',
            imgUrl: ''
        },
        likedBy: [],
        comments: []
    }
}

function getDefaultFilter() {
    return {
        by: {
            _id: '',
            fullname: ''
        }
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const storyService = { getEmptyStory, getDefaultFilter, ...service }