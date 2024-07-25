import MoreOptions from '../../assets/svg/MoreOptions.svg?react'
import Like from '../../assets/svg/Like.svg?react'
import Unlike from '../../assets/svg/Unlike.svg?react'

export function DetailsTexts({ story, clickUser, onRemoveComment }) {

    return (
        <section className="details-texts">

            <div className="story-txt">
                <img src={story.by.imgUrl} onClick={() => clickUser(story.by._id)} />
                <p>
                    <span
                        className="user"
                        onClick={() => clickUser(story.by._id)}
                    >
                        {story.by.fullname}
                    </span>
                    {" " + story.txt}
                </p>
            </div>

            <ul className="story-comment-list">
                {story.comments.map(comment => (
                    <li key={comment.id}>
                        <div className='comment-info'>
                            <img src={comment.by.imgUrl} />
                            <div>
                                <p>
                                    <span className="user">
                                        {comment.by.fullname}
                                    </span>
                                    {" " + comment.txt}
                                </p>
                                <div className='comment-controls'>
                                    <p>
                                        0 likes
                                    </p>
                                    <p>Reply</p>
                                    <button
                                        className='comment-options'
                                        onClick={() => onRemoveComment(story._id, comment.id)}>
                                        <MoreOptions />
                                    </button>
                                </div>
                            </div>
                        </div>
                        <div className="like-comment">
                            <Like />
                        </div>
                    </li>
                ))}
            </ul>

        </section>
    )
}