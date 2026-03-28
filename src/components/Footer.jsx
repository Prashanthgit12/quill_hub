import React, { useState } from "react";
import { Link } from "react-router-dom";
import axios from "axios";
import "bootstrap-icons/font/bootstrap-icons.css";

const Footer = () => {
  const [email, setEmail] = useState("");
  const [message, setMessage] = useState("");
  const [loading, setLoading] = useState(false);

  const handleSubscribe = () => {
    if (!email) {
      setMessage("Please enter your email!");
      return;
    }

    setLoading(true);
    setMessage("");

    axios.post("http://localhost:8080/api/subscribe", { email })
      .then(res => {
        setMessage(res.data);
        setEmail("");
      })
      .catch(err => {
        setMessage(err.response?.data || "Something went wrong");
      })
      .finally(() => setLoading(false));
  };

  return (
    <footer className="bg-dark text-light pt-5">
      <div className="container">
        <div className="row">

          {/* ================= BRAND / LOGO ================= */}
          <div className="col-md-3 mb-4">
            <h3 className="fw-bold mb-3">
              <i className="bi bi-lightning-charge-fill me-2 text-warning"></i>QuillHub
            </h3>
            <p>Learn, explore, and build with our curated blogs on tech, programming, design, and business.</p>
          </div>

          {/* ================= QUICK LINKS ================= */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Quick Links</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/" className="text-light text-decoration-none">
                  <i className="bi bi-house-door-fill me-2"></i> Home
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/all-blogs" className="text-light text-decoration-none">
                  <i className="bi bi-journal-text me-2"></i> Blogs
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= CATEGORIES ================= */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Categories</h5>
            <ul className="list-unstyled">
              <li className="mb-2">
                <Link to="/category/technology" className="text-light text-decoration-none">
                  <i className="bi bi-cpu-fill me-2"></i> Technology
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/programming" className="text-light text-decoration-none">
                  <i className="bi bi-code-slash me-2"></i> Programming
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/design" className="text-light text-decoration-none">
                  <i className="bi bi-palette-fill me-2"></i> Design
                </Link>
              </li>
              <li className="mb-2">
                <Link to="/category/business" className="text-light text-decoration-none">
                  <i className="bi bi-briefcase-fill me-2"></i> Business
                </Link>
              </li>
            </ul>
          </div>

          {/* ================= SOCIAL & NEWSLETTER ================= */}
          <div className="col-md-3 mb-4">
            <h5 className="fw-bold mb-3">Follow Us</h5>
            <div className="d-flex mb-3">
              <a href="#" className="btn btn-outline-light btn-sm me-2 rounded-circle">
                <i className="bi bi-facebook"></i>
              </a>
              <a href="#" className="btn btn-outline-light btn-sm me-2 rounded-circle">
                <i className="bi bi-twitter"></i>
              </a>
              <a href="#" className="btn btn-outline-light btn-sm me-2 rounded-circle">
                <i className="bi bi-instagram"></i>
              </a>
              <a href="#" className="btn btn-outline-light btn-sm rounded-circle">
                <i className="bi bi-linkedin"></i>
              </a>
            </div>
            <h5 className="fw-bold mb-2">Subscribe</h5>
            <div className="input-group mb-2">
              <input
                type="email"
                className="form-control form-control-sm"
                placeholder="Your email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                disabled={loading}
              />
              <button
                className="btn btn-warning btn-sm"
                type="button"
                onClick={handleSubscribe}
                disabled={loading}
              >
                <i className="bi bi-envelope-fill"></i> {loading ? "Sending..." : "Subscribe"}
              </button>
            </div>
            {message && <small className="text-warning">{message}</small>}
          </div>

        </div>

        {/* ================= COPYRIGHT ================= */}
        <div className="text-center py-3 border-top border-secondary mt-4">
          <small>
            &copy; {new Date().getFullYear()} <strong>QuillHub</strong>. All rights reserved.
          </small>
        </div>
      </div>

      {/* ================= HOVER EFFECT ================= */}
      <style>
        {`
          a.text-light:hover {
            text-decoration: none;
            color: #ffc107 !important;
          }
          .btn-outline-light:hover {
            background-color: #ffc107 !important;
            color: #000 !important;
            border-color: #ffc107 !important;
          }
        `}
      </style>
    </footer>
  );
};

export default Footer;