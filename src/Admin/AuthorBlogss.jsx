import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const AuthorBlogss = () => {
  const { authorName } = useParams();
  const [blogs, setBlogs] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchBlogs = async () => {
      try {
        const res = await axios.get("https://quillhub-backend-latest-2.onrender.com/blogs"); 
        const filtered = res.data.filter(
          blog => blog.authorName?.trim().toLowerCase() === authorName.trim().toLowerCase()
        );
        setBlogs(filtered);
      } catch (err) {
        console.error("Error fetching blogs:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchBlogs();
  }, [authorName]);

  if (loading) {
    return <h4 className="text-center mt-4">Loading blogs...</h4>;
  }

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h4>Blogs by {authorName}</h4>
        <Link to="/admin/dashboard/authors" className="btn btn-secondary btn-sm">
          Back
        </Link>
      </div>

      {blogs.length === 0 ? (
        <p className="text-center text-muted">No blogs found for this author.</p>
      ) : (
        <div className="row">
          {blogs.map(blog => (
            <div className="col-md-6 mb-4" key={blog.id}>
              <div className="card h-100 shadow-sm">
                {blog.image && (
                  <img
                    src={blog.image}
                    className="card-img-top"
                    alt={blog.title}
                    style={{ height: "180px", objectFit: "cover" }}
                  />
                )}
                <div className="card-body">
                  <h5 className="card-title">{blog.title}</h5>
                  <p className="card-text">{blog.description}</p>
                  <p className="text-muted">
                    <small>
                      Category: {blog.category} | Created: {new Date(blog.createdAt).toLocaleDateString()}
                    </small>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default AuthorBlogss;