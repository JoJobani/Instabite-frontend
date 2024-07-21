import Like from '../../assets/svg/Like.svg?react'
import Unlike from '../../assets/svg/Unlike.svg?react'
import Comment from '../../assets/svg/Comment.svg?react'
import Share from '../../assets/svg/Share.svg?react'
import Save from '../../assets/svg/Save.svg?react'
import { useSelector } from 'react-redux'

export function StoryControls({ story, toggleLike, openDetails, shareStory, saveStory }) {

    const loggedInUser = useSelector(storeState => storeState.userModule.user)
    const isLiked = story.likedBy.find(user => user._id === loggedInUser._id)

    return (
        <section className="story-controls">
            <div className="story-controls-left">
                <div onClick={() => toggleLike(story._id)}>
                    {isLiked
                        ? <Unlike fill="red" />
                        : <Like />}
                </div>
                <div onClick={() => openDetails(story._id)}>
                    <Comment />
                </div>
                <div onClick={() => shareStory(story._id)}>
                    <Share />
                </div>
            </div>
            <div className="story-controls-right">
                <div onClick={() => saveStory(story._id)}>
                    <Save />
                </div>
            </div>
        </section>
    )
}