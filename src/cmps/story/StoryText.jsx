export function StoryText({ story, clickUser }) {

    return (
        <section className="story-txt">
            <p
                className="user"
                onClick={clickUser}
            >
                {story.by.fullname}
            </p>
            {story.txt}
        </section>
    )
}