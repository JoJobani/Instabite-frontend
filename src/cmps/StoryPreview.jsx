import { PrevHeader } from "./PrevComps/PrevHeader.jsx"
import { PrevImg } from "./PrevComps/PrevImg.jsx"
import { PrevFooter } from "./PrevComps/PrevFooter.jsx"

export function StoryPreview({
    story,
    clickUser,
    onOpenOptions,
    toggleLike,
    addComment,
    openDetails,
    shareStory,
    saveStory,
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
                saveStory={saveStory}
                openLikedBy={openLikedBy}
                clickUser={clickUser}
                addComment={addComment}
            />
        </section>
    )
}