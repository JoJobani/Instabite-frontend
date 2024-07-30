import { useState } from "react"
import { useSelector } from "react-redux"
import { useNavigate } from "react-router-dom"
import { removeStory, toggleStoryLike, addStoryComment, toggleStorySave } from "../store/actions/story.actions.js"
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

    function openDetails(storyId) {
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

    async function toggleLike(story, user) {
        try {
            await toggleStoryLike(story, user)
        } catch (err) {
            console.log(err)
        }
    }

    async function toggleSave(story, user) {
        try {
            toggleStorySave(story, user)
        } catch (err) {
            console.log(err)
        }
    }

    async function addComment(story, user, txt) {
        try {
            await addStoryComment(story, user, txt)
        } catch (err) {
            console.log(err)
        }
    }

    //TODO
    function shareStory(storyId) {
        console.log(`sharing story ${storyId}`)
    }

    //TODO
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
                        toggleSave={toggleSave}
                        openLikedBy={openLikedBy}
                    />
                    <SuggestionsBar />
                </div>
            }
        </main>
    )
}