import { useEffect, useState } from "react"
import { useSelector } from "react-redux"
import { loadStories, loadStory, removeStory, toggleStoryLike, addStoryComment } from "../store/actions/story.actions.js"
import { StoryList } from "../cmps/StoryList.jsx"
import { StoryOptionsModal } from "../cmps/StoryOptionsModal.jsx"
import { StoryDetails } from "./StoryDetails.jsx"

export function StoryIndex() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const story = useSelector(storeState => storeState.storyModule.story)
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
        await loadStory(storyId)
        setOpenedStoryOptions(true)
    }

    async function openDetails(storyId) {
        await loadStory(storyId)
        setOpenedStoryDetails(true)
    }

    function onCloseModal() {
        setOpenedStoryOptions(false)
        setOpenedStoryDetails(false)
        loadStory(null)
    }

    async function onRemoveStory() {
        try {
            await removeStory(story._id)
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