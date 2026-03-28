import React from 'react'
import { Route, Routes } from 'react-router-dom'

// Pages
import Home from '../pages/Home'
import AllBlogs from '../pages/AllBlogs'
import BlogDetails from '../pages/BlogDetails'
import CategoryPage from '../pages/CategoryPage'
import NoPageFound from '../pages/NoPageFound'

// Auth
import Login from '../Author/Login'
import Register from '../Author/Register'

// Author
import AuthorDashboard from '../Author/Dashboard'
import AddBlog from '../Author/AddBlog'
import MyBlogs from '../Author/MyBlogs'
import AuthorBlogs from '../Author/AuthorBlogs'
import AuthorBlogDetails from '../Author/AuthorBlogDetails'
import AuthorComments from '../Author/AuthorComments'
import Welcome from '../Author/Welcome'

// Admin
import AdminDashboard from '../Admin/Dashboard'
import AdminWelcome from '../Admin/AdminWelcome'
import Blogs from '../Admin/blogs'
import CreateBlog from '../Admin/CreateBlog'
import FilterBlog from '../Admin/FilterBlog'
import ManageAuthors from '../Admin/ManageAuthors'
import AuthorBlogss from '../Admin/AuthorBlogss'
import AllComments from '../Admin/AllComments'

// 🔥 Protected Route
import ProtectedRoute from '../components/ProtectedRoute'

const Routing = () => {
  return (
    <Routes>

      {/* PUBLIC ROUTES */}
      <Route path="/" element={<Home />} />
      <Route path="/blogs/:id" element={<BlogDetails />} />
      <Route path="/category/:name" element={<CategoryPage />} />
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />

      {/* 🔒 PROTECTED - ALL BLOGS */}
      <Route
        path="/all-blogs"
        element={
          <ProtectedRoute>
            <AllBlogs />
          </ProtectedRoute>
        }
      />

      {/* 🔒 AUTHOR ROUTES */}
      <Route
        path="/author/dashboard"
        element={
          <ProtectedRoute role="author">
            <AuthorDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<Welcome />} />
        <Route path="myblogs" element={<MyBlogs />} />
        <Route path="addblog" element={<AddBlog />} />
        <Route path="authorblogs" element={<AuthorBlogs />} />
        <Route path="blog/:id" element={<AuthorBlogDetails />} />
        <Route path="comments" element={<AuthorComments />} />
      </Route>

      {/* 🔒 ADMIN ROUTES */}
      <Route
        path="/admin/dashboard"
        element={
          <ProtectedRoute role="admin">
            <AdminDashboard />
          </ProtectedRoute>
        }
      >
        <Route index element={<AdminWelcome />} />
        <Route path="blogs" element={<Blogs />} />
        <Route path="createblog" element={<CreateBlog />} />
        <Route path="filter" element={<FilterBlog />} />
        <Route path="authors" element={<ManageAuthors />} />
        <Route path="authorblogs/:authorName" element={<AuthorBlogss />} />
        <Route path="reviews" element={<AllComments />} />
      </Route>

      {/* 404 */}
      <Route path="*" element={<NoPageFound />} />

    </Routes>
  )
}

export default Routing