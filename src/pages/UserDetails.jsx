import { useEffect, useState, useRef } from 'react'
import { NavLink, useNavigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { ImgGrid } from "../cmps/ImgGrid.jsx"
import { storyService } from '../services/story'
import ShowUploaded from '../assets/svg/ShowUploaded.svg?react'
import ShowSaved from '../assets/svg/ShowSaved.svg?react'
import ShowTagged from '../assets/svg/ShowTagged.svg?react'
import { getRandomInt } from '../services/util.service.js'

export function UserDetails() {
    const navigate = useNavigate()
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const users = useSelector(storeState => storeState.userModule.users)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [user, setUser] = useState(null)
    const [userStories, setUserStories] = useState(null)
    const [savedStories, setSavedStories] = useState(null)
    const [taggedStories, setTaggedStories] = useState(null)
    const { userRoute } = useParams()

    //temp fake followers
    const followers = useRef(getRandomInt(100, 1000))
    const following = useRef(getRandomInt(100, 1000))

    useEffect(() => {
        loadUser()
    }, [userRoute, users])

    useEffect(() => {
        if (user) loadUserStories()
    }, [user, stories])

    function loadUser() {
        let foundUser = users.find(user => user.username === userRoute)
        setUser(foundUser)
    }

    async function loadUserStories() {
        let userStories = await storyService.query({ identifier: user._id, field: 'by._id' })
        setUserStories(userStories)
        let savedStories = await storyService.query({ identifier: user._id, field: 'savedBy' })
        setSavedStories(savedStories)
        let taggedStories = await storyService.query({ identifier: user._id, field: 'taggedUsers' })
        setTaggedStories(taggedStories)
    }

    function onStoryClick(storyId) {
        navigate(`/p/${storyId}`)
    }

    if (!user) return <div>Loading...</div>

    return (
        <section className="user-details">

            <header>
                <div className="user-img">
                    <img src={user.imgUrl} />
                </div>
                <div className="user-info">
                    <div className="user-headline">
                        <p>{user.username}</p>
                        {(loggedInUser.username === userRoute)
                            ? <div className="user-btns">
                                <button >Edit profile</button>
                            </div>
                            : <div className='user-btns'>
                                <button className='follow-btn'>Follow</button>
                                <button>Message</button>
                            </div>}
                    </div>
                    <div className="user-stats">
                        <p><span>{userStories ? `${userStories.length}` : '0'}</span> posts</p>
                        {/* <p><span>{user.followers.length}</span> followers</p>
                        <p><span>{user.following.length}</span> following</p> */}
                        <p><span>{followers.current}</span> followers</p>
                        <p><span>{following.current}</span> following</p>
                    </div>
                    <div className="user-texts">
                        <p className='fullname'>{user.fullname}</p>
                        <p className='bio'>{user.bio}</p>
                    </div>
                </div>
            </header>

            <section className='story-type'>
                <NavLink to="" end className={({ isActive }) => `tab ${isActive ? 'selected' : ''}`}>
                    <ShowUploaded />
                    <p>POSTS</p>
                </NavLink>
                {(loggedInUser.username === userRoute) &&
                    <NavLink to="saved" className={({ isActive }) => `tab ${isActive ? 'selected' : ''}`}>
                        <ShowSaved />
                        <p>SAVED</p>
                    </NavLink>
                }
                <NavLink to="tagged" className={({ isActive }) => `tab ${isActive ? 'selected' : ''}`}>
                    <ShowTagged />
                    <p>TAGGED</p>
                </NavLink>
            </section>

            <Outlet context={{ user, loggedInUser, stories, userStories, savedStories, taggedStories, onStoryClick }} />
        </section>
    )
}

export function UploadedStories() {
    const { userStories, onStoryClick } = useOutletContext()
    if (!userStories) return
    return (
        <ImgGrid stories={userStories} onStoryClick={onStoryClick} />
    )
}

export function SavedStories() {
    const { user, loggedInUser, savedStories, onStoryClick } = useOutletContext()
    const navigate = useNavigate()

    useEffect(() => {
        if (user.username !== loggedInUser.username) {
            navigate(`/${user.username}`)
        }
    }, [savedStories])

    return (
        <ImgGrid stories={savedStories} onStoryClick={onStoryClick} />
    )
}

export function TaggedStories() {
    const { onStoryClick, taggedStories } = useOutletContext()
    return (
        <ImgGrid stories={taggedStories} onStoryClick={onStoryClick} />
    )
}