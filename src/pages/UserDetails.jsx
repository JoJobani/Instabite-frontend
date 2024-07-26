import { useEffect, useState } from 'react'
import { NavLink, useNavigate, Outlet, useOutletContext, useParams } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadUsers } from '../store/actions/user.actions.js'
import { loadStories } from "../store/actions/story.actions.js"
import { ImgGrid } from "../cmps/ImgGrid.jsx"
import ShowUploaded from '../assets/svg/ShowUploaded.svg?react'
import ShowSaved from '../assets/svg/ShowSaved.svg?react'
import ShowTagged from '../assets/svg/ShowTagged.svg?react'


export function UserDetails() {
    const navigate = useNavigate()
    const stories = useSelector(storeState => storeState.storyModule.stories)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [user, setUser] = useState(null)
    const { userRoute } = useParams()

    useEffect(() => {
        loadUserPage()
    }, [userRoute])

    async function loadUserPage() {
        try {
            const users = await loadUsers()
            let foundUser = users.find(user => user.username === userRoute)
            setUser(foundUser)
            await loadStories({ byUserId: foundUser._id })
        } catch (err) {
            console.log(err)
        }
    }

    function onStoryClick(storyId) {
        navigate(`/p/${storyId}`)
    }

    if (!stories || !user) return <div>loading...</div>

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
                        <p><span>{stories.length}</span> stories</p>
                        <p><span>{user.followers.length}</span> followers</p>
                        <p><span>{user.following.length}</span> following</p>
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
                    <p>STORIES</p>
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

            <Outlet context={{ user, loggedInUser, stories, navigate, onStoryClick }} />
        </section>
    )
}

export function UploadedStories() {
    const { stories, onStoryClick } = useOutletContext()
    return (
        <ImgGrid stories={stories} onStoryClick={onStoryClick} />
    )
}

export function SavedStories() {
    const { user, loggedInUser, navigate, onStoryClick } = useOutletContext()

    useEffect(() => {
        if (user.username !== loggedInUser.username) {
            navigate(`/${user.username}`)
        }
    }, [])

    return (
        <ImgGrid stories={user.savedStories} onStoryClick={onStoryClick} />
    )
}

export function TaggedStories() {
    const { user, onStoryClick } = useOutletContext()
    return (
        <ImgGrid stories={user.taggedStories} onStoryClick={onStoryClick} />
    )
}