import React, { useEffect, useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const ManageAuthors = () => {
  const [authors, setAuthors] = useState([]);
  const [blogs, setBlogs] = useState([]);
  const navigate = useNavigate();

  // FETCH USERS + BLOGS
  const fetchData = () => {
    axios.get("https://quillhub-backend-latest-2.onrender.com/users") // ✅ updated port
      .then(res => {
        const onlyAuthors = res.data.filter(user => user.role === "author");
        setAuthors(onlyAuthors);
      })
      .catch(err => console.log(err));

    axios.get("https://quillhub-backend-latest-2.onrender.com/blogs") // ✅ updated port
      .then(res => setBlogs(res.data))
      .catch(err => console.log(err));
  };

  useEffect(() => {
    fetchData();
  }, []);

  // BLOG COUNT
  const getBlogCount = (authorName) => {
    return blogs.filter(
      blog => blog.authorName?.trim().toLowerCase() === authorName.trim().toLowerCase()
    ).length;
  };

  // DELETE AUTHOR
  const handleDelete = (id) => {
    axios.delete(`https://quillhub-backend-latest-2.onrender.com/users/${id}`) // ✅ updated port
      .then(() => fetchData())
      .catch(err => console.log(err));
  };

  // BLOCK / UNBLOCK AUTHOR
  const toggleStatus = (author) => {
    const updatedStatus = author.status === "blocked" ? "active" : "blocked";
    axios.put(`https://quillhub-backend-latest-2.onrender.com/users/${author.id}`, {
      ...author,
      status: updatedStatus
    }).then(() => fetchData())
      .catch(err => console.log(err));
  };

  // VIEW AUTHOR BLOGS
  const viewAuthorBlogs = (authorName) => {
    navigate(`/admin/dashboard/authorblogs/${encodeURIComponent(authorName)}`);
  };

  return (
    <div className="container mt-4">
      <div className="d-flex justify-content-between mb-4">
        <h4>Manage Authors</h4>
        <span className="badge bg-dark fs-6">
          Total Authors: {authors.length}
        </span>
      </div>

      <table className="table table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Name</th>
            <th>Email</th>
            <th>Blogs</th>
            <th>Actions</th>
          </tr>
        </thead>

        <tbody>
          {authors.length > 0 ? (
            authors.map(author => (
              <tr key={author.id}>
                <td>{author.id}</td>
                <td>{author.name}</td>
                <td>{author.email}</td>
                <td>
                  <span className="badge bg-info">{getBlogCount(author.name)}</span>
                </td>
                <td>
                  <button
                    className="btn btn-primary btn-sm me-2"
                    onClick={() => viewAuthorBlogs(author.name)}
                  >
                    View Blogs
                  </button>
                  <button
                    className="btn btn-warning btn-sm me-2"
                    onClick={() => toggleStatus(author)}
                  >
                    {author.status === "blocked" ? "Unblock" : "Block"}
                  </button>
                  <button
                    className="btn btn-danger btn-sm"
                    onClick={() => handleDelete(author.id)}
                  >
                    Delete
                  </button>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="5" className="text-center">
                No Authors Found
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default ManageAuthors;