import Like from '../../assets/svg/Like.svg?react'
import Comment from '../../assets/svg/Comment.svg?react'
import Share from '../../assets/svg/Share.svg?react'
import Save from '../../assets/svg/Save.svg?react'

export function StoryControls({ story, toggleLike, openComments, shareStory, saveStory }) {

    return (
        <section className="story-controls">
            <div className="story-controls-left">
                <div onClick={() => toggleLike(story._id)}>
                    <Like />
                </div>
                <div onClick={() => openComments(story._id)}>
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