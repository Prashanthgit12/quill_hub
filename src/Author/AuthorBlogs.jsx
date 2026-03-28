import React, { useContext, useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginData } from "../App";

const AuthorBlogs = () => {
  const { login } = useContext(loginData);
  const navigate = useNavigate();

  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  // 🔐 Redirect if not logged in
  useEffect(() => {
    if (!login?.user) {
      navigate("/login");
    }
  }, [login, navigate]);

  // 📥 Fetch Only Author Blogs
  useEffect(() => {
    if (login?.user) {
      axios
        .get("https://quillhub-backend-latest-2.onrender.com/blogs") // ✅ FIXED
        .then((res) => {

          const authorBlogs = res.data.filter((blog) => {
            return (
              blog.userId === login.user.id || 
              blog.authorName === login.user.name
            );
          });

          setBlogs(authorBlogs);
          setLoading(false);
        })
        .catch((err) => {
          console.error(err);
          setLoading(false);
        });
    }
  }, [login]);

  if (loading) {
    return (
      <div className="text-center mt-5">
        <h4>Loading Blogs...</h4>
      </div>
    );
  }

  return (
    <div className="container py-4">

      <h2 className="fw-bold mb-4">My Published Blogs</h2>

      {blogs.length === 0 ? (
        <div className="text-center mt-5">
          <h5>No Blogs Found</h5>
        </div>
      ) : (
        <div className="row">
          {blogs.map((blog) => (
            <div key={blog.id} className="col-md-6 col-lg-4 mb-4">
              
              <div
                className="card shadow-sm h-100"
                style={{ cursor: "pointer" }}
                onClick={() =>
                  navigate(`/author/dashboard/blog/${blog.id}`)
                }
              >

                <img
                  src={`https://quillhub-backend-latest-2.onrender.com${blog.image}`} // ✅ FIXED
                  alt={blog.title}
                  className="card-img-top"
                  style={{
                    height: "200px",
                    objectFit: "cover"
                  }}
                />

                <div className="card-body d-flex flex-column">

                  <h5 className="card-title fw-bold">
                    {blog.title}
                  </h5>

                  <p className="text-muted mb-2">
                    {blog.category}
                  </p>

                  <p className="card-text" style={{ flexGrow: 1 }}>
                    {blog.content?.slice(0, 120)}...
                  </p>

                  <div className="mt-3 text-end">
                    <span className="btn btn-outline-primary btn-sm">
                      View Details →
                    </span>
                  </div>

                </div>
              </div>

            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorBlogs;