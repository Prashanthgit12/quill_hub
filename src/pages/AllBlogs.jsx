import React, { useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';

const AllBlogs = () => {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    axios.get("https://quillhub-backend-latest-2.onrender.com/blogs") 
      .then((res) => setBlogs(res.data))
      .catch((err) => console.log(err));
  }, []);

  return (
    <div className='container py-5'>
      <h2 className='text-center text-primary fw-bold mb-4'>
        <i className="bi bi-journal-text me-2"></i>
        Different Types of Blogs
      </h2>

      <div className="row g-4">
        {blogs.map((b) => (
          <div className="col-lg-3 col-md-6" key={b.id}>
            <div className="card shadow-lg h-100 border-0">

              <img 
                src={b.image}
                alt={b.title}
                className="card-img-top"
                style={{ height: "100%", width:"100%", objectFit: "cover" }}
              />

              <div className="card-body d-flex flex-column">

                <h5 className="fw-bold">
                  {b.title?.slice(0, 25)}...
                </h5>

                <p className="text-muted mb-1">
                  <i className="bi bi-tag-fill me-2"></i>
                  {b.category}
                </p>

                <p className="text-muted mb-1">
                  <i className="bi bi-person-fill me-2"></i>
                  {b.authorName}
                </p>

                <p className="small text-secondary">
                  {b.description?.slice(0, 60)}...
                </p>

                <div className="mt-auto">
                  <Link to={`/blogs/${b.id}`}>
                    <button className="btn btn-primary btn-sm w-100">
                      View Blog
                    </button>
                  </Link>
                </div>

              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default AllBlogs;