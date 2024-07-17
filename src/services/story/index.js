const { DEV, VITE_LOCAL } = import.meta.env

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
        comments: [],
        likedBy: []
    }
}

const service = VITE_LOCAL === 'true' ? local : remote
export const storyService = { getEmptyStory, ...service }

// Easy access to this service from the dev tools console
// when using script - dev / dev:local

if (DEV) window.storyService = storyService
