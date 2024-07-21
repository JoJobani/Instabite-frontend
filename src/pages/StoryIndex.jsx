import { useEffect } from "react"
import { useSelector } from "react-redux"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { loadStories, loadStory, removeStory, toggleStoryLike } from "../store/actions/story.actions.js"
import { userService } from "../services/user/index.js"
import { StoryList } from "../cmps/StoryList.jsx"

export function StoryIndex() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    useEffect(() => {
        awaitLoad()
    }, [])

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

    function clickMore(storyId) {
        console.log(`open options for ${storyId}`)
    }

    async function toggleLike(storyId) {
        try {
            await toggleStoryLike(storyId)
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
            {!stories || !stories.length
                ? <div>Loading...</div>
                : <StoryList
                    stories={stories}
                    clickUser={clickUser}
                    clickMore={clickMore}
                    toggleLike={toggleLike}
                    openComments={openComments}
                    shareStory={shareStory}
                    saveStory={saveStory}
                    openLikedBy={openLikedBy}
                />
            }
        </main>
    )
}