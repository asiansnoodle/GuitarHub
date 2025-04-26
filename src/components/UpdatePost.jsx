import { useState, useEffect } from "react"
import { useParams, useNavigate } from "react-router"
import { supabase } from "../supabase"

const UpdatePost = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [img, setImg] = useState("")
    let params = useParams()
    const navigate = useNavigate()

    useEffect(() => {
        const getPost = async () => {
            const { data, error } = await supabase.from('posts').select().eq("id", params.id).single()
            if(data){
                setTitle(data['title'])
                setContent(data['content'])
                setImg(data['imgurl'])
            }
            else{
                console.log(error)
            }
        }
        getPost()
    }, [])

    const submitUpdate = async (e) => {
        e.preventDefault()
        const { data, error } = await supabase.from('posts').update({title: title, content: content, imgurl: img}).eq('id', params.id).select()
        if(data){
            alert('Post successfully updated!')
            navigate(`/post/${params.id}`)
        }
        else{
            console.log(error)
        }
    }

    const deletePost = async (e) => {
        e.preventDefault()
        const response = await supabase.from('posts').delete().eq('id', params.id)
        if(response){
            alert('Post successfully deleted')
            navigate('/')
        }
    }

    return (
        <div className="createpost-container">
            <form className="input-container" onSubmit={submitUpdate}>
                <input
                    type="text"
                    value={title}
                    placeholder="Title"
                    onChange={(e) => setTitle(e.target.value)}
                />
                <textarea
                    value={content}
                    placeholder="Content (optional)"
                    onChange={(e) => setContent(e.target.value)}
                />
                <input
                    type="text"
                    value={img}
                    placeholder="Image URL (optional)"
                    onChange={(e) => setImg(e.target.value)}
                />
                <button type="submit" className="update-btn">Update Post</button>
                <br></br>
                <button className="update-btn" onClick={deletePost}>Delete Post</button>
            </form>

        </div>
    )
}

export default UpdatePost