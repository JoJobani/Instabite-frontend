export function StoryCommentCount({ story, openDetails }) {

    return (
        <section
            className="comment-count"
            onClick={() => openDetails(story._id)}
        >
            View all {story.comments.length} Comments
        </section>
    )
}