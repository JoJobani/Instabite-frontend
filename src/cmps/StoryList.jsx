import { StoryPreview } from "./StoryPreview.jsx"

export function StoryList({ stories }) {
    return (
        <ul className="story-list">
            {stories.map(story =>
            (<li key={story._id}>
                <StoryPreview story={story} />
            </li>)
            )}
        </ul>
    )
}