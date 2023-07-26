import React from 'react'
import Post from './Post'

const Feed = ({ Posts }) => {
  return (
    <>
        {Posts.map(post => (
            <Post key={post.id} post={post}/>
        ))}
    </>
  )
}

export default Feed