import React from 'react'
import { Routes, Route } from 'react-router'
import { useState } from 'react'

import { StoryIndex } from './pages/StoryIndex.jsx'
import { AppNav } from './cmps/AppNav.jsx'
import { UploadModal } from './cmps/UploadModal.jsx'


export function RootCmp() {
    const [isUploading, setIsUploading] = useState(false)

    function onClickUpload() {
        setIsUploading(true)
    }

    function onCloseUpload() {
        setIsUploading(false)
    }

    return (
        <div className="main-container">
            <AppNav onClickUpload={onClickUpload} />
            {isUploading && <UploadModal onCloseUpload={onCloseUpload} />}
            <main>
                <Routes>
                    <Route path="" element={<StoryIndex />} />
                </Routes>
            </main>
        </div>
    )
}