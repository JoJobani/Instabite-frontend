import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'
import { timeAgoExtended } from '../../services/util.service.js'

import Like from '../../assets/svg/Like.svg?react'
import Unlike from '../../assets/svg/Unlike.svg?react'
import Comment from '../../assets/svg/Comment.svg?react'
import Share from '../../assets/svg/Share.svg?react'
import Save from '../../assets/svg/Save.svg?react'
import Unsave from '../../assets/svg/Unsave.svg?react'
import Emoji from '../../assets/svg/Emoji.svg?react'

export function DetailsFooter({ story, toggleLike, shareStory, toggleSave, openLikedBy, addComment }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const isSaved = story.savedBy.find(userId => userId === loggedInUser._id)
    const isLiked = story.likedBy.find(user => user._id === loggedInUser._id)
    let formattedTime = timeAgoExtended(+story.createdAt)
    const [comment, setComment] = useState('')
    const textareaRef = useRef(null)

    useEffect(() => {
        adjustHeight()
    }, [comment])

    function adjustHeight() {
        const textarea = textareaRef.current
        if (textarea) {
            textarea.style.height = '18px'
            textarea.style.height = `${Math.min(Math.max(textarea.scrollHeight, 18), 80)}px`
        }
    }

    function onAddComment(ev) {
        ev.preventDefault()
        addComment(story, loggedInUser, comment)
        setComment('')
    }

    function handleChange(ev) {
        const value = ev.target.value
        setComment(value)
    }

    return (
        <section className='details-footer'>

            <div className="story-controls">
                <div className="story-controls-left">
                    <div onClick={() => toggleLike(story, loggedInUser)}>
                        {isLiked
                            ? <Unlike fill="red" />
                            : <Like />}
                    </div>
                    <div>
                        <Comment />
                    </div>
                    <div onClick={() => shareStory(story._id)}>
                        <Share />
                    </div>
                </div>
                <div className="story-controls-right">
                    <div onClick={() => toggleSave(story, loggedInUser)}>
                        {isSaved ? <Unsave /> : <Save />}
                    </div>
                </div>
            </div>

            <div className="story-likes" onClick={() => openLikedBy(story._id)}>
                {story.likedBy.length > 0 ? `${story.likedBy.length} likes` : ''}
            </div>
            <p className='timestamp'>{`${formattedTime}`}</p>
            <div className="add-comment">
                <Emoji />
                <form onSubmit={onAddComment}>
                    <textarea
                        ref={textareaRef}
                        value={comment}
                        onChange={handleChange}
                        name="comment"
                        placeholder="Add a comment..."
                        autoComplete="off"
                    />
                    {comment && <button>Post</button>}
                </form>
            </div>

        </section>
    )
}