import { useState, useRef } from 'react'
import { useSelector } from 'react-redux'
import { uploadService } from '../services/upload.service'
import { storyService } from '../services/story/index.js'
import { addStory } from "../store/actions/story.actions.js"

import UploadPlaceholder from '../assets/svg/UploadPlaceholder.svg?react'
import Back from '../assets/svg/Back.svg?react'

export function UploadModal({ onCloseUpload }) {
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)
    const [story, setStory] = useState(storyService.getEmptyStory())
    const [isUploading, setIsUploading] = useState(false)
    const modalContentRef = useRef(null)

    function handleClickOutside(ev) {
        if (modalContentRef.current && !modalContentRef.current.contains(ev.target)) {
            onCloseUpload()
        }
    }

    async function uploadImg(ev) {
        setIsUploading(true)
        const { secure_url } = await uploadService.uploadImg(ev)
        setStory(prevStory => ({ ...prevStory, imgUrl: secure_url }))
    }

    function handleChange(ev) {
        const value = ev.target.value
        setStory(prevStory => ({ ...prevStory, txt: value }))
    }

    async function shareStory() {
        addStory(story)
        onCloseUpload()
    }

    return (
        <div className="modal-overlay" onClick={handleClickOutside}>
            {!isUploading &&
                <div className='modal-content' ref={modalContentRef}>
                    <div className='modal-header'>
                        <p className='pre-upload'>Create new post</p>
                    </div>
                    <div className='upload-preview'>
                        <UploadPlaceholder />
                        <p>Drag photos and videos here</p>
                        <input
                            type="file"
                            id='fileInput'
                            onChange={uploadImg}
                            accept="img/*" />
                        <button>
                            <label htmlFor="fileInput">
                                Select from computer
                            </label>
                        </button>
                    </div>
                </div>

            }
            {isUploading &&
                <div className='modal-content after' ref={modalContentRef}>
                    <div className='modal-header'>
                        <button className='back-btn' onClick={onCloseUpload}>
                            <Back />
                        </button>
                        <p>Create new post</p>
                        <button className='share-btn' onClick={shareStory}>
                            Share
                        </button>
                    </div>
                    <div className='upload-edit'>
                        <img src={story.imgUrl} />
                        <div className='edit-section'>
                            <div className="profile">
                                <img src={loggedInUser.imgUrl} />
                                <p>{loggedInUser.username}</p>
                            </div>
                            <div className='edit-comment'>
                                <textarea
                                    placeholder='Write a caption...'
                                    value={story.txt}
                                    onChange={handleChange}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            }
        </div>
    )
}