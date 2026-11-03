import { useEffect } from 'react'
import './Modal.css'

function Modal({ isOpen, onClose, title, titleColor, children }) {
    useEffect(() => {
        const handleKeyDown = (e) => {
            if (e.key === 'Escape') onClose()
        }
        if (isOpen) {
            window.addEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'hidden'
        }
        return () => {
            window.removeEventListener('keydown', handleKeyDown)
            document.body.style.overflow = 'unset'
        }
    }, [isOpen, onClose])

    if (!isOpen) return null

    return (
        <div className="modal-backdrop" onClick={onClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={onClose} aria-label="Close modal">
                    ✕
                </button>
                {title && (
                    <h3 className="modal-title" style={titleColor ? { color: titleColor } : {}}>
                        {title}
                    </h3>
                )}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    )
}

export default Modal

