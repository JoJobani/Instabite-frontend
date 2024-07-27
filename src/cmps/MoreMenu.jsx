import { useState } from "react"
import Hamburger from "../assets/svg/Hamburger.svg?react"

export function MoreMenu() {
    const [isMenuOpen, setIsMenuOpen] = useState(false)

    function onMenuClick() {
        setIsMenuOpen(!isMenuOpen)
    }

    function testClick() {
        console.log('click')
    }

    return (
        <div className="more-menu" >
            {isMenuOpen &&
                <div className="menu-content">
                    <button className="menu-btns" onClick={testClick}>
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

