import { PrevHeader } from "./PrevCmps/PrevHeader.jsx"
import { PrevImg } from "./PrevCmps/PrevImg.jsx"
import { PrevFooter } from "./PrevCmps/PrevFooter.jsx"

export function StoryPreview({
    story,
    clickUser,
    onOpenOptions,
    toggleLike,
    addComment,
    openDetails,
    shareStory,
    onSaveStory,
    openLikedBy
}) {
    return (
        <section className="story-preview">
            <PrevHeader
                story={story}
                clickUser={clickUser}
                onOpenOptions={onOpenOptions}
            />
            <PrevImg
                story={story}
                toggleLike={toggleLike}
            />
            <PrevFooter
                story={story}
                toggleLike={toggleLike}
                openDetails={openDetails}
                shareStory={shareStory}
                onSaveStory={onSaveStory}
                openLikedBy={openLikedBy}
                clickUser={clickUser}
                addComment={addComment}
            />
        </section>
    )
}