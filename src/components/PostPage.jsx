import { useParams, Link } from "react-router"
import { useState, useEffect } from "react"
import { supabase } from "../supabase"

const PostPage = () => {
    let params = useParams()
    const [post, setPost] = useState(null)
    const [comment, setComment] = useState("")
    const [comments, setComments] = useState([])
    
    useEffect(() => {
        const getPost = async () => {
            const { data, error } = await supabase.from('posts').select().eq("id", params.id)
            if(data){
                setPost(data[0])
            }
        }
        getPost()
    }, [])

    useEffect(() => {
        const getComments = async () => {
            const { data, error } = await supabase
                .from('comments')
                .select('comment')
                .eq("post_id", post.id)
                .order("created_at", { ascending: false });
    
            if (data) {
                setComments(data); // Save to state
            } else {
                console.log(error);
            }
        };
        
        if (post) {
            getComments();
        }
    }, [post]); // 👈 also add 'post' to dependency array
    
    

    const getTimeAgo = (timestamp) => {
        const now = new Date();
        const postDate = new Date(timestamp);
        const diffMs = now - postDate; // difference in milliseconds
    
        const diffSeconds = Math.floor(diffMs / 1000);
        const diffMinutes = Math.floor(diffSeconds / 60);
        const diffHours = Math.floor(diffMinutes / 60);
        const diffDays = Math.floor(diffHours / 24);
    
        if (diffDays > 0) {
            return `Posted ${diffDays} day${diffDays > 1 ? 's' : ''} ago`;
        } else if (diffHours > 0) {
            return `Posted ${diffHours} hour${diffHours > 1 ? 's' : ''} ago`;
        } else if (diffMinutes > 0) {
            return `Posted ${diffMinutes} minute${diffMinutes > 1 ? 's' : ''} ago`;
        } else {
            return `Posted just now`;
        }
    };

    const upvote = async () => {
        let newCount = post.likes + 1
        const { error } = await supabase.from('posts').update({likes: newCount}).eq('id', post.id)
        setPost({...post, likes: newCount})
    }

    const submitComment = async (e) => {
        e.preventDefault()
        if(comment.length != 0){
            const { data, error} = await supabase.from('comments').insert({post_id: post.id, comment: comment}).select()
            setComment("")
            location.reload();
        }
        else{
            alert('Comment cannot be blank')
        }
    }



    if(post){   
        //console.log(post)
        return(
            <div className="post-container">
                <h4>{getTimeAgo(post.created_at)}</h4>
                <h2>{post.title}</h2>
                {post.content && <h4>{post.content}</h4>}
                {post.imgurl && <img className="post-image" src={`${post.imgurl}`} alt="post image" />}
                <button className="upvote-button" onClick={upvote}>👍 {post.likes}</button>
                <div className="comment-sectioin">
                    <div className="comments-list">
                        {comments.length === 0 ? (
                            <p>No comments yet</p>
                        ) : (
                            comments.map((c, idx) => (
                                <div key={idx} className="comment">
                                    <p>{c.comment}</p>
                                </div>
                            ))
                        )}
                    </div>
                    <form onSubmit={submitComment}>
                        <input type="text" value={comment} placeholder="Leave a comment" onChange={(e) => setComment(e.target.value)}></input>
                        <button type="submit">Post</button>
                    </form>
                </div>
                <Link to={`/update/${post.id}`} className="update-btn">Update Post</Link>
            </div>
        )
    }
    else{
        return(
            <div className="post-container">
                <h2>Loading...</h2>
            </div>
        )
    }



}

export default PostPage