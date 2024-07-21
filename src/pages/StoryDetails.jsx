import { useRef, useEffect } from 'react'
import { useSelector } from "react-redux"

import { StoryHeader } from "../cmps/story/StoryHeader.jsx"
import { StoryImg } from "../cmps/story/StoryImg.jsx"
import { StoryControls } from "../cmps/story/StoryControls.jsx"
import { StoryLikes } from "../cmps/story/StoryLikes.jsx"
import { StoryText } from "../cmps/story/StoryText.jsx"
import { StoryComments } from '../cmps/story/StoryComments.jsx'
import { StoryAddComment } from "../cmps/story/StoryAddComment.jsx"

export function StoryDetails({
    clickUser,
    clickMore,
    toggleLike,
    addComment,
    shareStory,
    saveStory,
    openLikedBy,
    onCloseModal
}) {
    const modalContentRef = useRef(null)
    const story = useSelector(storeState => storeState.storyModule.story)

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
            <div className='story-details' ref={modalContentRef}>
                <StoryImg
                    story={story}
                    toggleLike={toggleLike}
                />
                <div className='story-info'>
                    <StoryHeader
                        story={story}
                        clickUser={clickUser}
                        clickMore={clickMore}
                    />
                    <div className='details-main'>
                        <StoryText
                            story={story}
                            isDetailsOpen={true}
                            clickUser={clickUser}
                        />
                        <StoryComments
                            story={story}
                        />
                    </div>
                    <div className='details-footer'>
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
                        <StoryAddComment
                            story={story}
                            addComment={addComment}
                        />
                    </div>
                </div>
            </div>
        </div>
    )
}