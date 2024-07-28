import demoStories from '../../../demoData/demoStories.json'
import { storageService } from '../async-storage.service'
import { makeId } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'storyDB'

export const storyService = {
    query,
    getById,
    save,
    remove,
    toggleLike,
    addStoryComment,
    removeStoryComment
}

_demoStories()

async function query(filterBy = { byUserId: '' }) {
    var stories = await storageService.query(STORAGE_KEY)
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
        const storyToSave = {
            _id: story._id,
            txt: story.txt,
            comments: story.comments,
            likedBy: story.likedBy
        }
        return await storageService.put(STORAGE_KEY, storyToSave)
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

async function toggleLike(storyId, likingUser) {
    const story = await getById(storyId)
    const idx = story.likedBy.findIndex(user => user._id === likingUser._id)
    if (idx === -1) {
        story.likedBy.push(likingUser)
    } else {
        story.likedBy.splice(idx, 1)
    }
    return await storageService.put(STORAGE_KEY, story)
}

async function addStoryComment(storyId, txt) {
    const story = await getById(storyId)
    const comment = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    story.comments.push(comment)
    return await storageService.put(STORAGE_KEY, story)
}

async function removeStoryComment(storyId, commentId) {
    const story = await getById(storyId)
    const commentIdx = story.comments.findIndex(comment => commentId === comment.id)
    story.comments.splice(commentIdx, 1)
    return await storageService.put(STORAGE_KEY, story)
}

async function _demoStories() {
    await userService.addDemoUsers()
    let stories = await query()
    if (!stories || !stories.length) {
        console.log('loading demo stories...')
        for (let story of demoStories) {
            await save(story, true)
        }
        console.log('finished loading stories')
    }
}