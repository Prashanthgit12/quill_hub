import React, { useEffect, useState } from "react";
import { useParams, Link } from "react-router-dom";
import axios from "axios";

const CategoryPage = () => {
  const { name } = useParams();
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // ✅ FETCH FROM SPRING BOOT
    axios.get("https://quillhub-backend-latest-2.onrender.com/blogs")
      .then(res => {
        const filtered = res.data.filter(
          (blog) =>
            blog.category?.toLowerCase() === name.toLowerCase()
        );
        setBlogs(filtered);
      })
      .catch(err => console.log(err));
  }, [name]);

  return (
    <div className="container py-5">

      <h2 className="text-center text-primary fw-bold mb-4">
        <i className="bi bi-folder-fill me-2"></i>
        {name.toUpperCase()} Blogs
      </h2>

      <div className="row g-4">
        {blogs.length > 0 ? (
          blogs.map((b) => (
            <div className="col-md-6" key={b.id}>
              <div className="card shadow-lg border-0 h-100">

                <div className="row g-0">

                  {/* LEFT IMAGE */}
                  <div className="col-6">
                    <img
                      src={`https://quillhub-backend-latest-2.onrender.com/${b.image}`} // ✅ FIXED
                      alt={b.title}
                      className="img-fluid"
                      style={{ objectFit: "cover", width: "100%", height: "100%" }}
                    />
                  </div>

                  {/* RIGHT CONTENT */}
                  <div className="col-6">
                    <div className="card-body d-flex flex-column">

                      <h5 className="fw-bold">
                        {b.title?.slice(0, 40)}
                      </h5>

                      <p className="text-muted small">
                        <i className="bi bi-person-fill me-2"></i>
                        {b.authorName}
                      </p>

                      <p className="small text-secondary">
                        {b.description?.slice(0, 80)}...
                      </p>

                      <div className="mt-auto">
                        <Link
                          to={`/blogs/${b.id}`}
                          className="btn btn-primary btn-sm w-100"
                        >
                          View Blog
                        </Link>
                      </div>

                    </div>
                  </div>

                </div>

              </div>
            </div>
          ))
        ) : (
          <h5 className="text-center text-muted">
            No blogs found in this category.
          </h5>
        )}
      </div>

    </div>
  );
};

export default CategoryPage;