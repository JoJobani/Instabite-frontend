import { useNavigate } from "react-router"
import { ImgGrid } from "../cmps/ImgGrid.jsx"
import { useSelector } from "react-redux"

export function Explore() {
    const navigate = useNavigate()
    const stories = useSelector(storeState => storeState.storyModule.stories)

    function onStoryClick(storyId) {
        navigate(`/p/${storyId}`)
    }

    return (
        <div className="explore">
            <ImgGrid stories={stories} onStoryClick={onStoryClick} />
        </div>
    )
}