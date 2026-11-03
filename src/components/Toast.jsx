import { useEffect } from 'react'
import './Toast.css'

function ToastItem({ toast, onDismiss }) {
    useEffect(() => {
        const timer = setTimeout(() => {
            onDismiss(toast.id)
        }, 4000)
        return () => clearTimeout(timer)
    }, [toast.id, onDismiss])

    return (
        <div className={`toast-item ${toast.isError ? 'toast-error' : 'toast-success'}`}>
            <div className="toast-content">
                <h4 className="toast-title">{toast.title}</h4>
                <p className="toast-message">{toast.message}</p>
            </div>
            <button className="toast-close" onClick={() => onDismiss(toast.id)} aria-label="Close notification">
                ✕
            </button>
        </div>
    )
}

function Toast({ toasts, onDismiss }) {
    if (!toasts || toasts.length === 0) return null

    return (
        <div className="toast-container">
            {toasts.map((toast) => (
                <ToastItem key={toast.id} toast={toast} onDismiss={onDismiss} />
            ))}
        </div>
    )
}

export default Toast

