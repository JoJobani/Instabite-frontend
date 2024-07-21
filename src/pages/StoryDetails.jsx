import { useRef, useEffect } from 'react'

import { StoryHeader } from "./story/StoryHeader.jsx"
import { StoryImg } from "./story/StoryImg.jsx"
import { StoryControls } from "./story/StoryControls.jsx"
import { StoryLikes } from "./story/StoryLikes.jsx"
import { StoryText } from "./story/StoryText.jsx"
import { StoryComments } from "./story/StoryComments.jsx"

export function StoryDetails({
    story,
    clickUser,
    clickMore,
    toggleLike,
    addComment,
    shareStory,
    saveStory,
    openLikedBy
}) {
    const modalContentRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (modalContentRef.current && !modalContentRef.current.contains(ev.target)) {
                onCloseModal()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className='modal-overlay'>
            <div className='story-img'>
                <StoryImg
                    story={story}
                    toggleLike={toggleLike}
                />
            </div>
            <div className='story-info'>
                <StoryHeader
                    story={story}
                    clickUser={clickUser}
                    clickMore={clickMore}
                />
                <StoryControls
                    story={story}
                    toggleLike={toggleLike}
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
                    addComment={addComment}
                />
            </div>

        </div>
    )
}