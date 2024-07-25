

export function ImgGrid({ stories, onStoryClick }) {
    return (
        <ul className="img-grid">
            {stories.map(story => (
                <li key={story._id}>
                    <img src={story.imgUrl} onClick={() => onStoryClick(story._id)} />
                </li>
            ))}
        </ul>
    )
}