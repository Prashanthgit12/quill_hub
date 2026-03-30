import axios from "axios";
import React, { useContext, useEffect, useState } from "react";
import { loginData } from "../App";

const MyBlogs = () => {
  const { login } = useContext(loginData);

  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [category, setCategory] = useState("");

  const [editId, setEditId] = useState(null);
  const [editData, setEditData] = useState({
    title: "",
    category: "",
    description: "",
    content: "",
    image: "",
    createdAt: ""
  });

  useEffect(() => {
    if (!login?.user) return;

    axios
      .get("https://quillhub-backend-latest-2.onrender.com/blogs")
      .then((res) => {
        const myBlogs = res.data.filter(
          (blog) =>
            blog.authorName === login.user.name ||
            blog.userId === login.user.id
        );
        setBlogs(myBlogs);
        setFilteredBlogs(myBlogs);
      })
      .catch((err) => console.log(err));
  }, [login]);

  const deleteBlog = (id) => {
    axios
      .delete(`https://quillhub-backend-latest-2.onrender.com/blogs/${id}`)
      .then(() => {
        const updated = blogs.filter((blog) => blog.id !== id);
        setBlogs(updated);
        setFilteredBlogs(updated);
      })
      .catch((err) => console.log(err));
  };

  const handleFilter = (value) => {
    setCategory(value);

    if (value === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter((blog) => blog.category === value);
      setFilteredBlogs(filtered);
    }
  };

  const startEdit = (blog) => {
    setEditId(blog.id);
    setEditData({
      title: blog.title || "",
      category: blog.category || "",
      description: blog.description || "",
      content: blog.content || "",
      image: blog.image || "",
      createdAt: blog.createdAt || ""
    });
  };

  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  const updateBlog = (id) => {
    axios
      .put(`https://quillhub-backend-latest-2.onrender.com/blogs/${id}`, {
        ...editData,
        authorName: login.user.name
      })
      .then(() => {
        const updatedBlogs = blogs.map((blog) =>
          blog.id === id ? { ...blog, ...editData } : blog
        );

        setBlogs(updatedBlogs);
        setFilteredBlogs(updatedBlogs);
        setEditId(null);
      })
      .catch((err) => console.log(err));
  };

  return (
    <div className="container py-4">
      <h3 className="text-center text-primary mb-4">My Blogs</h3>

      <div className="mb-4 text-center">
        <select
          className="form-select mx-auto"
          style={{ maxWidth: "400px", width: "100%" }}
          value={category}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">All Categories</option>
          <option value="programming">Programming</option>
          <option value="design">Design</option>
          <option value="technology">Technology</option>
          <option value="business">Business</option>
        </select>
      </div>

      <div className="row">
        {filteredBlogs.length === 0 && (
          <p className="text-center text-muted">No Blogs Found</p>
        )}

        {filteredBlogs.map((blog) => (
          <div className="col-12 col-sm-6 col-lg-4 mb-4" key={blog.id}>
            <div className="card shadow h-100 overflow-hidden">
              {editId === blog.id ? (
                <div className="card-body">
                  <input
                    type="text"
                    name="title"
                    value={editData.title}
                    onChange={handleEditChange}
                    className="form-control mb-2"
                  />

                  <select
                    name="category"
                    value={editData.category}
                    onChange={handleEditChange}
                    className="form-select mb-2"
                  >
                    <option value="programming">Programming</option>
                    <option value="design">Design</option>
                    <option value="technology">Technology</option>
                    <option value="business">Business</option>
                  </select>

                  <input
                    type="text"
                    name="description"
                    value={editData.description}
                    onChange={handleEditChange}
                    className="form-control mb-2"
                  />

                  <textarea
                    name="content"
                    value={editData.content}
                    onChange={handleEditChange}
                    className="form-control mb-2"
                    rows="4"
                  />

                  <input
                    type="text"
                    name="image"
                    value={editData.image}
                    onChange={handleEditChange}
                    className="form-control mb-2"
                  />

                  <input
                    type="date"
                    name="createdAt"
                    value={editData.createdAt}
                    onChange={handleEditChange}
                    className="form-control mb-2"
                  />

                  <button
                    className="btn btn-success btn-sm me-2"
                    onClick={() => updateBlog(blog.id)}
                  >
                    Save
                  </button>

                  <button
                    className="btn btn-secondary btn-sm"
                    onClick={() => setEditId(null)}
                  >
                    Cancel
                  </button>
                </div>
              ) : (
                <>
                  <img
                    src={`https://quillhub-backend-latest-2.onrender.com/${blog.image}`}
                    alt={blog.title}
                    className="card-img-top img-fluid"
                    style={{
                      width: "100%",
                      height: "220px",
                      objectFit: "cover"
                    }}
                  />

                  <div className="card-body d-flex flex-column">
                    <h5>{blog.title}</h5>
                    <p className="text-muted mb-1">{blog.category}</p>
                    <p>{blog.description?.slice(0, 80)}...</p>
                    <p className="text-muted small">{blog.createdAt}</p>

                    <div className="mt-auto d-flex flex-wrap gap-2">
                      <button
                        className="btn btn-warning btn-sm"
                        onClick={() => startEdit(blog)}
                      >
                        Edit
                      </button>

                      <button
                        className="btn btn-danger btn-sm"
                        onClick={() => deleteBlog(blog.id)}
                      >
                        Delete
                      </button>
                    </div>
                  </div>
                </>
              )}
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default MyBlogs;