import { storyService } from '../../services/story'
import { makeId } from '../../services/util.service.js'
import { store } from '../store'
import {
    ADD_STORY,
    REMOVE_STORY,
    SET_STORIES,
    UPDATE_STORY,
    ADD_LIKE,
    REMOVE_LIKE,
    STORY_UNDO
} from '../reducers/story.reducer.js'

export async function loadStories(filterBy) {
    try {
        const stories = await storyService.query(filterBy)
        store.dispatch({ type: SET_STORIES, stories })
    } catch (err) {
        console.log('Cannot load stories', err)
        throw err
    }
}

export async function removeStory(storyId) {
    try {
        await storyService.remove(storyId)
        store.dispatch({ type: REMOVE_STORY, storyId })
    } catch (err) {
        console.log('Cannot remove story', err)
        throw err
    }
}

export async function addStory(story) {
    try {
        const savedStory = await storyService.save(story)
        store.dispatch({ type: ADD_STORY, story: savedStory })
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story) {
    try {
        await storyService.save(story)
        store.dispatch({ type: UPDATE_STORY, story })
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

//Optimistic function
export async function toggleStoryLike(story, userId) {
    try {
        const storyId = story._id
        const idx = story.likedBy.findIndex(user => user === userId)
        if (idx === -1) {
            store.dispatch({ type: ADD_LIKE, storyId, userId })
            story.likedBy.push(userId)
        } else {
            store.dispatch({ type: REMOVE_LIKE, storyId, userId })
            story.likedBy.splice(idx, 1)
        }
        await storyService.save(story)
    } catch (err) {
        store.dispatch({ type: STORY_UNDO })
        console.log('Cannot like story', err)
        throw err
    }
}

export async function addStoryComment(story, user, txt) {
    try {
        const miniUser = {
            _id: user._id,
            username: user.username,
            imgUrl: user.imgUrl
        }
        const comment = {
            id: makeId(),
            by: miniUser,
            txt
        }
        story.comments.push(comment)
        await storyService.save(story)
        store.dispatch({ type: UPDATE_STORY, story })
    } catch (err) {
        console.log('Cannot add story comment', err)
        throw err
    }
}

export async function removeStoryComment(story, commentId) {
    try {
        const commentIdx = story.comments.findIndex(comment => commentId === comment.id)
        story.comments.splice(commentIdx, 1)
        await storyService.save(story)
        store.dispatch({ type: UPDATE_STORY, story })
    } catch (err) {
        console.log('Couldnt remove comment', err)
        throw err
    }
}