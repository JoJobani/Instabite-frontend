import { useEffect } from "react"
import { useSelector } from "react-redux"
import { showSuccessMsg, showErrorMsg } from "../services/event-bus.service.js"
import { loadStories, removeStory, addStory } from "../store/actions/story.actions.js"
import { StoryList } from "../cmps/StoryList.jsx"

export function StoryIndex() {
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const isLoading = useSelector(storeState => storeState.systemModule.isLoading)

    useEffect(() => {
        loadStories()
    }, [])

    return (
        <main className="story-index">
            {!isLoading
                ? <StoryList stories={stories} />
                : <div>Loading...</div>
            }
        </main>
    )
}