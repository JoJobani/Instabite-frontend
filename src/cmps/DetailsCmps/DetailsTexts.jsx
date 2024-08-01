import { useRef } from 'react'
import { getRandomInt } from '../../services/util.service.js'
import MoreOptions from '../../assets/svg/MoreOptions.svg?react'
import Like from '../../assets/svg/Like.svg?react'
import Unlike from '../../assets/svg/Unlike.svg?react'

export function DetailsTexts({ story, clickUser, onRemoveComment }) {

    //temp func to assign random like numbers
    const likesRef = useRef({})
    function getLikes(likesRef, commentId) {
        if (!likesRef.current[commentId]) {
            likesRef.current[commentId] = getRandomInt(0, 100)
        }
        return likesRef.current[commentId]
    }

    return (
        <section className="details-texts">

            <div className="story-txt">
                <img src={story.by.imgUrl} onClick={() => clickUser(story.by._id)} />
                <p>
                    <span
                        className="user"
                        onClick={() => clickUser(story.by._id)}
                    >
                        {story.by.username}
                    </span>
                    {" " + story.txt}
                </p>
            </div>

            <ul className="story-comment-list">
                {story.comments.map(comment => (
                    <li key={comment.id}>
                        <div className='comment-info'>
                            <img
                                src={comment.by.imgUrl}
                                onClick={() => clickUser(comment.by._id)}
                            />
                            <div>
                                <p>
                                    <span
                                        className="user"
                                        onClick={() => clickUser(comment.by._id)}
                                    >
                                        {comment.by.username}
                                    </span>
                                    {" " + comment.txt}
                                </p>
                                <div className='comment-controls'>
                                    <p>
                                        {getLikes(likesRef, comment.id)} likes
                                    </p>
                                    <p>Reply</p>
                                    <button
                                        className='comment-options'
                                        onClick={() => onRemoveComment(story, comment.id)}>
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