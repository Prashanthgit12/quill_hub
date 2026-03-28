import axios from "axios";
import React, { useState, useContext } from "react";
import { loginData } from "../App";

const AddComment = ({ blogId, onCommentAdded }) => {

  const { login } = useContext(loginData);

  const [commentData, setCommentData] = useState({
    name: login.user?.name || "",
    comment: "",
    rating: "",
  });

  const changeHandler = (e) => {
    const { name, value } = e.target;
    setCommentData({
      ...commentData,
      [name]: value
    });
  };

  const submitHandler = (e) => {
    e.preventDefault();

    // 🔐 Check login
    if (!login.status) {
      alert("Please Login First 🔐");
      return;
    }

    axios.post("https://quillhub-backend-latest-2.onrender.com/comments", {
      name: commentData.name,
      comment: commentData.comment,
      rating: commentData.rating,
      blogId: Number(blogId) // ✅ IMPORTANT FIX
    })
    .then(() => {
      alert("Comment Added ✅");

      // Reset form
      setCommentData({
        name: login.user?.name || "",
        comment: "",
        rating: "",
      });

      // Refresh comments
      if (onCommentAdded) onCommentAdded();

    })
    .catch((err) => console.log(err));
  };

  return (
    <div className="row mt-4">

      {!login.status ? (
        <div className="alert alert-warning text-center">
          Please login to add comment 🔐
        </div>
      ) : (
        <form onSubmit={submitHandler} className="row">

          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-3"
              name="name"
              value={commentData.name}
              placeholder="Your Name"
              onChange={changeHandler}
              required
            />
          </div>

          <div className="col-md-4">
            <input
              type="text"
              className="form-control mb-3"
              name="comment"
              value={commentData.comment}
              placeholder="Your Comment"
              onChange={changeHandler}
              required
            />
          </div>

          <div className="col-md-2">
            <input
              type="number"
              className="form-control mb-3"
              name="rating"
              min={1}
              max={5}
              value={commentData.rating}
              placeholder="Rating"
              onChange={changeHandler}
              required
            />
          </div>

          <div className="col-md-2">
            <button type="submit" className="btn btn-primary w-100">
              Add
            </button>
          </div>

        </form>
      )}

    </div>
  );
};

export default AddComment;