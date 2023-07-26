import { createContext, useState, useEffect } from "react";
import { format } from "date-fns";
import { useNavigate } from "react-router-dom";
import api from "../api/posts"
import CustomWindowHook from "../Hooks/CustomWindowHook";
import useAxiosFetch from "../Hooks/useAxiosFetch";
const DataContext = createContext({})

export const DataProvider = ({children}) => {
    const[posts, setPosts] = useState([])
    const[search, setSearch] = useState('')
    const[searchResults, setSerarchResults]=useState([])
    const[postTitle, setPostTitle]= useState('')
    const[editTitle, setEditTitle] = useState('')
    const[editBody, setEditBody] = useState('')
    const[postBody, setPostBody] = useState('')
    const navigate = useNavigate()
    const {width} = CustomWindowHook()
    const {data, fetchError, isLoading} = useAxiosFetch('http://localhost:3500/posts')

    useEffect(() => {
        setPosts(data)
    },[data])

    useEffect(() => {
        const filteredResults = posts.filter(post => 
            ((post.body).toLowerCase()).includes(search.toLowerCase())
            || ((post.title).toLowerCase()).includes(search.toLowerCase())
            )

            setSerarchResults(filteredResults.reverse())
    }, [posts, search])

    const handleSubmit = async(e) => {
        e.preventDefault()
        const id = posts.length?posts[posts.length - 1].id + 1 : 1
        const datetime = format(new Date(), 'MMMM dd yyyy,  PP')
        const newpost={ id, title:postTitle, datetime, body:postBody}
       try{const response = await api.post('/posts', newpost)
            const allPosts = [...posts, response.data]
            setPosts(allPosts)
            setPostTitle('')
            setPostBody('')
            navigate('/')
       }catch(err) {
        if(err.response){
            console.log(err.response.data)
            console.log(err.response.status)
            console.log(err.response.headers)
        }else{
            console.log(`Error: ${err.message}`)
        }
    }
    }

    const handleEdit = async(id) => {
        const datetime = format(new Date(), 'MMMM dd yyyy,  PP')
        const updatedPost={ id, title:editTitle, datetime, body:editBody}
        try{
            const response = await api.put(`posts/${id}`, updatedPost)
            setPosts(posts.map(post => post.id===id ? {...response.data} : post))
            setEditTitle('')
            setEditBody('')
            navigate('/')
        }catch(err){
            console.log(`Error: ${err.message}`)
        }
    }

    const handleDelete = async(id) => {
       try{
        await api.delete(`posts/${id}`)
        const postsList = posts.filter(post => post.id !== id)
        setPosts(postsList)
        navigate('/')
       }catch(err){
        console.log(`Error: ${err.message}`)
       }
    }

    return(
        <DataContext.Provider value={{
            width, search, setSearch, searchResults, fetchError, isLoading,
            handleSubmit, postTitle, setPostTitle, postBody, setPostBody,
         handleDelete, posts,handleEdit, editBody,setEditBody,editTitle,setEditTitle,

        }}>
            {children}
            </DataContext.Provider>
    )
}

export default DataContext