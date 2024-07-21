import { StoryPreview } from "./StoryPreview.jsx"

export function StoryList({
    stories,
    clickUser,
    clickMore,
    toggleLike,
    addComment,
    openComments,
    shareStory,
    saveStory,
    openLikedBy
}) {
    return (
        <ul className="story-list">
            {stories.map(story =>
            (<li key={story._id}>
                <StoryPreview
                    story={story}
                    clickUser={clickUser}
                    clickMore={clickMore}
                    toggleLike={toggleLike}
                    addComment={addComment}
                    openComments={openComments}
                    shareStory={shareStory}
                    saveStory={saveStory}
                    openLikedBy={openLikedBy}
                />
            </li>)
            )}
        </ul>
    )
}