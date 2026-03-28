import React, { useEffect, useState } from "react";
import { useParams } from "react-router-dom";
import axios from "axios";
import Comments from "../Approuter/Comments";
import AddComment from "./AddComment";

const BlogDetails = () => {
  const { id } = useParams();
  const [blog, setBlog] = useState(null);
  const [refreshKey, setRefreshKey] = useState(0);

  // ✅ FETCH FROM SPRING BOOT
  useEffect(() => {
    axios.get(`https://quillhub-backend-latest-2.onrender.com/blogs/${id}`) // ✅ changed
      .then(res => setBlog(res.data))
      .catch(err => console.log(err));
  }, [id]);

  const handleCommentAdded = () => {
    setRefreshKey(prev => prev + 1);
  };

  if (!blog) return <h3 className="text-center mt-5">Loading...</h3>;

  return (
    <div className="container py-5">

      {/* BLOG CARD */}
      <div className="card shadow-lg border-0 p-4 mb-4">

        <div className="row align-items-center">

          {/* LEFT SIDE IMAGE */}
          <div className="col-6">
            <img
              src={`https://quillhub-backend-latest-2.onrender.com/${blog.image}`} // ✅ fix image path
              alt={blog.title}
              className="img-fluid rounded shadow"
              style={{ height: "100%", width: "100%", objectFit: "cover" }}
            />
          </div>

          {/* RIGHT SIDE CONTENT */}
          <div className="col-6">

            <h2 className="fw-bold mb-3">{blog.title}</h2>

            <p className="text-muted mb-2">
              <i className="bi bi-tag-fill me-2"></i>
              {blog.category}
            </p>

            <p className="text-muted mb-2">
              <i className="bi bi-person-fill me-2"></i>
              {blog.authorName}
            </p>

            <p className="text-muted mb-3">
              <i className="bi bi-calendar-event me-2"></i>
              {blog.createdAt}
            </p>

            <hr />

            <p style={{ lineHeight: "1.8" }}>
              {blog.content}
            </p>

          </div>
        </div>
      </div>

      {/* COMMENTS SECTION */}
      <div className="col-lg-10 mx-auto">

        <h4 className="fw-bold mb-3">
          <i className="bi bi-chat-dots-fill me-2"></i>
          Comments
        </h4>

        <AddComment blogId={id} onCommentAdded={handleCommentAdded} />

        <Comments blogId={id} refreshKey={refreshKey} />

      </div>

    </div>
  );
};

export default BlogDetails;