import React, { useEffect, useContext } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useBlogs } from '../../context/BlogsContext';
import { useState } from 'react';
import { useAuth } from '../../context/AuthContext';
import { Link } from "react-router-dom";

const BlogDetail = () => {
  const { id } = useParams();
  const { blogs, loading, deleteBlog } = useBlogs();
  const [blog, setBlog] = useState(null);
  const navigate = useNavigate();
  const {userName} = useAuth();

  useEffect(() => {
    const foundBlog = blogs.find((blog) => blog.id === id);

    if (!foundBlog) {
      console.error('Blog not found');
    } else {
      console.log('Blog found:', foundBlog);
      setBlog(foundBlog);
    }
  }, [id, blogs]);

  const handleDelete = () => {
    deleteBlog(id);
    navigate('/'); 
  };


  if (loading) {
    return <div>Loading...</div>;
  }

  if (!blog) {
    return <div>Blog not found</div>;
  }

  return (
    <div >
      <h1 className='text-[4rem] text-red-600 text-bold text-transform: capitalize'>{blog.title}</h1>
      <p className=' text-[1.2rem] tracking-wide '>{blog.content}</p>
      <p className='text-[1.1rem] mt-4 text-blue-700'>Author: {blog.author.name}</p>
      <p className='text-[1.1rem] mt-4 text-blue-700'>Tag: {blog.tag}</p>
      <p className='text-[1.1rem] mt-4 text-blue-700 mb-8' >Created At: {blog.createdAt.toDate().toString()}</p>
      {userName === blog.author.name && (
      <button className='btn btn-primary ' onClick={handleDelete}>
        Delete
      </button>
      
    )}
   
    <Link to="/" className="btn btn-accent ml-4">
          <i className="fa-solid fa-house"></i>
          Go to Home
        </Link>
    </div>
  );
};

export default BlogDetail;
