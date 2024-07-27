import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SearchMenu } from './SearchMenu.jsx'
import { MoreMenu } from './MoreMenu.jsx'

import instaClone from '../assets/img/instaClone.png'
import Home from '../assets/svg/Home.svg?react'
import HomeFocus from '../assets/svg/HomeFocus.svg?react'
import Search from '../assets/svg/Search.svg?react'
import Explore from '../assets/svg/Explore.svg?react'
import Messenger from '../assets/svg/Messenger.svg?react'
import Create from '../assets/svg/Create.svg?react'
import Hamburger from '../assets/svg/Hamburger.svg?react'

export function AppNav({ onClickUpload }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [isSearchOpen, setIsSearchOpen] = useState(false)
    const [isMoreOpen, setIsMoreOpen] = useState(false)

    return (
        <section className="app-nav">
            <NavLink to='/' className='logo'>
                <img src={instaClone} alt="logo" />
            </NavLink>

            <section className='nav-bar'>
                <nav className='main-nav'>
                    <NavLink to='/' className={({ isActive }) => `link ${isActive ? 'selected' : ''}`}>
                        {({ isActive }) => (
                            <>
                                {isActive ? <HomeFocus /> : <Home />}
                                <span>Home</span>
                            </>
                        )}
                    </NavLink>
                    <button
                        className={`link ${isSearchOpen ? 'selected' : ''}`}
                        onClick={() => setIsSearchOpen(!isSearchOpen)}
                    >
                        <Search />
                        <span>Search</span>
                    </button>
                    <NavLink to='/explore' className={({ isActive }) => `link ${isActive ? 'selected' : ''}`}>
                        <Explore />
                        <span>Explore</span>
                    </NavLink>
                    <NavLink to='/direct' className={({ isActive }) => `link ${isActive ? 'selected' : ''}`}>
                        <Messenger />
                        <span>Messages</span>
                    </NavLink>
                    <button className='link' onClick={() => onClickUpload()}>
                        <Create />
                        <span>Create</span>
                    </button>
                    <NavLink to={`/${loggedInUser.username}`} className={({ isActive }) => `link ${isActive ? 'selected' : ''}`}>
                        <img src={loggedInUser.imgUrl} />
                        <span>Profile</span>
                    </NavLink>
                </nav>

                <nav className="lower-nav">
                    <button
                        className={`link ${isMoreOpen ? 'selected' : ''}`}
                        onClick={() => setIsMoreOpen(!isMoreOpen)}
                    >
                        <Hamburger />
                        <span>More</span>
                    </button>
                </nav>
            </section>
            {/* {isSearchOpen && <SearchMenu />}
            {isMoreOpen && <MoreMenu />} */}
        </section >
    )
}