export function PrevImg({ story, toggleLike }) {
    return (
        <div className="prev-img"
            onDoubleClick={() => toggleLike(story._id)}>
            <img
                src={story.imgUrl}
                alt={story.txt}
            />
        </div>
    )
}