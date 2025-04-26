import { useState, useEffect } from "react"
import { supabase } from "../supabase"
import { Link } from "react-router"
import PostCard from "./PostCard"

const Home = () => {
    const [data, setData] = useState([])
    const [posts, setPosts] = useState([])
    
    useEffect(() => {
        const getPosts = async () => {
            const { data, error } = await supabase.from('posts').select()
            if(data){
                setData(data)
                setPosts(data.sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))
            }
            else if(error){
                console.log(error)
            }
        }
        getPosts()
    }, [])

    const sortPopular = () => {
        setPosts([...data].sort((a, b) => b.likes - a.likes))
    }

    const sortNewest = () => {
        setPosts([...data].sort((a, b) => new Date(b.created_at) - new Date(a.created_at)))

    }

    if (posts.length != 0){
        return(
            <div className="home-container">
                <div className="order-container">
                    <h4>Order by:</h4>
                    <button className="order-button" onClick={sortNewest}>Newest</button>
                    <button className="order-button" onClick={sortPopular}>Most Popular</button>
                </div>
                <div className="posts-container">
                    {posts.map((post) => <Link to={`post/${post.id}`} key={post.id}> <PostCard post={post}/> </Link>)}
                </div>
            </div>
        )
    }
    else {
        return(
            <div className="home-container">
                <h1>No Posts Yet!</h1>
            </div>
        )
    }
}  

export default Home