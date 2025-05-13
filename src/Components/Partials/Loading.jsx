import React from 'react'
import { createPortal } from 'react-dom'

const Loading = () => {
    return (
        createPortal(
            <div className="fixed inset-0 bg-black/80 flex justify-center items-center z-50">
                <div className="loader"></div>
            </div>,
            document.getElementById('root')
        )
    )
}

export default Loading