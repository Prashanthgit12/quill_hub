import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { loginData } from "../App";

const AuthorDashboard = () => {
  const { login } = useContext(loginData);
  const navigate = useNavigate();

  useEffect(() => {
    // ✅ If not logged in
    if (!login?.status) {
      navigate("/login");
    }
    // ✅ If admin tries to access author dashboard
    else if (login?.user?.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [login, navigate]);

  // ✅ Prevent crash + blank UI
  if (!login?.status || !login?.user) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <section className="dashboard">

      {/* SIDEBAR */}
      <aside>
        <ul className="list-unstyled">

          <li>
            <Link to="">
              <button className="btn btn-warning myBtn">
                Welcome {login.user.name}
              </button>
            </Link>
          </li>

          <li>
            <Link to="myblogs">
              <button className="btn btn-warning myBtn ">
                My Blogs
              </button>
            </Link>
          </li>

          <li>
            <Link to="addblog">
              <button className="btn btn-warning myBtn ">
                Add Blog
              </button>
            </Link>
          </li>

          <li>
            <Link to="authorblogs">
              <button className="btn btn-warning myBtn ">
                Author Blogs
              </button>
            </Link>
          </li>

          <li>
            <Link to="comments">
              <button className="btn btn-warning myBtn ">
                Comments
              </button>
            </Link>
          </li>

        </ul>
      </aside>

      {/* MAIN CONTENT */}
      <div className="content">
        <Outlet />
      </div>

    </section>
  );
};

export default AuthorDashboard;