import { StoryHeader } from "./story/StoryHeader.jsx"
import { StoryImg } from "./story/StoryImg.jsx"
import { StoryControls } from "./story/StoryControls.jsx"
import { StoryLikes } from "./story/StoryLikes.jsx"
import { StoryText } from "./story/StoryText.jsx"
import { StoryCommentCount } from "./story/StoryCommentCount.jsx"
import { StoryAddComment } from "./story/StoryAddComment.jsx"

export function StoryPreview({
    story,
    clickUser,
    clickMore,
    toggleLike,
    addComment,
    openDetails,
    shareStory,
    saveStory,
    openLikedBy
}) {
    return (
        <section className="story-preview">
            <StoryHeader
                story={story}
                clickUser={clickUser}
                clickMore={clickMore}
            />
            <StoryImg
                story={story}
                toggleLike={toggleLike}
            />
            <StoryControls
                story={story}
                toggleLike={toggleLike}
                openDetails={openDetails}
                shareStory={shareStory}
                saveStory={saveStory}
            />
            <StoryLikes
                story={story}
                openLikedBy={openLikedBy}
            />
            <StoryText
                story={story}
                isDetailsOpen={false}
                clickUser={clickUser}
            />
            <StoryCommentCount
                story={story}
                openDetails={openDetails}
            />
            <StoryAddComment
                story={story}
                addComment={addComment}
            />
        </section>
    )
}