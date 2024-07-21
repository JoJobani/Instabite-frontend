export function StoryText({ story, isDetailsOpen, clickUser }) {

    return (
        <section className="story-txt">
            {isDetailsOpen &&
                <img src={story.by.imgUrl} />
            }
            <p>
                <span
                    className="user"
                    onClick={() => clickUser(story.by._id)}
                >
                    {story.by.fullname}
                </span>
                {" " + story.txt}
            </p>
        </section>
    )
}