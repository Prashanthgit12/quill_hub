import React, { useContext } from "react";
import useApi from "../UseApi"; // adjust path
import { loginData } from "../App";

const AdminWelcome = () => {
  const { login } = useContext(loginData);

  const { data: blogs, loading: blogsLoading } = useApi("blogs");
  const { data: users, loading: usersLoading } = useApi("users");
  const { data: comments, loading: commentsLoading } = useApi("comments");

  if (blogsLoading || usersLoading || commentsLoading) {
    return <h4 className="text-center mt-4">Loading...</h4>;
  }

  const authors = users.filter((user) => user.role === "author");

  const totalBlogs = blogs.length;
  const totalAuthors = authors.length;
  const totalComments = comments.length;

  return (
    <div className="container py-4">
      <h2 className="mb-4 text-center text-primary">
        Welcome {login.user.name}
      </h2>

      {/* Summary Cards */}
      <div className="row mb-4 g-4">
        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Blogs</h5>
              <p className="card-text display-6">{totalBlogs}+</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Authors</h5>
              <p className="card-text display-6">{totalAuthors}+</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm">
            <div className="card-body">
              <h5 className="card-title">Total Comments</h5>
              <p className="card-text display-6">{totalComments}+</p>
            </div>
          </div>
        </div>
      </div>

      {/* Blogs List */}
      <h4 className="mb-3">All Blogs</h4>
      <div className="row">
        {blogs.map((blog) => (
          <div key={blog.id} className="col-md-4 mb-3">
            <div className="card shadow-sm h-100">
              {blog.image && (
                <img
                  src={blog.image}
                  alt={blog.title}
                  className="card-img-top"
                  style={{ height: "150px", objectFit: "cover" }}
                />
              )}
              <div className="card-body">
                <h5>{blog.title}</h5>
                <p>{blog.description}</p>
                <p>
                  <strong>Author:</strong> {blog.authorName}
                </p>
                <p>
                  <strong>Category:</strong> {blog.category}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Authors List */}
      <h4 className="mt-5 mb-3">All Authors</h4>
      <div className="row">
        {authors.map((author) => (
          <div key={author.id} className="col-md-3 mb-3">
            <div className="card text-center shadow-sm">
              <div className="card-body">
                <h5>{author.name}</h5>
                <p>{author.email}</p>
                <p>
                  <strong>Status:</strong>{" "}
                  {author.status || "active"}
                </p>
              </div>
            </div>
          </div>
        ))}
      </div>

      {/* Comments List */}
      <h4 className="mt-5 mb-3">All Comments</h4>
      <div className="row">
        {comments.map((comment) => {
          const blog = blogs.find(
            (b) => String(b.id) === String(comment.blogId)
          );

          return (
            <div key={comment.id} className="col-md-3 mb-3">
              <div className="card text-center shadow-sm">
                <div className="card-body">
                  <h6>{blog ? blog.title : "Unknown Blog"}</h6>
                  <p>
                    <strong>Name:</strong> {comment.name || comment.authorName}
                  </p>
                  <p>
                    <strong>Rating:</strong> {"⭐".repeat(comment.rating || 0)}
                  </p>
                  <p>
                    <strong>Date:</strong>{" "}
                    {new Date(comment.createdAt).toLocaleDateString()}
                  </p>
                  <p>{comment.comment}</p>
                </div>
              </div>
            </div>
          );
        })}
      </div>
    </div>
  );
};

export default AdminWelcome;