import React, { useEffect, useState } from "react";
import axios from "axios";

const FilterBlog = () => {
  const [blogs, setBlogs] = useState([]);
  const [filteredBlogs, setFilteredBlogs] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");

  // GET ALL BLOGS
  useEffect(() => {
    axios.get("https://quillhub-backend-latest-2.onrender.com/blogs") // <-- updated port
      .then(res => {
        setBlogs(res.data);
        setFilteredBlogs(res.data);

        // Get unique authors
        const uniqueAuthors = [...new Set(res.data.map(blog => blog.authorName.trim()))];
        setAuthors(uniqueAuthors);
      })
      .catch(err => console.log(err));
  }, []);

  // HANDLE FILTER
  const handleFilter = (author) => {
    setSelectedAuthor(author);

    if (!author) {
      setFilteredBlogs(blogs);
    } else {
      const filtered = blogs.filter(
        blog => blog.authorName.trim() === author.trim()
      );
      setFilteredBlogs(filtered);
    }
  };

  return (
    <div className="container mt-4">
      <h4 className="mb-4">Filter Blogs By Author</h4>

      {/* Dropdown */}
      <div className="mb-4">
        <select
          className="form-select w-50"
          value={selectedAuthor}
          onChange={(e) => handleFilter(e.target.value)}
        >
          <option value="">-- Select Author --</option>
          {authors.map((author, index) => (
            <option key={index} value={author}>{author}</option>
          ))}
        </select>
      </div>

      {/* Table */}
      <table className="table table-bordered shadow">
        <thead className="table-dark">
          <tr>
            <th>ID</th>
            <th>Title</th>
            <th>Category</th>
            <th>Author</th>
          </tr>
        </thead>
        <tbody>
          {filteredBlogs.length > 0 ? (
            filteredBlogs.map(blog => (
              <tr key={blog.id}>
                <td>{blog.id}</td>
                <td>{blog.title}</td>
                <td>{blog.category}</td>
                <td>{blog.authorName}</td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="4" className="text-center">No Blogs Found</td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default FilterBlog;