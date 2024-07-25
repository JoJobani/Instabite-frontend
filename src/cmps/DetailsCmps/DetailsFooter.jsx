import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Like from '../../assets/svg/Like.svg?react'
import Unlike from '../../assets/svg/Unlike.svg?react'
import Comment from '../../assets/svg/Comment.svg?react'
import Share from '../../assets/svg/Share.svg?react'
import Save from '../../assets/svg/Save.svg?react'
import Emoji from '../../assets/svg/Emoji.svg?react'

export function DetailsFooter({ story, toggleLike, shareStory, saveStory, openLikedBy, addComment }) {

    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const isLiked = story.likedBy.find(user => user._id === loggedInUser._id)
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
        addComment(story._id, comment)
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
                    <div onClick={() => toggleLike(story._id, loggedInUser, isLiked)}>
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
                    <div onClick={() => saveStory(story._id)}>
                        <Save />
                    </div>
                </div>
            </div>

            <div className="story-likes" onClick={() => openLikedBy(story._id)}>
                {story.likedBy.length} likes
            </div>

            <div className='story-date'>
                some time ago
            </div>

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