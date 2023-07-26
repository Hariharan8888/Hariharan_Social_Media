import React, { useContext } from 'react'
import DataContext from './Context/DataContext'

const Newpost = () => {
  const {handleSubmit, postTitle, setPostTitle, postBody, setPostBody} = useContext(DataContext)
  return (
    <main className='NewPost'>
        <h2>
          New Post
        </h2>
        <form className='newPostForm' onSubmit={handleSubmit}>
          <label>Title:</label>
          <input
            id='postTitle'
            type='text'
            required
            value={postTitle}
            onChange={(e) => setPostTitle(e.target.value)}
          />
          <label>Post:</label>
          <textarea 
            id="postBody"
            required
            value={postBody}
            onChange={(e) => setPostBody(e.target.value)}
          />
          <button type='submit'>Submit</button>
        </form>
    </main>
  )
}

export default Newpost