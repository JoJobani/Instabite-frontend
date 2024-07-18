export function StoryImg({ story, toggleLike }) {
    return (
        <div className="story-img"
            onDoubleClick={() => toggleLike(story._id)}>
            <img
                src={story.imgUrl}
                alt={story.txt}
            />
        </div>
    )
}