import React, { useEffect, useState } from "react";
import axios from "axios";

const Blogs = () => {
  const [blogs, setBlogs] = useState([]);
  const [editData, setEditData] = useState({
    id: "",
    title: "",
    authorName: "",
    category: "",
    description: "",
    content: ""
  });

  // ================= FETCH =================
  const fetchBlogs = async () => {
    try {
      const res = await axios.get("https://quillhub-backend-latest-2.onrender.com/blogs"); 
      setBlogs(res.data);
    } catch (err) {
      console.error("Error fetching blogs:", err);
    }
  };

  useEffect(() => {
    fetchBlogs();
  }, []);

  // ================= DELETE =================
  const handleDelete = async (id) => {
    if (!window.confirm("Are you sure you want to delete this blog?")) return;

    try {
      await axios.delete(`https://quillhub-backend-latest-2.onrender.com/blogs/${id}`);
      fetchBlogs();
    } catch (err) {
      console.error("Error deleting blog:", err);
    }
  };

  // ================= OPEN EDIT MODAL =================
  const handleEditClick = (blog) => {
    setEditData(blog);
  };

  // ================= HANDLE INPUT =================
  const handleChange = (e) => {
    setEditData({
      ...editData,
      [e.target.name]: e.target.value
    });
  };

  // ================= UPDATE =================
  const handleUpdate = async (e) => {
    e.preventDefault();

    try {
      await axios.put(`https://quillhub-backend-latest-2.onrender.com/blogs/${editData.id}`, editData);
      fetchBlogs();
      // Optional: show success message
      alert("Blog updated successfully ✅");
    } catch (err) {
      console.error("Error updating blog:", err);
    }
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-3">
        <h4>All Blogs Details</h4>
      </div>

      <table className="table table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Author</th>
            <th>Category</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {blogs.map(blog => (
            <tr key={blog.id}>
              <td>{blog.id}</td>
              <td>{blog.title}</td>
              <td>{blog.authorName}</td>
              <td>{blog.category}</td>
              <td>
                <button
                  className="btn btn-warning btn-sm me-2"
                  data-bs-toggle="modal"
                  data-bs-target="#editModal"
                  onClick={() => handleEditClick(blog)}
                >
                  Edit
                </button>

                <button
                  className="btn btn-danger btn-sm"
                  onClick={() => handleDelete(blog.id)}
                >
                  Delete
                </button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {/* ================= EDIT MODAL ================= */}
      <div className="modal fade" id="editModal" tabIndex="-1">
        <div className="modal-dialog modal-lg">
          <div className="modal-content">

            <div className="modal-header">
              <h5 className="modal-title">Edit Blog</h5>
              <button type="button" className="btn-close" data-bs-dismiss="modal"></button>
            </div>

            <form onSubmit={handleUpdate}>
              <div className="modal-body">
                <input
                  type="text"
                  name="title"
                  value={editData.title || ""}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Title"
                />

                <input
                  type="text"
                  name="authorName"
                  value={editData.authorName || ""}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Author Name"
                />

                <input
                  type="text"
                  name="category"
                  value={editData.category || ""}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Category"
                />

                <textarea
                  name="description"
                  value={editData.description || ""}
                  onChange={handleChange}
                  className="form-control mb-2"
                  placeholder="Description"
                />

                <textarea
                  name="content"
                  value={editData.content || ""}
                  onChange={handleChange}
                  className="form-control"
                  placeholder="Content"
                />
              </div>

              <div className="modal-footer">
                <button type="button" className="btn btn-secondary" data-bs-dismiss="modal">
                  Close
                </button>

                <button type="submit" className="btn btn-warning" data-bs-dismiss="modal">
                  Update Blog
                </button>
              </div>
            </form>

          </div>
        </div>
      </div>
    </div>
  );
};

export default Blogs;