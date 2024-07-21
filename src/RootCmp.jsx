import React from 'react'
import { Routes, Route } from 'react-router'
import { useState } from 'react'

// import { LoginSignup } from './pages/LoginSignup.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'
// import { StoryDetails } from './pages/StoryDetails.jsx'
// import { UserDetails } from './pages/UserDetails.jsx'
// import { AppFooter } from './cmps/AppFooter.jsx'
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
                    {/* <Route path="story/:storyId" element={<StoryDetails />} /> */}
                    {/* <Route path="user/:id" element={<UserDetails />} /> */}
                    {/* <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route> */}
                </Routes>
            </main>
            {/* <AppFooter /> */}
        </div>
    )
}