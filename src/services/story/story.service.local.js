
import { storageService } from '../async-storage.service'
import { makeId, makeLorem } from '../util.service'
import { userService } from '../user'

const STORAGE_KEY = 'storyDB'

export const storyService = {
    query,
    getById,
    save,
    remove,
    addStoryComment
}

_demoStories()

//For debugging
window.cs = storyService

async function query(filterBy = {}) {
    var stories = await storageService.query(STORAGE_KEY)
    if (filterBy.by) {
        stories = stories.filter(story => filterBy.by._id === story.by._id)
    }
    return stories
}

function getById(storyId) {
    return storageService.get(STORAGE_KEY, storyId)
}

async function remove(storyId) {
    await storageService.remove(STORAGE_KEY, storyId)
}

async function save(story) {
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
            by: _getTestUser(),
            // by: userService.getLoggedinUser(),
            comments: [],
            likedBy: []
        }
        return await storageService.post(STORAGE_KEY, storyToSave)
    }
}

async function addStoryComment(storyId, txt) {
    const story = await getById(storyId)
    const comment = {
        id: makeId(),
        by: userService.getLoggedinUser(),
        txt
    }
    story.comments.push(comment)
    await storageService.put(STORAGE_KEY, story)
    return comment
}

async function _demoStories() {
    let stories = query()
    if (!stories || !stories.length) {
        for (let i = 0; i < 5; i++) {
            const story = {
                txt: makeLorem(5),
                imgUrl: 'https://picsum.photos/200',
            }
            await save(story)
        }
    }
}

function _getTestUser() {
    return {
        _id: 'u101',
        fullname: 'mr tester',
        imgUrl: 'https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg'
    }
}