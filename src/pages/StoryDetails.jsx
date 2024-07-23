import { useRef, useEffect, useState } from 'react'
import { useNavigate, useParams } from "react-router-dom"
import {
    removeStory,
    toggleStoryLike,
    addStoryComment,
    removeStoryComment
} from "../store/actions/story.actions.js"
import { storyService } from '../services/story/index.js'
import { StoryHeader } from "../cmps/story/StoryHeader.jsx"
import { StoryImg } from "../cmps/story/StoryImg.jsx"
import { StoryControls } from "../cmps/story/StoryControls.jsx"
import { StoryLikes } from "../cmps/story/StoryLikes.jsx"
import { StoryText } from "../cmps/story/StoryText.jsx"
import { StoryCommentList } from '../cmps/story/StoryCommentList.jsx'
import { StoryAddComment } from "../cmps/story/StoryAddComment.jsx"
import { StoryOptionsModal } from "../cmps/StoryOptionsModal.jsx"

export function StoryDetails() {
    const navigate = useNavigate()
    const modalContentRef = useRef(null)
    const [story, setStory] = useState(null)
    const { storyId } = useParams()
    const [openedStoryOptions, setOpenedStoryOptions] = useState(false)

    useEffect(() => {
        loadStory()
    }, [storyId, story])

    async function loadStory() {
        try {
            let story = await storyService.getById(storyId)
            setStory(story)
        } catch (err) {
            console.log(err)
        }
    }

    function handleClickOutside(ev) {
        if (!openedStoryOptions && modalContentRef.current && !modalContentRef.current.contains(ev.target)) {
            onCloseDetails()
        }
    }

    function onCloseDetails() {
        navigate('/')
    }

    function onOpenOptions() {
        setOpenedStoryOptions(true)
    }

    function onCloseOptions() {
        setOpenedStoryOptions(false)
    }

    async function toggleLike(storyId) {
        try {
            await toggleStoryLike(storyId)
        } catch (err) {
            console.log(err)
        }
    }

    function clickUser(userId) {
        console.log(`clicked user ${userId}`)
    }

    async function addComment(storyId, txt) {
        try {
            await addStoryComment(storyId, txt)
        } catch (err) {
            console.log(err)
        }
    }

    async function onRemoveComment(storyId, commentId) {
        try {
            await removeStoryComment(storyId, commentId)
        } catch (err) {
            console.log(err)
        }
    }

    async function onRemoveStory() {
        try {
            if (!confirm('Are you sure you want to delete this story?')) return
            navigate('/')
            await removeStory(story._id)
        } catch (err) {
            console.log(err)
        }
    }

    function openLikedBy(storyId) {
        console.log(`opening likes page for story ${storyId}`)
    }

    function shareStory(storyId) {
        console.log(`sharing story ${storyId}`)
    }

    function saveStory(storyId) {
        console.log(`saving story ${storyId}`)
    }

    if (!story) return

    return (
        <div className='modal-overlay' onClick={handleClickOutside}>
            {openedStoryOptions &&
                <StoryOptionsModal
                    onCloseOptions={onCloseOptions}
                    onRemoveStory={onRemoveStory}
                />}

            <div className='story-details' ref={modalContentRef}>
                <StoryImg
                    story={story}
                    toggleLike={toggleLike}
                />
                <div className='story-info'>
                    <StoryHeader
                        story={story}
                        clickUser={clickUser}
                        onOpenOptions={onOpenOptions}
                    />
                    <div className='details-main'>
                        <StoryText
                            story={story}
                            clickUser={clickUser}
                        />
                        <StoryCommentList
                            story={story}
                            onRemoveComment={onRemoveComment}
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