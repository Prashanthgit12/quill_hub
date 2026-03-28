import axios from 'axios'
import React, { useContext, useState } from 'react'
import { loginData } from '../App'
import { useNavigate } from 'react-router-dom'

const AddBlog = () => {

  const { login } = useContext(loginData)
  const navigate = useNavigate()

  const [blog, setBlog] = useState({
    title: "",
    category: "",
    description: "",
    image: "",
    content: "",
    createdAt: ""
  })

  const handleChange = (e) => {
    setBlog({ ...blog, [e.target.name]: e.target.value })
  }

  const addBlog = (e) => {
    e.preventDefault()

    const newBlog = {
      ...blog,
      authorName: login.user.name,   // ✅ AUTO SET
      userId: login.user.id         // ✅ BEST PRACTICE
    }

    axios.post(`https://quillhub-backend-latest-2.onrender.com/blogs`, newBlog) // ✅ FIXED
      .then(() => {
        alert('Blog added successfully ✅')

        setBlog({
          title: "",
          category: "",
          description: "",
          image: "",
          content: "",
          createdAt: ""
        })

        navigate("/author/dashboard/myblogs") // ✅ redirect
      })
      .catch((err) => console.log(err))
  }

  return (
    <section className='container p-5'>

      <h2 className='text-center text-primary'>Add Blog</h2>

      <div className="col-lg-6 shadow mx-auto p-4">

        <form onSubmit={addBlog}>

          <input
            type="text"
            name="title"
            placeholder="Title"
            className="form-control mb-3"
            value={blog.title}
            onChange={handleChange}
          />

          <select
            name="category"
            className="form-select mb-3"
            value={blog.category}
            onChange={handleChange}
          >
            <option value="">Select Category</option>
            <option value="programming">Programming</option>
            <option value="design">Design</option>
            <option value="technology">Technology</option>
            <option value="business">Business</option>
          </select>

          <input
            type="text"
            name="description"
            placeholder="Description"
            className="form-control mb-3"
            value={blog.description}
            onChange={handleChange}
          />

          <input
            type="text"
            name="image"
            placeholder="Image URL (ex: /images/ai.jpg)"
            className="form-control mb-3"
            value={blog.image}
            onChange={handleChange}
          />

          <textarea
            name="content"
            placeholder="Content"
            className="form-control mb-3"
            rows="5"
            value={blog.content}
            onChange={handleChange}
          />

          <input
            type="date"
            name="createdAt"
            className="form-control mb-3"
            value={blog.createdAt}
            onChange={handleChange}
          />

          <button className='btn btn-primary w-100'>
            Add Blog
          </button>

        </form>

      </div>
    </section>
  )
}

export default AddBlog