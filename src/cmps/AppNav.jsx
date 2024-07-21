import { Link, NavLink } from 'react-router-dom'
import { useNavigate } from 'react-router'
import { useSelector } from 'react-redux'

import instaClone from '../assets/img/instaClone.png'
import Home from '../assets/svg/Home.svg?react'
import Search from '../assets/svg/Search.svg?react'
import Explore from '../assets/svg/Explore.svg?react'
import Messenger from '../assets/svg/Messenger.svg?react'
import Create from '../assets/svg/Create.svg?react'
import Hamburger from '../assets/svg/Hamburger.svg?react'

export function AppNav({ onClickUpload }) {
    const navigate = useNavigate()
    const loggedInUser = useSelector(storeState => storeState.userModule.user)

    return (
        <section className="app-nav">

            <NavLink to='/' className='logo'>
                <img src={instaClone} alt="logo" />
            </NavLink>

            <section className='nav-bar'>

                <nav className='main-nav'>
                    <NavLink to='/' className='link'>
                        <Home />
                        <p>Home</p>
                    </NavLink>
                    <NavLink to='/' className='link'>
                        <Search />
                        <p>Search</p>
                    </NavLink>
                    <NavLink to='/' className='link'>
                        <Explore />
                        <p>Explore</p>
                    </NavLink>
                    <NavLink to='/' className='link'>
                        <Messenger />
                        <p>Messages</p>
                    </NavLink>
                    <button className='link' onClick={() => onClickUpload()}>
                        <Create />
                        <p>Create</p>
                    </button>
                    <NavLink to='/' className='link'>
                        <img src={loggedInUser.imgUrl} />
                        <p>Profile</p>
                    </NavLink>
                </nav>

                <nav className="lower-nav">
                    <NavLink to='/' className='link'>
                        <Hamburger />
                        <p>Settings</p>
                    </NavLink>
                </nav>
            </section>

        </section>
    )
}