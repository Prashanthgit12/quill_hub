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

  // ✅ FETCH BLOGS FROM SPRING BOOT
  useEffect(() => {
    if (!login?.user) return;

    axios.get("https://quillhub-backend-latest-2.onrender.com/blogs") // ✅ FIXED
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

  // ✅ DELETE BLOG
  const deleteBlog = (id) => {
    axios.delete(`https://quillhub-backend-latest-2.onrender.com/blogs/${id}`) // ✅ FIXED
      .then(() => {
        const updated = blogs.filter(blog => blog.id !== id);
        setBlogs(updated);
        setFilteredBlogs(updated);
      })
      .catch(err => console.log(err));
  };

  // ✅ FILTER
  const handleFilter = (value) => {
    setCategory(value);

    if (value === "") {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        blog => blog.category === value
      );
      setFilteredBlogs(filtered);
    }
  };

  // ✅ START EDIT
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

  // ✅ HANDLE EDIT CHANGE
  const handleEditChange = (e) => {
    setEditData({ ...editData, [e.target.name]: e.target.value });
  };

  // ✅ UPDATE BLOG
  const updateBlog = (id) => {
    axios.put(`https://quillhub-backend-latest-2.onrender.com/blogs/${id}`, {
      ...editData,
      authorName: login.user.name
    })
    .then(() => {

      const updatedBlogs = blogs.map(blog =>
        blog.id === id ? { ...blog, ...editData } : blog
      );

      setBlogs(updatedBlogs);
      setFilteredBlogs(updatedBlogs);
      setEditId(null);
    })
    .catch(err => console.log(err));
  };

  return (
    <div className="container py-4">

      <h3 className="text-center text-primary mb-4">My Blogs</h3>

      {/* FILTER */}
      <div className="mb-4 text-center">
        <select
          className="form-select w-50 mx-auto"
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
          <div className="col-4 mb-4" key={blog.id}>
            <div className="card shadow h-100">

              {editId === blog.id ? (

                // ✏️ EDIT MODE
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

                // 📄 VIEW MODE
                <>
                  <img
                    src={`https://quillhub-backend-latest-2.onrender.com/${blog.image}`} // ✅ FIXED
                    alt={blog.title}
                    className="card-img-top"
                    style={{
                      height: "230px",
                      objectFit: "cover"
                    }}
                  />

                  <div className="card-body">

                    <h5>{blog.title}</h5>
                    <p className="text-muted">{blog.category}</p>
                    <p>{blog.description?.slice(0, 80)}...</p>
                    <p className="text-muted small">{blog.createdAt}</p>

                    <button
                      className="btn btn-warning btn-sm me-3"
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