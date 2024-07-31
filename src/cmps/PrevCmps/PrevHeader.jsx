import { timeAgo } from '../../services/util.service.js'
import MoreOptions from '../../assets/svg/MoreOptions.svg?react'

export function PrevHeader({ story, clickUser, onOpenOptions }) {
    let formattedTime = timeAgo(+story.createdAt)

    return (
        <section className="prev-header">
            <div className="user-info">
                <div
                    className="profile-link"
                    onClick={() => clickUser(story.by._id)}>
                    <img src={story.by.imgUrl} />
                    <p>{story.by.username}</p>
                    <p className='timestamp'>{`• ${formattedTime}`}</p>
                </div>
            </div>
            <div
                className="more-options"
                onClick={() => onOpenOptions(story._id)}>
                <MoreOptions />
            </div>
        </section>
    )
}