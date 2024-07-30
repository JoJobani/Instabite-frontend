import { StoryPreview } from "./StoryPreview.jsx"

export function StoryList({
    stories,
    clickUser,
    onOpenOptions,
    toggleLike,
    addComment,
    openDetails,
    shareStory,
    toggleSave,
    openLikedBy
}) {
    return (
        <ul className="story-list">
            {stories.map(story =>
            (<li key={story._id}>
                <StoryPreview
                    story={story}
                    clickUser={clickUser}
                    onOpenOptions={onOpenOptions}
                    toggleLike={toggleLike}
                    addComment={addComment}
                    openDetails={openDetails}
                    shareStory={shareStory}
                    toggleSave={toggleSave}
                    openLikedBy={openLikedBy}
                />
            </li>)
            )}
        </ul>
    )
}