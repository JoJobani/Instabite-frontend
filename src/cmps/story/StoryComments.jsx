export function StoryComments({ story, openDetails }) {

    return (
        <section
            className="comment-count"
            onClick={() => openDetails(story._id)}
        >
            View all {story.comments.length} Comments
        </section>
    )
}