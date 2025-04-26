import { useState } from 'react'
import { BrowserRouter, Routes, Route } from 'react-router'
import './assets/css/styles.css'
import TopBar from './components/TopBar'
import Home from './components/Home'
import CreatePost from './components/CreatePost'
import PostPage from './components/PostPage'
import UpdatePost from './components/UpdatePost'


const App = () => {
    return (
        <div className='app'>
            <BrowserRouter>
                <Routes>
                    <Route path="/" element={<TopBar/>}>
                        <Route index={true} element={<Home/>}/>
                        <Route path='createpost' element={<CreatePost/>}/>
                        <Route path='post/:id' element={<PostPage/>}/>
                        <Route path='update/:id' element={<UpdatePost/>}/>
                    </Route>
                </Routes>
            </BrowserRouter>
        </div>
    )
}

export default App
