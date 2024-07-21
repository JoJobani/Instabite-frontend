import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { loadStories, loadStory, removeStory, toggleStoryLike, addStoryComment } from "../store/actions/story.actions.js"
import { userService } from "../services/user/index.js"
import { storyService } from "../services/story/index.js"
import { StoryList } from "../cmps/StoryList.jsx"
import { StoryOptionsModal } from "../cmps/StoryOptionsModal.jsx"
import { StoryDetails } from "./StoryDetails.jsx"

export function StoryIndex() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const [focusedStory, setFocuesdStory] = useState(null)
    const [openedStoryOptions, setOpenedStoryOptions] = useState(false)
    const [openedStoryDetails, setOpenedStoryDetails] = useState(false)

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

    async function openDetails(storyId) {
        const story = await storyService.getById(storyId)
        setFocuesdStory(story)
        setOpenedStoryDetails(true)
    }

    function onCloseModal() {
        setOpenedStoryOptions(false)
        setOpenedStoryDetails(false)
        setFocuesdStory(null)
    }

    async function onRemoveStory() {
        try {
            await removeStory(focusedStory._id)
            onCloseModal()
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
            {openedStoryDetails &&
                <StoryDetails
                    story={focusedStory}
                    clickUser={clickUser}
                    clickMore={clickMore}
                    toggleLike={toggleLike}
                    addComment={addComment}
                    shareStory={shareStory}
                    saveStory={saveStory}
                    openLikedBy={openLikedBy}
                    onCloseModal={onCloseModal}
                />}
            {openedStoryOptions &&
                <StoryOptionsModal
                    focusedStory={focusedStory}
                    onCloseModal={onCloseModal}
                    onRemoveStory={onRemoveStory} />}
            {!stories || !stories.length
                ? <div>Loading...</div>
                : <StoryList
                    stories={stories}
                    clickUser={clickUser}
                    clickMore={clickMore}
                    toggleLike={toggleLike}
                    addComment={addComment}
                    openDetails={openDetails}
                    shareStory={shareStory}
                    saveStory={saveStory}
                    openLikedBy={openLikedBy}
                />
            }
        </main>
    )
}