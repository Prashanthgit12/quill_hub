import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { loginData } from "../App";

const AdminDashboard = () => {
  const { login } = useContext(loginData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login.status) {
      // Not logged in → redirect to login page
      navigate("/login");
    } else if (login.user.role === "author") {
      // Authors should not access admin → redirect to author dashboard
      navigate("/author/dashboard");
    }
  }, [login, navigate]);

  if (!login.status) return null; // Prevent rendering if not logged in

  return (
    <section className="d-flex" style={{ minHeight: "100vh" }}>
      
      {/* Sidebar */}
      <aside className="bg-dark text-white p-4" style={{ width: "260px" }}>
        <ul className="list-unstyled">

          {/* Welcome */}
          <li className="mb-3">
            <Link to="">
              <button className="btn btn-outline-warning w-100">
                Welcome, {login.user.name}
              </button>
            </Link>
          </li>

          {/* Blog Management */}
          <li className="text-secondary small mb-2">BLOG MANAGEMENT</li>
          <li className="mb-2">
            <Link to="blogs" className="text-decoration-none">
              <button className="btn btn-outline-warning w-100">All Blogs (CRUD)</button>
            </Link>
          </li>
          <li className="mb-2">
            <Link to="createblog" className="text-decoration-none">
              <button className="btn btn-outline-warning w-100">Create Blog</button>
            </Link>
          </li>
          <li className="mb-3">
            <Link to="filter" className="text-decoration-none">
              <button className="btn btn-outline-warning w-100">Filter by Author</button>
            </Link>
          </li>

          {/* Author Management */}
          <li className="text-secondary small mb-2">AUTHOR MANAGEMENT</li>
          <li className="mb-3">
            <Link to="authors" className="text-decoration-none">
              <button className="btn btn-outline-warning w-100">Manage Authors</button>
            </Link>
          </li>

          {/* Comments */}
          <li className="text-secondary small mb-2">COMMENTS</li>
          <li>
            <Link to="reviews" className="text-decoration-none">
              <button className="btn btn-outline-warning w-100">Read Comments</button>
            </Link>
          </li>

        </ul>
      </aside>

      {/* Main Content Area */}
      <div className="flex-grow-1 p-4 bg-light">
        <Outlet />
      </div>

    </section>
  );
};

export default AdminDashboard;