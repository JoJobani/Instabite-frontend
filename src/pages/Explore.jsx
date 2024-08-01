import { useState, useEffect } from 'react'
import { useNavigate } from "react-router"
import { useSelector } from "react-redux"
import { shuffleArray } from '../services/util.service.js'
import { ImgGrid } from "../cmps/ImgGrid.jsx"

export function Explore() {
    const navigate = useNavigate()
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    const [shuffledStories, setShuffeledStories] = useState([])

    useEffect(() => {
        let storiesToShow = shuffleArray([...stories])
        storiesToShow = storiesToShow.filter(story => story.by._id !== loggedInUser._id)
        setShuffeledStories(storiesToShow)
    }, [stories])

    function onStoryClick(storyId) {
        navigate(`/p/${storyId}`)
    }

    return (
        <div className="explore">
            <ImgGrid stories={shuffledStories} onStoryClick={onStoryClick} />
        </div>
    )
}