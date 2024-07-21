import instaClone from '../assets/img/instaClone.png'
import Home from '../assets/svg/Home.svg?react'
import Search from '../assets/svg/Search.svg?react'
import Explore from '../assets/svg/Explore.svg?react'
import Messenger from '../assets/svg/Messenger.svg?react'
import Create from '../assets/svg/Create.svg?react'
import Hamburger from '../assets/svg/Hamburger.svg?react'


export function AppNav() {


    return (
        <section className="app-nav">
            <div className="logo">
                <img src={instaClone} alt="logo" />
            </div>
            <section className='nav-bar'>
                <ul className='main-nav'>
                    <li>
                        <Home />
                        <p>Home</p>
                    </li>
                    <li>
                        <Search />
                        <p>Search</p>
                    </li>
                    <li>
                        <Explore />
                        <p>Explore</p>
                    </li>
                    <li>
                        <Messenger />
                        <p>Messages</p>
                    </li>
                    <li>
                        <Create />
                        <p>Create</p>
                    </li>
                    <li>
                        <p>Profile</p>
                    </li>
                </ul>

                <ul className="lower-nav">
                    <li>
                        <Hamburger />
                        <p>Settings</p>
                    </li>
                </ul>
            </section>

        </section>
    )
}