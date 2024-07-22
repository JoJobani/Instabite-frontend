import MoreOptions from '../../assets/svg/MoreOptions.svg?react'


export function StoryCommentList({ story, onRemoveComment }) {

    return (
        <ul className="story-comment-list">
            {story.comments.map(comment => (
                <li key={comment.id}>
                    <div className='comment-info'>
                        <img src={comment.by.imgUrl} />
                        <p>
                            <span
                                className="user"
                            >
                                {comment.by.fullname}
                            </span>
                            {" " + comment.txt}
                        </p>
                    </div>

                    <div
                        className="comment-controls"
                        onClick={() => onRemoveComment(story._id, comment.id)}>
                        <MoreOptions />
                    </div>
                </li>
            ))}
        </ul>
    )
}