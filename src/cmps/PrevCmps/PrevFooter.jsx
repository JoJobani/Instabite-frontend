import { useState, useRef, useEffect } from 'react'
import { useSelector } from 'react-redux'

import Like from '../../assets/svg/Like.svg?react'
import Unlike from '../../assets/svg/Unlike.svg?react'
import Comment from '../../assets/svg/Comment.svg?react'
import Share from '../../assets/svg/Share.svg?react'
import Save from '../../assets/svg/Save.svg?react'
import Unsave from '../../assets/svg/Unsave.svg?react'
import Emoji from '../../assets/svg/Emoji.svg?react'

export function PrevFooter({ story, toggleLike, openDetails, shareStory, toggleSave, openLikedBy, clickUser, addComment }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const isSaved = story.savedBy.find(userId => userId === loggedInUser._id)
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
        addComment(story, loggedInUser, comment)
        setComment('')
    }

    function handleChange(ev) {
        const value = ev.target.value
        setComment(value)
    }

    return (
        <div className="prev-footer">
            <section className="story-controls">
                <div className="story-controls-left">
                    <div onClick={() => toggleLike(story, loggedInUser)}>
                        {isLiked ? <Unlike fill="red" /> : <Like />}
                    </div>
                    <div onClick={() => openDetails(story._id)}>
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
            </section>

            <section className="story-likes" onClick={() => openLikedBy(story._id)}>
                {story.likedBy.length > 0 ? `${story.likedBy.length} likes` : ''}
            </section>

            <section className="story-txt">
                <p>
                    <span
                        className="user"
                        onClick={() => clickUser(story.by._id)}
                    >
                        {story.by.fullname}
                    </span>
                    {" " + story.txt}
                </p>
            </section>

            <section className="comment-count" onClick={() => openDetails(story._id)}>
                {story.comments.length > 0 ? `View all ${story.comments.length} comments` : ''}
            </section>

            <section className="add-comment">
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
                <Emoji />
            </section>
        </div>
    )
}