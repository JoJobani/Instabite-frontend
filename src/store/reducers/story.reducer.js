export const SET_STORIES = 'SET_STORIES'
export const SET_STORY = 'SET_STORY'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'

const initialState = {
    stories: [],
    story: null
}

export function storyReducer(state = initialState, action) {
    var stories
    switch (action.type) {
        case SET_STORIES:
            return { ...state, stories: action.stories }
        case SET_STORY:
            return { ...state, story: action.story }
        case REMOVE_STORY:
            stories = state.stories.filter(story => story._id !== action.storyId)
            return { ...state, stories }
        case ADD_STORY:
            return { ...state, stories: [action.story, ...state.stories] }
        case UPDATE_STORY:
            stories = state.stories.map(story => (story._id === action.story._id) ? action.story : story)
            return { ...state, stories }
        default:
            return state
    }
}