import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { loginData } from "../App";

const AuthorComments = () => {
  const { login } = useContext(loginData);

  const [comments, setComments] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (!login?.user) return;

    const fetchData = async () => {
      try {
        // ✅ Updated to port 8080
        const [blogRes, commentRes] = await Promise.all([
          axios.get("https://quillhub-backend-latest-2.onrender.com/blogs"),
          axios.get("https://quillhub-backend-latest-2.onrender.com/comments")
        ]);

        const myBlogs = blogRes.data.filter(
          blog => blog.authorName === login.user.name
        );
        setBlogs(myBlogs);

        const blogIds = myBlogs.map(blog => blog.id);
        const myComments = commentRes.data
          .filter(comment => blogIds.includes(comment.blogId))
          .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

        setComments(myComments);

      } catch (err) {
        console.log(err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, [login]);

  if (loading) return <h4 className="text-center mt-4">Loading Comments...</h4>;

  return (
    <div className="container py-4">
      <h2 className="mb-4">Comments On My Blogs</h2>

      {comments.length === 0 && (
        <div className="alert alert-info text-center">No comments received yet.</div>
      )}

      <div className="row">
        {comments.map(comment => {
          const blog = blogs.find(b => b.id === comment.blogId);
          return (
            <div key={comment.id} className="col-md-4 mb-4">
              <div className="card shadow-sm h-100">
                {blog?.image && (
                  <img 
                    src={blog.image} 
                    alt={blog.title} 
                    className="card-img-top" 
                    style={{ height: "120px", objectFit: "cover" }} 
                  />
                )}
                <div className="card-body d-flex flex-column">
                  <h6 className="text-primary mb-2">
                    Blog: {blog ? blog.title : "Unknown Blog"}
                  </h6>
                  <p className="mb-1"><strong>Name:</strong> {comment.name}</p>
                  <p className="mb-1"><strong>Rating:</strong> ⭐ {comment.rating} / 5</p>
                  <p className="mb-1"><strong>Date:</strong> {new Date(comment.createdAt).toLocaleDateString()}</p>
                  <p className="mt-2"><strong>Comment:</strong> {comment.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AuthorComments;