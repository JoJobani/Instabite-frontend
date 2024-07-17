import React from 'react'
import { Routes, Route } from 'react-router'

import { LoginSignup } from './pages/LoginSignup.jsx'
import { StoryIndex } from './pages/StoryIndex.jsx'
import { StoryDetails } from './pages/StoryDetails.jsx'
import { UserDetails } from './pages/UserDetails.jsx'
import { AppFooter } from './cmps/AppFooter.jsx'
import { AppNav } from './cmps/AppNav.jsx'

export function RootCmp() {
    return (
        <div className="main-container">
            <AppNav />
            <main>
                <Routes>
                    <Route path="" element={<StoryIndex />} />
                    <Route path="story/:storyId" element={<StoryDetails />} />
                    <Route path="user/:id" element={<UserDetails />} />
                    <Route path="login" element={<LoginSignup />}>
                        <Route index element={<Login />} />
                        <Route path="signup" element={<Signup />} />
                    </Route>
                </Routes>
            </main>
            <AppFooter />
        </div>
    )
}