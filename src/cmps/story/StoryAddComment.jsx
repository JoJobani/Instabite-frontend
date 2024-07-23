import { useState, useRef, useEffect } from 'react'
import Emoji from '../../assets/svg/Emoji.svg?react'

export function StoryAddComment({ story, addComment }) {
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
    )
}