"use client"

import { useNavigate } from "react-router"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { ProtectedRoute } from "../components/protected-route"
import { useBlog } from "../../hooks/use-blog"
import { useAuth } from "../../hooks/use-auth"
import { BlogForm } from "../components/blog-form"
// import { useToast } from "../../hooks/use-toast"

function CreatePostContent() {
  const navigate = useNavigate()
  const { addPost } = useBlog()
  const { user } = useAuth()
//   const { toast } = useToast()

  const handleSubmit = (data: any) => {
    addPost({ ...data, author: user?.name || "Anonymous" })
    alert({
      title: "Success!",
      description: "Your blog post has been created.",
    })
    navigate("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <BlogForm
          onSubmit={handleSubmit}
          title="Create New Post"
          description="Share your thoughts with the world. Fill out the form below."
        />
      </main>
      <Footer />
    </div>
  )
}

export default function CreatePost() {
  return (
    <ProtectedRoute>
      <CreatePostContent />
    </ProtectedRoute>
  )
}
