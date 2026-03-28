import React from "react";
import { Link } from "react-router-dom";
import coding from '../assets/coding.jpg'

const Home = () => {
  return (
    <div>

      {/* ================= 1. HERO SECTION ================= */}
      <section className="bg-gradient text-center py-5" style={{ background: "linear-gradient(135deg, #6a11cb, #2575fc)" }}>
        <div className="container">
          <h1 className="fw-bold display-4 text-primary"><i className="bi bi-lightning-charge-fill me-2"></i>Welcome to QuillHub</h1>
          <p className="lead mt-3">
            Explore modern web development with practical blogs on Technology, Programming, Design, and Business.
          </p>
          <div className="mt-4">
            <Link to="/all-blogs" className="btn btn-danger btn-lg me-3 shadow-sm">
              <i className="bi bi-journal-text me-2"></i> Explore Blogs
            </Link>
            <Link to="/login" className="btn btn-outline-primary btn-lg shadow-sm">
              <i className="bi bi-person-plus me-2"></i> Get Started
            </Link>
          </div>
        </div>
      </section>

      {/* ================= 2. ABOUT SECTION ================= */}
      <section className="py-5">
        <div className="container">
          <div className="row align-items-center">
            <div className="col-md-6">
              <img src={coding} alt="coding" className="img-fluid rounded shadow-lg hover-scale" />
            </div>
            <div className="col-md-6 mt-4 mt-md-0">
              <h2 className="fw-bold"><i className="bi bi-info-circle-fill me-2"></i>About QuillHub</h2>
              <p className="mt-3">
                QuillHub  helps developers grow step by step with structured tutorials and real-world coding examples.
              </p>
              <ul className="list-unstyled mt-3">
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Beginner to Advanced Content</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Real-World Projects</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Simple Explanations</li>
                <li className="mb-2"><i className="bi bi-check-circle-fill text-primary me-2"></i>Updated Tech Trends</li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* ================= 3. CATEGORIES SECTION ================= */}
      <section className="bg-light py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5"><i className="bi bi-folder-fill me-2"></i>Explore Categories</h2>
          <div className="row g-4">
            {[
              { icon: "bi-cpu-fill", title: "Technology", text: "AI, IoT, Cloud, and emerging tech.", link: "/category/technology", btnClass:"btn-primary" },
              { icon: "bi-code-slash", title: "Programming", text: "JavaScript, Python, Java, C++ tips.", link: "/category/programming", btnClass:"btn-success" },
              { icon: "bi-palette-fill", title: "Design", text: "UI/UX, Graphic Design, Figma tips.", link: "/category/design", btnClass:"btn-warning" },
              { icon: "bi-briefcase-fill", title: "Business", text: "Entrepreneurship, Marketing, Finance.", link: "/category/business", btnClass:"btn-danger" },
            ].map((cat, idx) => (
              <div key={idx} className="col-md-3">
                <div className="card shadow-lg h-100 border-0 hover-scale">
                  <div className="card-body">
                    <h5 className="card-title fw-bold">
                      <i className={`bi ${cat.icon} text-primary me-2`}></i> {cat.title}
                    </h5>
                    <p className="card-text">{cat.text}</p>
                    <Link to={cat.link} className={`btn ${cat.btnClass} btn-sm shadow-sm`}>
                      <i className="bi bi-arrow-right-circle me-2"></i> Explore
                    </Link>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 4. FEATURES SECTION ================= */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-4"><i className="bi bi-star-fill me-2"></i>Why Choose BlogApp?</h2>
          <div className="row g-3">
            {[
              { icon:"bi-book-half", text:"Beginner to Advanced " },
              { icon:"bi-gear-fill", text:"Real-World Projects" },
              { icon:"bi-lightbulb-fill", text:"Simple Explanations" },
              { icon:"bi-clock-history", text:"Updated Tech Trends" },
            ].map((feature, idx) => (
              <div key={idx} className="col-md-3">
                <div className="p-4 bg-primary text-light rounded shadow-lg hover-scale">
                  <i className={`bi ${feature.icon} me-2 fs-4`}></i> {feature.text}
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 5. LATEST BLOGS SECTION ================= */}
      <section className="bg-light py-5 text-center">
        <div className="container">
          <h2 className="fw-bold mb-4"><i className="bi bi-newspaper me-2"></i>Latest Blogs</h2>
          <p className="mb-4">Stay updated with trending articles on tech, programming, design, and business.</p>
          <Link to="/all-blogs" className="btn btn-primary btn-lg shadow-sm">
            <i className="bi bi-arrow-right-circle me-2"></i> Browse All Blogs
          </Link>
        </div>
      </section>

      {/* ================= 6. TESTIMONIALS / REVIEWS SECTION ================= */}
      <section className="py-5">
        <div className="container text-center">
          <h2 className="fw-bold mb-5"><i className="bi bi-chat-quote-fill me-2"></i>What Our Users Say</h2>
          <div className="row g-4">
            {[
              { name:"Alice", text:"Amazing tutorials! I learned React in just 2 weeks.", icon:"bi-person-circle" },
              { name:"Bob", text:"The blog content is very practical and easy to follow.", icon:"bi-person-circle" },
              { name:"Carol", text:"I love the mix of tech, design, and business content.", icon:"bi-person-circle" },
            ].map((review, idx) => (
              <div key={idx} className="col-md-4">
                <div className="p-4 shadow-lg rounded hover-scale">
                  <i className={`bi ${review.icon} fs-1 text-primary mb-3`}></i>
                  <p>"{review.text}"</p>
                  <h6 className="fw-bold mt-2">{review.name}</h6>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ================= 7. CALL TO ACTION SECTION ================= */}
      <section className="bg-gradient  text-center py-5" style={{ background: "linear-gradient(135deg, #2575fc, #6a11cb)" }}>
        <div className="container">
          <h2 className="fw-bold"><i className="bi bi-rocket-fill me-2 text-warning"></i>Ready to Start Learning?</h2>
          <p className="mt-3">Explore categories, read blogs, and begin your journey today.</p>
          <Link to="/all-blogs" className="btn btn-outline-primary btn-lg shadow-sm mt-3">
            <i className="bi bi-arrow-right-circle me-2"></i> Get Started Now
          </Link>
        </div>
      </section>


    </div>
  );
};
export default Home;
