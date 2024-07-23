import { useRef, useEffect } from 'react'

export function StoryOptionsModal({ onCloseOptions, onRemoveStory }) {
    const modalContentRef = useRef(null)

    function handleClickOutside(ev) {
        if (modalContentRef.current && !modalContentRef.current.contains(ev.target)) {
            onCloseOptions()
        }
    }

    return (
        <div className="modal-overlay" onClick={handleClickOutside}>
            <ul className='modal-options' ref={modalContentRef}>
                <li onClick={onRemoveStory}>
                    Remove
                </li>
                <li>
                    Edit
                </li>
                <li onClick={onCloseOptions}>
                    Cancel
                </li>
            </ul>
        </div>
    )
}