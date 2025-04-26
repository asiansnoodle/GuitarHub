import { useState } from "react"
import { supabase } from "../supabase"

const CreatePost = () => {
    const [title, setTitle] = useState("")
    const [content, setContent] = useState("")
    const [img, setImg] = useState("")

    const validateTitle = (title) => {
        if(title.length == 0){
            return false
        }
        return true
    }

    const handleSubmit = async (e) => {
        e.preventDefault()
        if(validateTitle(title)){
            const { data, error } = await supabase.from('posts').insert({title: title, content: content, imgurl: img}).select()
            if(data){
                alert("Post successfully submitted!")
                setTitle("")
                setContent("")
                setImg("")
            }
            else{
                alert("Post creation failed!")
                console.log(error)
            }
        }
        else{
            alert("Title cannot be empty")
        }
    }

    return(
        <div className="createpost-container">
            <form className="input-container" onSubmit={handleSubmit}>
                <input type="text" value={title} placeholder="Title" onChange={(e) => setTitle(e.target.value)}></input>
                <input type="textarea" value={content} placeholder="Content (optional)" onChange={(e) => setContent(e.target.value)}></input>
                <input type="text" value={img} placeholder="Image URL (optional)" onChange={(e) => setImg(e.target.value)}></input>
                <button type="submit">Create Post</button>
            </form>
        </div>
    )
}

export default CreatePost