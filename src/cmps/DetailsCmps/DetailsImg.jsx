import { useSelector } from "react-redux"

export function DetailsImg({ story, toggleLike }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const isLiked = story.likedBy.find(user => user._id === loggedInUser._id)

    return (
        <div className="details-img"
            onDoubleClick={() => toggleLike(story._id, loggedInUser, isLiked)}>
            <img
                src={story.imgUrl}
                alt={story.txt}
            />
        </div>
    )
}