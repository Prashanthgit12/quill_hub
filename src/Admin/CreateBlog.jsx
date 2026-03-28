import React, { useState, useContext } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import { loginData } from "../App";

const CreateBlog = () => {
  const navigate = useNavigate();
  const { login } = useContext(loginData);

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    image: "",
    author: login.user?.name || "", 
  });

  const handleChange = (e) => {
    setBlog({
      ...blog,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const newBlog = {
      ...blog,
      createdAt: new Date().toISOString(),
    };

    try {
      await axios.post(`https://quillhub-backend-latest-2.onrender.com/blogs`, newBlog);
      alert("Blog Created Successfully!");
      navigate("/author/dashboard/myblogs"); // Redirect after creation
    } catch (err) {
      console.error("Error creating blog:", err);
      alert("Failed to create blog. Check console for details.");
    }
  };

  return (
    <div className="container mt-4">
      <div className="card shadow p-4">
        <h3 className="text-center mb-4">Create New Blog</h3>

        <form onSubmit={handleSubmit}>

          {/* Title */}
          <div className="mb-3">
            <label className="form-label">Title</label>
            <input
              type="text"
              name="title"
              className="form-control"
              value={blog.title}
              onChange={handleChange}
              required
            />
          </div>

          {/* Category */}
          <div className="mb-3">
            <label className="form-label">Category</label>
            <input
              type="text"
              name="category"
              className="form-control"
              value={blog.category}
              onChange={handleChange}
              required
            />
          </div>

          {/* Description */}
          <div className="mb-3">
            <label className="form-label">Description</label>
            <input
              type="text"
              name="description"
              className="form-control"
              value={blog.description}
              onChange={handleChange}
              required
            />
          </div>

          {/* Image */}
          <div className="mb-3">
            <label className="form-label">Image URL</label>
            <input
              type="text"
              name="image"
              className="form-control"
              value={blog.image}
              onChange={handleChange}
              required
            />
          </div>

          {/* Author (readonly if logged in) */}
          <div className="mb-3">
            <label className="form-label">Author</label>
            <input
              type="text"
              name="author"
              className="form-control"
              value={blog.author}
              onChange={handleChange}
              readOnly={!!login.user} // Prevent editing if logged in
            />
          </div>

          {/* Content */}
          <div className="mb-3">
            <label className="form-label">Content</label>
            <textarea
              name="content"
              rows="5"
              className="form-control"
              value={blog.content}
              onChange={handleChange}
              required
            ></textarea>
          </div>

          {/* Submit Button */}
          <button type="submit" className="btn btn-success w-100">
            Create Blog
          </button>

        </form>
      </div>
    </div>
  );
};

export default CreateBlog;