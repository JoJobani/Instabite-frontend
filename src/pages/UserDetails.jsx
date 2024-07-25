import { NavLink, Outlet } from 'react-router-dom'
import { useSelector } from 'react-redux'
import ShowUploaded from '../assets/svg/ShowUploaded.svg?react'
import ShowSaved from '../assets/svg/ShowSaved.svg?react'
import ShowTagged from '../assets/svg/ShowTagged.svg?react'

export function UserDetails() {
    const user = useSelector(storeState => storeState.userModule.user)
    //set if the profile were looking at belongs to the user or someone else
    const isUserLogged = true

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
                        <p><span>{user.uploadedStories.length}</span> stories</p>
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

            <Outlet />

        </section>
    )
}

export function UploadedStories() {
    return (
        <p>Stories uploaded by the user</p>
    )
}

export function SavedStories() {
    return (
        <p>Stories saved by the user</p>
    )
}

export function TaggedStories() {
    return (
        <p>Stories where the user is tagged</p>
    )
}