import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeStory, toggleStoryLike, addStoryComment } from "../store/actions/story.actions.js"
import { StoryList } from "../cmps/StoryList.jsx"
import { SuggestionsBar } from "../cmps/SuggestionsBar.jsx"
import { StoryOptionsModal } from "../cmps/StoryOptionsModal.jsx"
import { userService } from "../services/user/index.js"

export function StoryIndex() {
    const navigate = useNavigate()
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const [focusedStoryId, setFocusedStoryId] = useState(null)

    async function clickUser(userId) {
        const user = await userService.getById(userId)
        navigate(`/${user.username}`)
    }

    async function openDetails(storyId) {
        navigate(`/p/${storyId}`)
    }

    async function onOpenOptions(storyId) {
        setFocusedStoryId(storyId)
    }

    function onCloseOptions() {
        setFocusedStoryId(null)
    }

    async function onRemoveStory() {
        try {
            if (!confirm('Are you sure you want to delete this story?')) return
            await removeStory(focusedStoryId)
            onCloseOptions()
        } catch (err) {
            console.log(err)
        }
    }

    async function toggleLike(storyId, likingUser, isLiked) {
        try {
            await toggleStoryLike(storyId, likingUser, isLiked)
        } catch (err) {
            console.log(err)
        }
    }

    async function addComment(storyId, txt) {
        try {
            await addStoryComment(storyId, txt)
        } catch (err) {
            console.log(err)
        }
    }

    function shareStory(storyId) {
        console.log(`sharing story ${storyId}`)
    }

    function saveStory(storyId) {
        console.log(`saving story ${storyId}`)
    }

    function openLikedBy(storyId) {
        console.log(`opening likes page for story ${storyId}`)
    }

    return (
        <main className="story-index">
            {focusedStoryId &&
                <StoryOptionsModal
                    onCloseOptions={onCloseOptions}
                    onRemoveStory={onRemoveStory} />}
            {!stories || !stories.length
                ? <div>Loading...</div>
                : <div className="index-content">
                    <StoryList
                        stories={stories}
                        clickUser={clickUser}
                        onOpenOptions={onOpenOptions}
                        toggleLike={toggleLike}
                        addComment={addComment}
                        openDetails={openDetails}
                        shareStory={shareStory}
                        saveStory={saveStory}
                        openLikedBy={openLikedBy}
                    />
                    <SuggestionsBar />
                </div>
            }
        </main>
    )
}