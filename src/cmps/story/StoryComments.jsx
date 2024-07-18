import { useState } from 'react'
import Emoji from '../../assets/svg/Emoji.svg?react'

export function StoryComments({ story, openComments, addComment }) {
    const [comment, setComment] = useState('')

    function onAddComment(ev) {
        ev.preventDefault()
        addComment(commentToAdd)
    }

    function handleChange(ev) {
        const value = ev.target.value
        setComment(value)
    }

    return (
        <div className="story-comments">
            <section
                className="comment-count"
                onClick={openComments}
            >
                View all {story.comments.length} Comments
            </section>
            <section className="add-comment">
                <form
                    onSubmit={onAddComment}>
                    <textarea
                        value={comment}
                        onChange={handleChange}
                        className="comment-input"
                        name="comment"
                        placeholder="Add a comment..."
                        autoComplete="off">
                    </textarea>
                </form>
                <Emoji />
            </section>
        </div>
    )
}