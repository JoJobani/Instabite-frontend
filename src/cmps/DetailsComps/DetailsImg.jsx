export function DetailsImg({ story, toggleLike }) {
    return (
        <div className="details-img"
            onDoubleClick={() => toggleLike(story._id)}>
            <img
                src={story.imgUrl}
                alt={story.txt}
            />
        </div>
    )
}