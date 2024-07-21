import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { loadStories, loadStory, removeStory, toggleStoryLike, addStoryComment } from "../store/actions/story.actions.js"
import { userService } from "../services/user/index.js"
import { storyService } from "../services/story/index.js"
import { StoryList } from "../cmps/StoryList.jsx"
import { StoryOptionsModal } from "../cmps/StoryOptionsModal.jsx"

export function StoryIndex() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const [focusedStory, setFocuesdStory] = useState(null)
    const [openedStoryOptions, setOpenedStoryOptions] = useState(false)

    useEffect(() => {
        awaitLoad()
    }, [stories])

    async function awaitLoad() {
        try {
            await loadStories()
        } catch (err) {
            console.log(err)
        }
    }

    function clickUser(userId) {
        console.log(`clicked user ${userId}`)
    }

    async function clickMore(storyId) {
        const story = await storyService.getById(storyId)
        setFocuesdStory(story)
        setOpenedStoryOptions(true)
    }

    function onCloseMore() {
        setOpenedStoryOptions(false)
        setFocuesdStory(null)
    }

    async function onRemoveStory() {
        try {
            await removeStory(focusedStory._id)
            onCloseMore()
        } catch (err) {
            console.log(err)
        }
    }

    async function toggleLike(storyId) {
        try {
            await toggleStoryLike(storyId)
        } catch (err) {
            console.log(err)
        }
    }

    async function addComment(storyId, txt) {
        try {
            console.log('click')
            await addStoryComment(storyId, txt)
        } catch (err) {
            console.log(err)
        }
    }

    function openComments(storyId) {
        console.log(`open comments for ${storyId}`)
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
            {openedStoryOptions &&
                <StoryOptionsModal
                    focusedStory={focusedStory}
                    onCloseMore={onCloseMore}
                    onRemoveStory={onRemoveStory} />}
            {!stories || !stories.length
                ? <div>Loading...</div>
                : <StoryList
                    stories={stories}
                    clickUser={clickUser}
                    clickMore={clickMore}
                    toggleLike={toggleLike}
                    addComment={addComment}
                    openComments={openComments}
                    shareStory={shareStory}
                    saveStory={saveStory}
                    openLikedBy={openLikedBy}
                />
            }
        </main>
    )
}