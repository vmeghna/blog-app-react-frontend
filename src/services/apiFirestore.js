import {
  addDoc,
  collection,
  getDocs,
  query,
  serverTimestamp,
  where,
} from "firebase/firestore";
import { db } from "../firebase";

const COLLECTION_NAME = "posts";
const postsRef = collection(db, COLLECTION_NAME);

export const getBlogsApi = async () => {
  const querySnapshot = await getDocs(postsRef);
  const newData = querySnapshot.docs.map((doc) => ({
    ...doc.data(),
    id: doc.id,
  }));
  return newData;
};

export const createBlogApi = async (blogData) => {
  // blogData : {title, subtitle, content, tag, imageUrl, author : {id, name, }}
  const newBlog = { ...blogData, createdAt: serverTimestamp() };
  console.log(newBlog);

  const docRef = await addDoc(postsRef, newBlog);
  return { id: docRef.id, ...newBlog };
};
