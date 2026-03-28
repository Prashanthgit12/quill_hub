import axios from "axios";
import React, { useEffect, useState } from "react";

const Comments = ({ blogId, refreshKey }) => {
  const [comments, setComments] = useState([]);

  useEffect(() => {
    axios
      .get(`https://quillhub-backend-latest-2.onrender.com/comments/blog/${blogId}`)
      .then((res) => {
        setComments(res.data);
      })
      .catch((err) => console.log(err));
  }, [blogId, refreshKey]);

  return (
    <div className="row mt-4">

      {comments.length === 0 && (
        <p className="text-muted">Be the first to comment ✍️</p>
      )}

      {comments.map((c) => (
        <div key={c.id} className="col-md-6 mb-3">
          <div className="card shadow-sm border-0 h-100">

            <div className="card-body">

              {/* ⭐ Rating */}
              <p>
                {[...Array(Number(c.rating || 0))].map((_, i) => (
                  <span key={i}>⭐</span>
                ))}
              </p>

              {/* Comment */}
              <p>{c.comment}</p>

              {/* Author */}
              <p className="text-end text-muted mb-1">
                — {c.name}
              </p>

              {/* Date */}
              <small className="text-muted">
                {c.createdAt}
              </small>

            </div>

          </div>
        </div>
      ))}

    </div>
  );
};

export default Comments;