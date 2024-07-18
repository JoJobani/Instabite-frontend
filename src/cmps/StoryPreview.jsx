import { Link } from "react-router-dom"
import { useState } from "react"
import Like from '../assets/svg/Like.svg?react'
import Comment from '../assets/svg/Comment.svg?react'
import Share from '../assets/svg/Share.svg?react'
import Save from '../assets/svg/Save.svg?react'
import MoreOptions from '../assets/svg/MoreOptions.svg?react'
import Emoji from '../assets/svg/Emoji.svg?react'

export function StoryPreview({ story }) {
    const [commentToAdd, setCommentToAdd] = useState('')

    return (
        <section className="story-preview">
            <section className="user-header">
                <div className="header-left">
                    <div
                        className="profile-link"
                        onClick={() => console.log('clicked user')}>
                        <img src={story.by.imgUrl} />
                        <p>{story.by.fullname}</p>
                    </div>
                </div>
                <div className="header-right">
                    <div
                        onClick={() => console.log('clicked more')}>
                        <MoreOptions />
                    </div>
                </div>

            </section>
            <img src={story.imgUrl} alt={story.txt} />

            <section className="story-controls">
                <div className="story-controls-left">
                    <Like />
                    <Comment />
                    <Share />
                </div>
                <div className="story-controls-right">
                    <Save />
                </div>
            </section>

            <section className="story-likes">
                {story.likedBy.length} likes
            </section>

            <section className="story-txt">
                <p className="user">{story.by.fullname}</p>
                {story.txt}
            </section>

            <section className="story-comments">
                placeholder view all comments
            </section>

            <section className="comment-row">
                <form>
                    <textarea
                        className="comment-input"
                        name="comment"
                        placeholder="Add a comment..."
                        autoComplete="off">
                    </textarea>
                </form>
                <Emoji />
            </section>

        </section>
    )
}