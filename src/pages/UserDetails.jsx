
import { useSelector } from 'react-redux'


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



        </section>
    )
}