import { Link } from "react-router-dom"
import { useState } from "react"
// import { ReactComponent as Like } from '../assets/svg/Like.svg'
// import { ReactComponent as Comment } from '../assets/svg/Comment.svg'
// import { ReactComponent as Share } from '../assets/svg/Share.svg'
// import { ReactComponent as Save } from '../assets/svg/Save.svg'

export function StoryPreview({ story }) {
    const [commentToAdd, setCommentToAdd] = useState('')

    return (
        <section className="story-preview">
            <section className="user-header">
                <img src={story.by.imgUrl} />
                <p>{story.by.fullname}</p>
            </section>
            <img src={story.imgUrl} alt={story.txt} />

            <section className="story-controls">
                <div className="story-controls-right">

                    {/* <Comment /> */}
                    {/* <Share /> */}
                </div>
                <div className="story-controls-left">
                    {/* <Save /> */}
                </div>
            </section>

            <section className="story-likes">
                <p>{story.likedBy.length} likes</p>
            </section>

            <section className="story-user-txt">
                <div className="user">
                    {story.by.fullname}
                </div>
                <div className="txt">
                    {story.txt}
                </div>
            </section>

            <section className="story-comments">

            </section>

            <form className="comment-form">
                <input
                    type="text"
                    placeholder="Add a comment..."
                />
            </form>
        </section>
    )
}