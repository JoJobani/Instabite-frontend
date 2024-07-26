export const SET_USER = 'SET_USER'
export const SET_USERS = 'SET_USERS'
export const SET_WATCHED_USER = 'SET_WATCHED_USER'
export const REMOVE_USER = 'REMOVE_USER'

const initialState = {
    loggedInUser: null,
    users: [],
    watchedUser: null
}

export function userReducer(state = initialState, action) {
    switch (action.type) {
        case SET_USER:
            return { ...state, loggedInUser: action.user }
        case SET_USERS:
            return { ...state, users: action.users }
        case SET_WATCHED_USER:
            return { ...state, watchedUser: action.user }
        case REMOVE_USER:
            return {
                ...state,
                users: state.users.filter(user => user._id !== action.userId)
            }
        default:
            return state
    }
}