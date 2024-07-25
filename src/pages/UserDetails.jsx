import { useEffect, useState } from 'react'
import { NavLink, useNavigate, Outlet, useOutletContext } from 'react-router-dom'
import { useSelector } from 'react-redux'
import { loadStories } from "../store/actions/story.actions.js"
import { ImgGrid } from "../cmps/ImgGrid.jsx"
import ShowUploaded from '../assets/svg/ShowUploaded.svg?react'
import ShowSaved from '../assets/svg/ShowSaved.svg?react'
import ShowTagged from '../assets/svg/ShowTagged.svg?react'

export function UserDetails() {
    const navigate = useNavigate()
    const user = useSelector(storeState => storeState.userModule.user)
    const stories = useSelector(storeState => storeState.storyModule.stories)
    //set if the profile were looking at belongs to the user or someone else
    const isUserLogged = true

    useEffect(() => {
        loadStories({ byUserId: user._id })
    }, [])

    function onStoryClick(storyId) {
        navigate(`/p/${storyId}`)
    }

    if (!stories || !stories.length) return <div>loading...</div>

    return (
        <section className="user-details">

            <header>
                <div className="user-img">
                    <img src={user.imgUrl} />
                </div>
                <div className="user-info">
                    <div className="user-headline">
                        <p>{user.username}</p>
                        {isUserLogged
                            ? <div className="user-btns">
                                <a >
                                    Edit profile
                                </a>
                            </div>
                            : <div className='user-btns'>
                                <button>
                                    Follow
                                </button>
                                <button>
                                    Message
                                </button>
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
                <NavLink to="saved" className={({ isActive }) => `tab ${isActive ? 'selected' : ''}`}>
                    <ShowSaved />
                    <p>SAVED</p>
                </NavLink>
                <NavLink to="tagged" className={({ isActive }) => `tab ${isActive ? 'selected' : ''}`}>
                    <ShowTagged />
                    <p>TAGGED</p>
                </NavLink>
            </section>

            <Outlet context={{ user, stories, onStoryClick }} />
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
    const { user, onStoryClick } = useOutletContext()
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