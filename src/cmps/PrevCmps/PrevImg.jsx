import { useSelector } from "react-redux"

export function PrevImg({ story, toggleLike }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    return (
        <div className="prev-img"
            onDoubleClick={() => toggleLike(story, loggedInUser)}>
            <img
                src={story.imgUrl}
                alt={story.txt}
            />
        </div>
    )
}