import React from 'react'
import { NavLink } from 'react-router-dom'

const BlogDetails = ({post}) => {
  return (
    // flex flex-col    
    <div className='flex flex-col max-w-2xl mx-auto mt-[70px]  mb-[50px]'>
        <NavLink to={`/blog/${post.id}`}>
            <span
            className='font-bold text-lg'
            >{post.title}</span>
        </NavLink>
        <p>
            By{" "}
            <span>{post.author}{" "}</span>
            on{" "}
            <NavLink to={`/categories/${post.category.replaceAll(" ","-")}`}>
                <span className='font-bold'>{post.category}</span>
            </NavLink>
        </p>
        <p>Posted on {post.date}</p>
        <br />
        <p>{post.content}</p>
        <div>
            {post.tags.map( (tag, index) => (
                <NavLink key={index} to={`/tags/${tag.replaceAll(" ","-")}`}>
                    <span
                    className='text-blue-800 font-bold'>{`#${tag}`}{" "}</span>
                </NavLink>
            ))}
        </div>


    </div>
  )
}

export default BlogDetails