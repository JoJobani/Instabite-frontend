export function StoryComments({ story }) {

    return (
        <ul className="story-comments">
            {story.comments.map(comment => (
                <li key={comment.id}>
                    <img src={comment.by.imgUrl} />
                    <p>
                        <span
                            className="user"
                        >
                            {comment.by.fullname}
                        </span>
                        {" " + comment.txt}
                    </p>
                </li>
            ))}
        </ul>
    )
}