import { useSelector } from "react-redux"


export function SuggestionsBar() {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

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
                    <li className="user-prop">
                        <div className="user-info">
                            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' />
                            <div className="names">
                                <p className="username">Bob5231</p>
                                <p className="sub-line">Suggested for you</p>
                            </div>
                        </div>
                        <button>
                            <p>Follow</p>
                        </button>
                    </li>
                    <li className="user-prop">
                        <div className="user-info">
                            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' />
                            <div className="names">
                                <p className="username">xXx_Shimon_xXx</p>
                                <p className="sub-line">Suggested for you</p>
                            </div>
                        </div>
                        <button>
                            <p>Follow</p>
                        </button>
                    </li>
                    <li className="user-prop">
                        <div className="user-info">
                            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' />
                            <div className="names">
                                <p className="username">pop7425</p>
                                <p className="sub-line">Suggested for you</p>
                            </div>
                        </div>
                        <button>
                            <p>Follow</p>
                        </button>
                    </li>
                    <li className="user-prop">
                        <div className="user-info">
                            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' />
                            <div className="names">
                                <p className="username">MP_1998</p>
                                <p className="sub-line">Suggested for you</p>
                            </div>
                        </div>
                        <button>
                            <p>Follow</p>
                        </button>
                    </li>
                    <li className="user-prop">
                        <div className="user-info">
                            <img src='https://upload.wikimedia.org/wikipedia/commons/a/ac/Default_pfp.jpg' />
                            <div className="names">
                                <p className="username">NotJonathan2309</p>
                                <p className="sub-line">Suggested for you</p>
                            </div>
                        </div>
                        <button>
                            <p>Follow</p>
                        </button>
                    </li>
                </ul>
                <div className="footer">
                    <p>© Jonathan Menashe for Coding Academy 2024</p>
                </div>
            </div>
        </div>
    )
}