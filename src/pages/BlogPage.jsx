import React, { useContext, useEffect, useState } from 'react'
import { useLocation, useNavigate } from 'react-router-dom';
import { AppContext } from '../context/AppContext';
import Header from '../components/Header';
import BlogDetails from '../components/BlogDetails';
// import { baseUrl } from '../baseUrl';

const BlogPage = () => {

  const [blog, setBlog] = useState(null);
  const [relatedblogs, setRelatedBlogs] = useState([]);
  const location = useLocation();
  const navigation = useNavigate();
  const { setLoading, loading } = useContext(AppContext);
  const newBaseUrl = "https://codehelp-apis.vercel.app/api/"

  const blogId = location.pathname.split("/").at(-1);

  async function fetchRelatedBlogs() {
    setLoading(true);
    let url = `${newBaseUrl}get-blog?blogId=${blogId}`;
    try {
      const res = await fetch(url);
      const data = await res.json();

      setBlog(data.blog);
      setRelatedBlogs(data.relatedBlogs);
    }
    catch (error) {
      console.log("Error Occured");
      setBlog("null");
      setRelatedBlogs([]);
    }
    setLoading(false);
  }

  useEffect(() => {
    if (blogId) {
      fetchRelatedBlogs();
    }
  }, [location.pathname])


  return ( 
    <div className='flex flex-col w-11/12 max-w-2xl mx-auto'>
      <Header/>
      <div>
        <button 
        onClick={() => navigation(-1)}
        >
          Back
        </button>
      </div>
      {
        loading ? 
        (<div>
          <p>Loading</p>
        </div>) :
        blog ? 
        (<div>
          <BlogDetails post={blog} />
          <h2
          className='font-extrabold text-2xl  '
          >Related Blogs-</h2>
          {
            relatedblogs.map( (post) => (
              <div>
              <BlogDetails post={post} />
              </div>
            ))
          }
        </div>) :
        (<div>
          <p>No Blog Found</p>
        </div>)
      }
    </div>
  );
}

export default BlogPage