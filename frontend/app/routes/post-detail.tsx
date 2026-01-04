import { useEffect, useState } from "react"
import { useParams, useNavigate, Link } from "react-router-dom"

import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { Button } from "../components/ui/button"
import { Separator } from "../components/ui/separator"
import { Textarea } from "../components/ui/textarea"
import { Avatar, AvatarFallback } from "../components/ui/avatar"

import {
  Calendar,
  User,
  ArrowLeft,
  MessageSquare,
  Trash2,
} from "lucide-react"

import api from "../../lib/api"
import { useBlog } from "../../hooks/use-blog"
import { useAuth } from "../../hooks/use-auth"
import type { Comment, Post as ApiPost } from "../../lib/types"

export default function PostDetail() {
  const { id } = useParams()
  const postId = Number(id)
  const navigate = useNavigate()

  const { deletePost, addComment, getComments } = useBlog()
  const { user, isAuthenticated } = useAuth()

  const [post, setPost] = useState<ApiPost | null>(null)
  const [comments, setComments] = useState<Comment[]>([])
  const [comment, setComment] = useState("")
  const [loading, setLoading] = useState(true)

  /**
   * Fetch post + comments
   */
  useEffect(() => {
    if (!postId) return

    const load = async () => {
      try {
        const [postRes, commentRes] = await Promise.all([
          api.get<ApiPost>(`/api/v1/posts/${postId}`),
          getComments(postId),
        ])

        setPost(postRes.data)
        setComments(commentRes)
      } finally {
        setLoading(false)
      }
    }

    load()
  }, [postId])

  if (loading) {
    return <div className="p-12 text-center">Loading...</div>
  }

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    )
  }

  const isAuthor = user?.id === post.author.id

  /**
   * Add comment
   */
  const handleAddComment = async () => {
    if (!comment.trim()) return

    if (!isAuthenticated) return navigate("/login")

    const newComment = await addComment(postId, comment)
    setComments((prev) => [...prev, newComment])
    setComment("")
  }

  /**
   * Delete post
   */
  const handleDelete = async () => {
    if (!confirm("Delete this post permanently?")) return
    await deletePost(postId)
    navigate("/")
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <Button asChild variant="ghost" className="mb-8">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Feed
          </Link>
        </Button>

        <article className="bg-white/60 rounded-3xl p-8 shadow-xl">
          <header className="space-y-6 mb-12">
            {isAuthor && (
              <Button
                onClick={handleDelete}
                variant="outline"
                size="sm"
                className="text-red-600"
              >
                <Trash2 className="w-3 h-3 mr-2" />
                Delete
              </Button>
            )}

            <h1 className="text-4xl font-black">{post.title}</h1>

            <div className="flex items-center gap-6 text-sm text-muted-foreground">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>
                  {new Date(post.created_at).toLocaleDateString()}
                </span>
              </div>
            </div>
          </header>

          <div className="prose max-w-none">
            {post.content.split("\n").map((p, i) => (
              <p className="text-muted-foreground whitespace-pre-wrap break-words overflow-hidden" key={i}>{p}</p>
            ))}
          </div>

          <Separator className="my-12" />

          <section className="space-y-8">
            <div className="flex items-center gap-2">
              <MessageSquare />
              <h2 className="text-2xl font-bold">
                Comments ({comments.length})
              </h2>
            </div>

            {isAuthenticated && (
              <div className="space-y-4">
                <Textarea
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  placeholder="Write a comment..."
                />
                <Button onClick={handleAddComment}>Post Comment</Button>
              </div>
            )}

            <div className="space-y-6">
              {comments.map((c) => (
                <div key={c.id} className="flex gap-4">
                  <Avatar>
                    <AvatarFallback>
                      {c.author.name?.[0].toUpperCase()}
                    </AvatarFallback>
                  </Avatar>
                  <div>
                    <div className="text-sm font-bold">
                      {c.author.name}
                    </div>
                    <p className="text-muted-foreground">
                      {c.content}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
