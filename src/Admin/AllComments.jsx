import React, { useEffect, useState } from "react";
import axios from "axios";

const AllComments = () => {
  const [blogs, setBlogs] = useState([]);
  const [comments, setComments] = useState([]);
  const [filteredComments, setFilteredComments] = useState([]);
  const [authors, setAuthors] = useState([]);
  const [selectedAuthor, setSelectedAuthor] = useState("");
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchData = async () => {
      try {
        // Fetch all blogs first
        const blogRes = await axios.get("https://quillhub-backend-latest-2.onrender.com/blogs"); 
        const allBlogs = blogRes.data;
        setBlogs(allBlogs);

        // Extract unique authors from blogs
        const uniqueAuthors = Array.from(
          new Set(allBlogs.map(blog => blog.authorName))
        );
        setAuthors(uniqueAuthors);

        // Fetch all comments
        const commentRes = await axios.get("https://quillhub-backend-latest-2.onrender.com/comments"); 
        setComments(commentRes.data);
        setFilteredComments(commentRes.data);

      } catch (err) {
        console.error("Error fetching data:", err);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  // Handle author filter
  const handleAuthorFilter = (e) => {
    const authorName = e.target.value;
    setSelectedAuthor(authorName);

    if (!authorName) {
      setFilteredComments(comments);
    } else {
      const filtered = comments.filter(comment => {
        const blog = blogs.find(b => String(b.id) === String(comment.blogId));
        return blog?.authorName?.trim().toLowerCase() === authorName.trim().toLowerCase();
      });
      setFilteredComments(filtered);
    }
  };

  if (loading) {
    return <div className="text-center mt-5">Loading comments...</div>;
  }

  return (
    <div className="container py-4">
      <h2 className="mb-4">All Blog Comments</h2>

      {/* Author Filter */}
      <div className="mb-4">
        <label className="form-label me-2">Filter by Author:</label>
        <select
          className="form-select w-auto d-inline-block"
          value={selectedAuthor}
          onChange={handleAuthorFilter}
        >
          <option value="">All Authors</option>
          {authors.map(author => (
            <option key={author} value={author}>{author}</option>
          ))}
        </select>
      </div>

      {filteredComments.length === 0 ? (
        <p>No comments found.</p>
      ) : (
        <div className="row">
          {filteredComments.map(comment => {
            const blog = blogs.find(b => String(b.id) === String(comment.blogId));

            return (
              <div key={comment.id} className="col-md-4 mb-4">
                <div className="card shadow-sm h-100">
                  <div className="card-body d-flex flex-column">
                    <h6 className="text-primary mb-2">
                      Blog: {blog ? blog.title : "Unknown Blog"}
                    </h6>
                    <p className="mb-1"><strong>Name:</strong> {comment.authorName || comment.name}</p>
                    <p className="mb-1"><strong>Rating:</strong> ⭐ {comment.rating} / 5</p>
                    <p className="mb-1"><strong>Date:</strong> {new Date(comment.createdAt).toLocaleDateString()}</p>
                    <p className="mt-2"><strong>Comment:</strong> {comment.comment}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      )}
    </div>
  );
};

export default AllComments;