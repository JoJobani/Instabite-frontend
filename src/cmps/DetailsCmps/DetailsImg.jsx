import { useSelector } from "react-redux"

export function DetailsImg({ story, toggleLike }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <div className="details-img"
            onDoubleClick={() => toggleLike(story, loggedInUser._id)}>
            <img
                src={story.imgUrl}
                alt={story.txt}
            />
        </div>
    )
}