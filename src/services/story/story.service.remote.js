import { httpService } from '../http.service'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryComment
}

async function query(filterBy = {}) {
    return httpService.get(`story`, filterBy)
}

function getById(storyId) {
    return httpService.get(`story/${storyId}`)
}

async function remove(storyId) {
    return httpService.delete(`story/${storyId}`)
}
async function save(story) {
    var savedStory
    if (story._id) {
        savedStory = await httpService.put(`story/${story._id}`, story)
    } else {
        savedStory = await httpService.post('story', story)
    }
    return savedStory
}

async function addStoryComment(storyId, txt) {
    return await httpService.post(`story/${storyId}/comment`, {txt})
}