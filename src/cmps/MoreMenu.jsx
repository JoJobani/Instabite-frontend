import { useState } from "react"
import { logout } from "../store/actions/user.actions.js"
import Hamburger from "../assets/svg/Hamburger.svg?react"

export function MoreMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function onMenuClick() {
        setIsMenuOpen(!isMenuOpen)
    }

    function onLogout() {
        logout()
    }

    return (
        <div className="more-menu" >
            {isMenuOpen &&
                <div className="menu-content">
                    <button className="menu-btns" onClick={onLogout}>
                        <p>Log out</p>
                    </button>
                </div>
            }
            <button
                className={`link ${isMenuOpen ? 'selected' : ''}`}
                onClick={onMenuClick}
            >
                <Hamburger />
                <span>More</span>
            </button>
        </div>
    )
}

