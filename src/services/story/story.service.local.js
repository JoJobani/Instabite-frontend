import { storageService } from '../async-storage.service'
import { userService } from '../user'

const STORAGE_KEY = 'storyDB'

export const storyService = {
    query,
    getById,
    save,
    remove
}

async function query(filterBy = { byUserId: '' }) {
    var stories = await storageService.query(STORAGE_KEY)
    if (!stories || !stories.length) {
        console.log('adding demo stories...')
        _demoStories()
    }
    if (filterBy.byUserId) {
        stories = stories.filter(story => filterBy.byUserId === story.by._id)
    }
    return stories
}

async function getById(storyId) {
    return await storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story, isDemo = false) {
    if (isDemo) {
        const uploader = await userService.getById(story.by._id)
        const storyToSave = {
            txt: story.txt,
            imgUrl: story.imgUrl,
            by: uploader,
            comments: [],
            likedBy: []
        }
        return await storageService.post(STORAGE_KEY, storyToSave)
    }
    if (story._id) {
        return await storageService.put(STORAGE_KEY, story)
    } else {
        const storyToSave = {
            txt: story.txt,
            imgUrl: story.imgUrl,
            by: story.by,
            comments: [],
            likedBy: []
        }
        return await storageService.post(STORAGE_KEY, storyToSave)
    }
}