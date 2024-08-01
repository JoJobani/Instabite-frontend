import { useState } from 'react'
import { NavLink } from 'react-router-dom'
import { useSelector } from 'react-redux'

import { SearchMenu } from './SearchMenu.jsx'
import { MoreMenu } from './MoreMenu.jsx'

import instaBite from '../assets/img/instaBite.png'
import logo from '../assets/img/logo.png'
import Home from '../assets/svg/Home.svg?react'
import HomeFocus from '../assets/svg/HomeFocus.svg?react'
import Search from '../assets/svg/Search.svg?react'
import Explore from '../assets/svg/Explore.svg?react'
import Messenger from '../assets/svg/Messenger.svg?react'
import Create from '../assets/svg/Create.svg?react'

export function AppNav({ onClickUpload }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [isSearchOpen, setIsSearchOpen] = useState(false)

    return (
        <section className="app-nav">
            <NavLink to='/' className='logo'>
                <img src={instaBite} />
                {/* <Instagram color="black" className='small-logo' /> */}
                <img src={logo} className='small-logo' />
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
                    <button className='link upload-btn' onClick={() => onClickUpload()}>
                        <Create />
                        <span>Create</span>
                    </button>
                    <NavLink to={`/${loggedInUser.username}`} className={({ isActive }) => `link ${isActive ? 'selected' : ''}`}>
                        <img src={loggedInUser.imgUrl} />
                        <span>Profile</span>
                    </NavLink>
                </nav>

                <nav className="lower-nav">
                    <MoreMenu />
                </nav>
            </section>
            {/* {isSearchOpen && <SearchMenu />} */}
        </section >
    )
}