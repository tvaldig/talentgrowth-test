"use client"

import { useParams, useNavigate } from "react-router"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { ProtectedRoute } from "../components/protected-route"
import { useBlog } from "../../hooks/use-blog"
import { useAuth } from "../../hooks/use-auth"
import { BlogForm } from "../components/blog-form"
import { useEffect } from "react"

function EditPostContent() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { allPosts, updatePost } = useBlog()
  const { user } = useAuth()
  //const { toast } = useToast()

  const post = allPosts.find((p) => p.id === id)

  useEffect(() => {
    if (post && user && post.author !== user.name) {
      alert({
        title: "Access denied",
        description: "You can only edit your own posts.",
        variant: "destructive",
      })
      navigate(`/post/${post.id}`)
    }
  }, [post, user, navigate])

  if (!post) {
    return null
  }

  if (user && post.author !== user.name) {
    return null
  }

  const handleSubmit = (data: any) => {
    updatePost(post.id, data)
    alert({
      title: "Updated!",
      description: "Your blog post has been successfully updated.",
    })
    navigate(`/post/${post.id}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow">
        <BlogForm
          initialData={post}
          onSubmit={handleSubmit}
          title="Edit Post"
          description="Update your content and keep your readers engaged."
        />
      </main>
      <Footer />
    </div>
  )
}

export default function EditPost() {
  return (
    <ProtectedRoute>
      <EditPostContent />
    </ProtectedRoute>
  )
}
