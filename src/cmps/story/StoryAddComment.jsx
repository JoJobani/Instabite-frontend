import { useState } from 'react'

import Emoji from '../../assets/svg/Emoji.svg?react'

export function StoryAddComment({ story, addComment }) {
    const [comment, setComment] = useState('')

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
        <section className="add-comment">
            <form
                onSubmit={onAddComment}>
                <textarea
                    value={comment}
                    onChange={handleChange}
                    className="comment-input"
                    name="comment"
                    placeholder="Add a comment..."
                    autoComplete="off"
                />
                {comment &&
                    <button>
                        Post
                    </button>
                }
            </form>
            <Emoji />
        </section>
    )
}