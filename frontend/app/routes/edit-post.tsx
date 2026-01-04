import { useParams, useNavigate } from "react-router-dom"
import { useEffect } from "react"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { ProtectedRoute } from "../components/protected-route"
import { useBlog } from "../../hooks/use-blog"
import { useAuth } from "../../hooks/use-auth"
import { BlogForm } from "../components/blog-form"

function EditPostContent() {
  const { id } = useParams()
  const navigate = useNavigate()

  const { posts, updatePost } = useBlog()
  const { user } = useAuth()

  const postId = Number(id)

  const post = posts.find((p) => p.id === postId)

  useEffect(() => {
    if (!post) return

    if (user && post.authorId !== user.id) {
      navigate(`/post/${post.id}`, { replace: true })
    }
  }, [post, user, navigate])

  if (!post || !user) return null

  if (post.authorId !== user.id) return null

  const handleSubmit = (data: { title: string; content: string }) => {
    updatePost(post.id, {
      title: data.title,
      content: data.content,
    })

    navigate(`/post/${post.id}`)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow">
        <BlogForm
          initialData={{
            title: post.title,
            content: post.content,
          }}
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
