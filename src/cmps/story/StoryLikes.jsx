export function StoryLikes({ story, openLikedBy }) {

    return (
        <section
            className="story-likes"
            onClick={() => openLikedBy(story._id)}>
            {story.likedBy.length} likes
        </section>
    )
}