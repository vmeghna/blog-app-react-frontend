import PropTypes from "prop-types";
import { createContext, useContext, useEffect, useState } from "react";
import { createBlogApi, getBlogsApi } from "../services/apiFirestore";
import {db} from "./../firebase.js"
import {useAuth} from "./AuthContext.jsx"
import {
  collection,
  query,
  where,
  getDocs,
  updateDoc,
  doc,
  getDoc,
  deleteDoc
} from "firebase/firestore";

const BlogsContext = createContext();

export const BlogsProvider = ({ children }) => {
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState([]);
  const {userName} = useAuth();

  const createBlog = async (newBlog) => {
    const data = await createBlogApi(newBlog);
    setBlogs((state) => [data, ...state]);
  };

  const getBlogs = async () => {
    setLoading(true);
    const data = await getBlogsApi();
    setBlogs(data);
    setLoading(false);
  };

  const deleteBlog = async (blogId) => {
    try {
      const blogDocRef = doc(collection(db, "posts"), blogId);
      const blogSnapshot = await getDoc(blogDocRef);
  
      if (!blogSnapshot.exists()) {
        console.error(`Can't delete blog with id ${blogId}, not found in Firestore`);
        return;
      }
  
      const blogData = blogSnapshot.data();
  
      if (userName === blogData.author.name) {
        await deleteDoc(blogDocRef);
        setBlogs((prevBlogs) => prevBlogs.filter((blog) => blog.id !== blogId));
      } else {
        console.error("Current user is not the author of the blog");
      }
    } catch (error) {
      console.error("Error deleting blog:", error);
    }
  };
  
  
  

  useEffect(() => {
    getBlogs();
  }, []);

  return (
    <BlogsContext.Provider value={{ loading, blogs, createBlog, deleteBlog }}>
      {children}
    </BlogsContext.Provider>
  );
};

BlogsProvider.propTypes = {
  children: PropTypes.node.isRequired,
};

export const useBlogs = () => useContext(BlogsContext);
