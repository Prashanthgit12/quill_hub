import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { loginData } from "../App";

const Navbar = () => {
  const {login, setLogin} = useContext(loginData)
  const navigate = useNavigate();

 const handleLogout = () => {
  localStorage.removeItem("user"); 
  setLogin({ status: false, user: null });
  navigate('/login');
};
  return (
    <nav className="navbar navbar-expand-lg   shadow sticky-top">
      <div className="container">
        {/* Brand */}
        <Link className="navbar-brand fw-bold" to="/">
          <img src="/images/quill-logo.png" alt="" width="70px" />
        </Link>

        {/* Mobile Toggle */}
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#userNavbar"
          aria-controls="userNavbar"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>

        {/* Navbar Links */}
        <div className="collapse navbar-collapse" id="userNavbar">
          <ul className="navbar-nav mx-auto">
            <li className="nav-item">
              <Link className="nav-link " to="/">
                Home
              </Link>
            </li>
            <li className="nav-item">
              <Link className="nav-link" to="/all-blogs">
                All Blogs
              </Link>
            </li>
            <li className="nav-item dropdown">
              <Link
                className="nav-link dropdown-toggle"
                to="#"
                id="categoryDropdown"
                role="button"
                data-bs-toggle="dropdown"
                aria-expanded="false"
              >
                Category
              </Link>
              <ul className="dropdown-menu" aria-labelledby="categoryDropdown">
                <li>
                  <Link className="dropdown-item" to="/category/technology">
                    Technology
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/category/programming">
                    Programming
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/category/design">
                    Design
                  </Link>
                </li>
                <li>
                  <Link className="dropdown-item" to="/category/business">
                    Business
                  </Link>
                </li>
              </ul>
            </li>
          </ul>
        </div>
         {
  !login.status ? (
    <Link className="nav-link" to="/login">
      <button type="button" className="btn btn-danger">
        Login
      </button>
    </Link>
  ) : (
    <button
      type="button"
      className="btn btn-dark"
      onClick={handleLogout}
    >
      Logout
    </button>
  )
}
      </div>
    </nav>
  );
};

export default Navbar;
