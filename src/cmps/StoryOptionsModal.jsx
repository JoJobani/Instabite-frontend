import { useRef, useEffect } from 'react'

export function StoryOptionsModal({ onCloseModal, onRemoveStory }) {
    const modalContentRef = useRef(null)

    useEffect(() => {
        function handleClickOutside(ev) {
            if (modalContentRef.current && !modalContentRef.current.contains(ev.target)) {
                onCloseModal()
            }
        }
        document.addEventListener('mousedown', handleClickOutside)
        return () => {
            document.removeEventListener('mousedown', handleClickOutside)
        }
    }, [])

    return (
        <div className="modal-overlay">
            <ul className='modal-options' ref={modalContentRef}>
                <li onClick={onRemoveStory}>
                    Remove
                </li>
                <li>
                    Edit
                </li>
                <li onClick={onCloseModal}>
                    Cancel
                </li>
            </ul>
        </div>
    )
}