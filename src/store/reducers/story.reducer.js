export const SET_STORIES = 'SET_STORIES'
export const REMOVE_STORY = 'REMOVE_STORY'
export const ADD_STORY = 'ADD_STORY'
export const UPDATE_STORY = 'UPDATE_STORY'
export const ADD_LIKE = 'ADD_LIKE'
export const REMOVE_LIKE = 'REMOVE_LIKE'
export const STORY_UNDO = 'STORY_UNDO'


const initialState = {
    stories: [],
    lastStories: []
}

export function storyReducer(state = initialState, action) {
    var stories
    switch (action.type) {
        case SET_STORIES:
            return { ...state, stories: action.stories }
        case REMOVE_STORY:
            stories = state.stories.filter(story => story._id !== action.storyId)
            return { ...state, stories }
        case ADD_STORY:
            return { ...state, stories: [action.story, ...state.stories] }
        case UPDATE_STORY:
            stories = state.stories.map(story => (story._id === action.story._id) ? action.story : story)
            return { ...state, stories }
        case ADD_LIKE:
            stories = state.stories.map(story => (story._id === action.storyId)
                ? { ...story, likedBy: [...story.likedBy, action.user] }
                : story)
            return { ...state, stories, lastStories: state.stories }
        case REMOVE_LIKE:
            stories = state.stories.map(story => (story._id === action.storyId)
                ? { ...story, likedBy: story.likedBy.filter(liker => liker._id !== action.user._id) }
                : story)
            return { ...state, stories, lastStories: state.stories }

        case STORY_UNDO:
            return { ...state, stories: [...state.lastStories] }
        default:
            return state
    }
}