import React from 'react'
import { Routes, Route } from 'react-router'
import { useState } from 'react'

import { StoryIndex } from './pages/StoryIndex.jsx'
import { Explore } from './pages/Explore.jsx'
import { Messages } from './pages/Messages.jsx'
import { StoryDetails } from './pages/StoryDetails.jsx'
import { UserDetails, UploadedStories, SavedStories, TaggedStories } from './pages/UserDetails.jsx'
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
                    <Route path="" element={<StoryIndex />} />
                    <Route path="/explore" element={<Explore />} />
                    <Route path="/direct" element={<Messages />} />
                    <Route path="/:userRoute" element={<UserDetails />} >
                        <Route path="" element={<UploadedStories />} />
                        <Route path="saved" element={<SavedStories />} />
                        <Route path="tagged" element={<TaggedStories />} />
                    </Route>
                    <Route path="/p/:storyId" element={<StoryDetails />} />
                </Routes>
            </main>
        </div>
    )
}