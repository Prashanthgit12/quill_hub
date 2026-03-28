import React, { useEffect, useState } from "react";
import axios from "axios";
import { useParams, useNavigate } from "react-router-dom";

const AuthorBlogDetails = () => {
  const { id } = useParams();
  const navigate = useNavigate();

  const [blog, setBlog] = useState(null);
  const [loading, setLoading] = useState(true);

  // ✅ FETCH FROM SPRING BOOT
  useEffect(() => {
    axios
      .get(`https://quillhub-backend-latest-2.onrender.com/blogs/${id}`) // ✅ FIXED
      .then((res) => {
        setBlog(res.data);
        setLoading(false);
      })
      .catch((err) => {
        console.log(err);
        setLoading(false);
      });
  }, [id]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading Blog...</h4>
      </div>
    );
  }

  if (!blog) {
    return (
      <div className="text-center mt-5">
        <h4>Blog Not Found</h4>
      </div>
    );
  }

  return (
    <div className="container py-5">

      {/* BACK BUTTON */}
      <button
        className="btn btn-outline-secondary mb-4"
        onClick={() => navigate(-1)}
      >
        ← Back
      </button>

      <div className="card shadow-lg border-0">

        <div className="row g-0">

          {/* IMAGE */}
          <div className="col-md-6">
            <img
              src={`https://quillhub-backend-latest-2.onrender.com${blog.image}`} // ✅ FIXED
              alt={blog.title}
              className="img-fluid h-100 w-100"
              style={{
                objectFit: "cover",
                minHeight: "100%"
              }}
            />
          </div>

          {/* CONTENT */}
          <div className="col-md-6">
            <div className="card-body p-4 d-flex flex-column h-100">

              <h2 className="fw-bold mb-3">
                {blog.title}
              </h2>

              <p className="text-muted mb-2">
                <strong>Category:</strong> {blog.category}
              </p>

              <p className="text-muted mb-2">
                <strong>Author:</strong> {blog.authorName}
              </p>

              <p className="text-muted mb-4">
                <strong>Published:</strong> {blog.createdAt}
              </p>

              <div style={{ flexGrow: 1 }}>
                <p
                  style={{
                    fontSize: "16px",
                    lineHeight: "1.8",
                    textAlign: "justify"
                  }}
                >
                  {blog.content}
                </p>
              </div>

            </div>
          </div>

        </div>

      </div>

    </div>
  );
};

export default AuthorBlogDetails;