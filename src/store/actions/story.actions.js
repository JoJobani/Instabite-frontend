import { storyService } from '../../services/story'
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
        return savedStory
    } catch (err) {
        console.log('Cannot add story', err)
        throw err
    }
}

export async function updateStory(story) {
    try {
        const savedStory = await storyService.save(story)
        store.dispatch({ type: UPDATE_STORY, story })
        return savedStory
    } catch (err) {
        console.log('Cannot save story', err)
        throw err
    }
}

//Optimistic function
export async function toggleStoryLike(storyId, likingUser, isLiked) {
    try {
        if (isLiked) {
            store.dispatch({ type: REMOVE_LIKE, storyId, likingUser })
        } else {
            store.dispatch({ type: ADD_LIKE, storyId, likingUser })
        }
        await storyService.toggleLike(storyId)
    } catch (err) {
        store.dispatch({ type: STORY_UNDO })
        console.log('Cannot like story', err)
        throw err
    }
}

export async function addStoryComment(storyId, txt) {
    try {
        const story = await storyService.addStoryComment(storyId, txt)
        store.dispatch({ type: UPDATE_STORY, story })
    } catch (err) {
        console.log('Cannot add story comment', err)
        throw err
    }
}

export async function removeStoryComment(storyId, commentId) {
    try {
        const story = await storyService.removeStoryComment(storyId, commentId)
        store.dispatch({ type: UPDATE_STORY, story })
        return story
    } catch (err) {
        console.log('Couldnt remove comment', err)
        throw err
    }
}