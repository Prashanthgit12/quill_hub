import React, { useContext, useEffect } from "react";
import { Outlet, useNavigate, Link } from "react-router-dom";
import { loginData } from "../App";

const AuthorDashboard = () => {
  const { login } = useContext(loginData);
  const navigate = useNavigate();

  useEffect(() => {
    if (!login?.status) {
      navigate("/login");
    } else if (login?.user?.role === "admin") {
      navigate("/admin/dashboard");
    }
  }, [login, navigate]);

  if (!login?.status || !login?.user) {
    return <h3 className="text-center mt-5">Loading...</h3>;
  }

  return (
    <section className="dashboard">
      <aside className="authorSidebar">
        <ul className="list-unstyled mb-0">
          <li>
            <Link to="">
              <button className="btn btn-warning myBtn">
                Welcome {login.user.name}
              </button>
            </Link>
          </li>

          <li>
            <Link to="myblogs">
              <button className="btn btn-warning myBtn">
                My Blogs
              </button>
            </Link>
          </li>

          <li>
            <Link to="addblog">
              <button className="btn btn-warning myBtn">
                Add Blog
              </button>
            </Link>
          </li>

          <li>
            <Link to="authorblogs">
              <button className="btn btn-warning myBtn">
                Author Blogs
              </button>
            </Link>
          </li>

          <li>
            <Link to="comments">
              <button className="btn btn-warning myBtn">
                Comments
              </button>
            </Link>
          </li>
        </ul>
      </aside>

      <div className="content">
        <Outlet />
      </div>
    </section>
  );
};

export default AuthorDashboard;