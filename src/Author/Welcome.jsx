import React, { useContext } from "react";
import useApi from "../UseApi";
import { loginData } from "../App";

const Welcome = () => {
  const { login } = useContext(loginData);

  // ✅ Prevent crash if not logged in
  if (!login?.user) {
    return <h4 className="text-center mt-5">Please login</h4>;
  }

  const { data: allBlogs, loading: blogsLoading } = useApi("blogs");
  const { data: allComments, loading: commentsLoading } = useApi("comments");

  if (blogsLoading || commentsLoading) {
    return <h4 className="text-center mt-4">Loading...</h4>;
  }

  // ✅ Filter blogs of logged-in author
  const myBlogs = allBlogs.filter(
    (blog) => blog.authorName === login.user.name
  );

  // ✅ Get blog IDs
  const myBlogIds = myBlogs.map((blog) => blog.id);

  // ✅ Filter comments for those blogs
  const commentsOnMyBlogs = allComments.filter((comment) =>
    myBlogIds.includes(comment.blogId)
  );

  const totalBlogs = myBlogs.length;
  const totalComments = commentsOnMyBlogs.length;

  return (
    <div className="container py-4">

      <h2 className="mb-4 text-center text-primary">
        Welcome, {login.user.name}
      </h2>

      {/* SUMMARY */}
      <div className="row mb-4 justify-content-center">

        <div className="col-md-4">
          <div className="card text-center shadow-sm border-warning">
            <div className="card-body">
              <h5 className="card-title text-secondary">Total Blogs</h5>
              <p className="display-6 fw-bold">{totalBlogs}</p>
            </div>
          </div>
        </div>

        <div className="col-md-4">
          <div className="card text-center shadow-sm border-warning">
            <div className="card-body">
              <h5 className="card-title text-secondary">Comments Received</h5>
              <p className="display-6 fw-bold">{totalComments}</p>
            </div>
          </div>
        </div>

      </div>

      <hr className="my-5" />

      {/* COMMENTS */}
      <h4 className="mb-3">Recent Feedback</h4>

      <div className="table-responsive shadow-sm bg-white p-3 rounded mb-5">
        {commentsOnMyBlogs.length === 0 ? (
          <p className="text-center text-muted">No feedback yet</p>
        ) : (
          <table className="table table-hover">
            <thead className="table-light">
              <tr>
                <th>From</th>
                <th>Comment</th>
                <th>Rating</th>
              </tr>
            </thead>
            <tbody>
              {commentsOnMyBlogs.map((c) => (
                <tr key={c.id}>
                  <td><strong>{c.name}</strong></td>
                  <td>{c.comment}</td>
                  <td>
                    <span className="badge bg-warning text-dark">
                      {c.rating} ⭐
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        )}
      </div>

      <hr className="my-5" />

      {/* BLOGS */}
      <h4 className="mb-4">My Blogs</h4>

      <div className="row">
        {myBlogs.length === 0 ? (
          <p className="text-center text-muted">
            No blogs published yet
          </p>
        ) : (
          myBlogs.map((blog) => (
            <div key={blog.id} className="col-md-4 mb-4">

              <div className="card shadow-sm h-100">

                {/* ✅ FIX IMAGE PATH */}
                {blog.image && (
                  <img
                    src={`http://localhost:5173${blog.image}`}
                    alt={blog.title}
                    className="card-img-top"
                    style={{ height: "150px", objectFit: "cover" }}
                  />
                )}

                <div className="card-body d-flex flex-column">
                  <h5 className="text-primary">{blog.title}</h5>

                  <p className="text-muted small flex-grow-1">
                    {blog.description}
                  </p>

                  <div className="mt-3 border-top pt-2">
                    <span className="badge bg-light text-dark">
                      {blog.category}
                    </span>

                    <p className="small mt-2 mb-0">
                      <strong>Author:</strong> {blog.authorName}
                    </p>
                  </div>

                </div>

              </div>

            </div>
          ))
        )}
      </div>

    </div>
  );
};

export default Welcome;