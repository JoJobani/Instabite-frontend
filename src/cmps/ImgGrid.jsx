import Unlike from '../assets/svg/Unlike.svg?react'
import CommentFull from '../assets/svg/CommentFull.svg?react'

export function ImgGrid({ stories, onStoryClick }) {

    if (!stories) return

    return (
        <ul className="img-grid">
            {stories.map(story => (
                <li key={story._id} onClick={() => onStoryClick(story._id)} >
                    <img src={story.imgUrl} />
                    <div className="overlay">
                        <div className='txt'>
                            <span><Unlike color={'white'} height={19} width={19} /></span>
                            <p>{story.likedBy.length}</p>
                        </div>
                        <div className='txt'>
                            <span><CommentFull color={'white'} height={19} width={19} /></span>
                            <p>{story.comments.length}</p>
                        </div>
                    </div>
                </li>
            ))}
        </ul>
    )
}