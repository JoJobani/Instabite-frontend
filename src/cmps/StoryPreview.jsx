import { useState } from 'react'

import { StoryHeader } from "./story/StoryHeader.jsx"
import { StoryImg } from "./story/StoryImg.jsx"
import { StoryControls } from "./story/StoryControls.jsx"
import { StoryLikes } from "./story/StoryLikes.jsx"
import { StoryText } from "./story/StoryText.jsx"
import { StoryComments } from "./story/StoryComments.jsx"

export function StoryPreview({
    story,
    clickUser,
    clickMore,
    toggleLike,
    openComments,
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
                openComments={openComments}
                shareStory={shareStory}
                saveStory={saveStory}
            />
            <StoryLikes
                story={story}
                openLikedBy={openLikedBy}
            />
            <StoryText
                story={story}
                clickUser={clickUser}
            />
            <StoryComments
                story={story}
                openComments={openComments}
            />
        </section>
    )
}