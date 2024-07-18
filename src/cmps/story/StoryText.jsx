export function StoryText({ story, clickUser }) {

    return (
        <section className="story-txt">
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