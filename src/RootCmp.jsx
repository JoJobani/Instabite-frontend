import React from 'react'
import { Routes, Route } from 'react-router'
import { useState } from 'react'

import { StoryIndex } from './pages/StoryIndex.jsx'
import { StoryDetails } from './pages/StoryDetails.jsx'
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
        <div className="app-container">
            <AppNav onClickUpload={onClickUpload} />
            {isUploading && <UploadModal onCloseUpload={onCloseUpload} />}
            <main className='main-content'>
                <Routes>
                    <Route path="" element={<StoryIndex />} >
                        <Route path="/p/:storyId" element={<StoryDetails />} />
                    </Route>
                </Routes>
            </main>
        </div>
    )
}