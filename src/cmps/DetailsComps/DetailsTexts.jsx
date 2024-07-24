import MoreOptions from '../../assets/svg/MoreOptions.svg?react'

export function DetailsTexts({ story, clickUser, onRemoveComment }) {

    return (
        <section className="details-texts">

            <div className="story-txt">
                <img src={story.by.imgUrl} />
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

        </section>
    )
}