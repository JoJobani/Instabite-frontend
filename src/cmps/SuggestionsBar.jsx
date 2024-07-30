import { useEffect, useState } from "react"
import { useSelector } from "react-redux"


export function SuggestionsBar() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const users = useSelector(storeState => storeState.userModule.users)
    const [suggested, setSuggested] = useState([])

    useEffect(() => {
        getRandomUsers()
    }, [])

    function getRandomUsers() {
        const suggested = [];
        for (let i = 0; i < users.length; i++) {
            const user = users[i];
            if (!loggedInUser.following.includes(user.username) && loggedInUser._id !== user._id) {
                suggested.push({ _id: user._id, username: user.username, imgUrl: user.imgUrl });
                if (suggested.length >= 5) {
                    setSuggested(suggested);
                    break;
                }
            }
        }
    }

    if (!suggested) return

    return (
        <div className="suggestions-bar">
            <div className="bar-container">
                <div className="current-user">
                    <div className="user-info">
                        <img src={loggedInUser.imgUrl} />
                        <div className="names">
                            <p className="username">{loggedInUser.username}</p>
                            <p className="fullname">{loggedInUser.fullname}</p>
                        </div>
                    </div>
                    <button>
                        <p>Switch</p>
                    </button>
                </div>
                <div className="suggested-headline">
                    <p>Suggested for you</p>
                    <button>
                        <p>See All</p>
                    </button>
                </div>
                <ul className="users-list">
                    {suggested.map(user => (
                        <li className="user-prop" key={user.username}>
                            <div className="user-info">
                                <img src={user.imgUrl} />
                                <div className="names">
                                    <p className="username">{user.username}</p>
                                    <p className="sub-line">Suggested for you</p>
                                </div>
                            </div>
                            <button>
                                <p>Follow</p>
                            </button>
                        </li>
                    ))}
                </ul>
                <footer>
                    <p>© Jonathan Menashe for Coding Academy 2024</p>
                </footer>
            </div>
        </div>
    )
}