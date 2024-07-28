import React, { useEffect } from 'react'
import { Routes, Route, Navigate, Outlet } from 'react-router'
import { useState } from 'react'
import { useSelector } from 'react-redux'

import { loadUsers } from './store/actions/user.actions.js'
import { loadStories } from './store/actions/story.actions.js'

import { LoginSignup } from './pages/LoginSignup.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'
import { Explore } from './pages/Explore.jsx'
import { Messages } from './pages/Messages.jsx'
import { StoryDetails } from './pages/StoryDetails.jsx'
import { UserDetails, UploadedStories, SavedStories, TaggedStories } from './pages/UserDetails.jsx'
import { AppNav } from './cmps/AppNav.jsx'
import { UploadModal } from './cmps/UploadModal.jsx'

export function RootCmp() {
    const [isUploading, setIsUploading] = useState(false)
    const loggedInUser = useSelector(storeState => storeState.userModule.loggedInUser)

    useEffect(() => {
        loadApp()
    }, [])

    async function loadApp() {
        await loadUsers()
        await loadStories()
    }

    function onClickUpload() {
        setIsUploading(true)
    }

    function onCloseUpload() {
        setIsUploading(false)
    }

    //Require login to access rest of the site
    function ProtectedRoute({ isAuthenticated }) {
        return isAuthenticated ? <Outlet /> : <Navigate to="/login" replace />
    }

    return (
        <div className="app-container">
            <Routes>
                <Route path="/login" element={loggedInUser ? <Navigate to="/" replace /> : <LoginSignup />} />
                <Route element={<ProtectedRoute isAuthenticated={!!loggedInUser} />}>
                    <Route element={
                        <>
                            <AppNav onClickUpload={onClickUpload} />
                            {isUploading && <UploadModal onCloseUpload={onCloseUpload} />}
                            <main className='main-content'>
                                <Outlet />
                            </main>
                        </>
                    }>
                        <Route path="" element={<StoryIndex />} />
                        <Route path="/explore" element={<Explore />} />
                        <Route path="/direct" element={<Messages />} />
                        <Route path="/:userRoute" element={<UserDetails />} >
                            <Route path="" element={<UploadedStories />} />
                            <Route path="saved" element={<SavedStories />} />
                            <Route path="tagged" element={<TaggedStories />} />
                        </Route>
                        <Route path="/p/:storyId" element={<StoryDetails />} />
                    </Route>
                </Route>
                <Route path="*" element={<Navigate to={loggedInUser ? "/" : "/login"} replace />} />
            </Routes>
        </div>
    )
}