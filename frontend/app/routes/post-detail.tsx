"use client"

import { useParams, useNavigate, Link } from "react-router"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { useBlog } from "../../hooks/use-blog"
import { useAuth } from "../../hooks/use-auth"
import { Button } from "../components/ui/button"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { Textarea } from "../components/ui/textarea"
import { Avatar, AvatarFallback } from "../components/ui/avatar"
import { Calendar, User, ArrowLeft, MessageSquare, Edit3, Trash2 } from "lucide-react"
import { useState } from "react"
//import { useToast } from "@/hooks/use-toast"

export default function PostDetail() {
  const { id } = useParams()
  const navigate = useNavigate()
  const { allPosts, updatePost, deletePost } = useBlog()
  const { user, isAuthenticated } = useAuth()
  //const { toast } = useToast()
  const post = allPosts.find((p) => p.id === id)
  const [comment, setComment] = useState("")

  if (!post) {
    return (
      <div className="min-h-screen flex flex-col items-center justify-center p-4">
        <h1 className="text-2xl font-bold mb-4">Post not found</h1>
        <Button onClick={() => navigate("/")}>Return Home</Button>
      </div>
    )
  }

  const isAuthor = user?.name === post.author

  const handleAddComment = () => {
    if (!comment.trim()) return

    if (!isAuthenticated) {
      alert({
        title: "Authentication required",
        description: "Please log in to post a comment.",
        variant: "destructive",
      })
      return
    }

    const newComment = {
      id: Math.random().toString(36).substr(2, 9),
      author: user?.name || "Guest User",
      date: new Date().toISOString().split("T")[0],
      content: comment,
    }

    updatePost(post.id, {
      comments: [...post.comments, newComment],
    })
    setComment("")
    alert({
      title: "Comment posted!",
      description: "Your comment has been added.",
    })
  }

  const handleDelete = () => {
    if (confirm("Are you sure you want to delete this post? This action cannot be undone.")) {
      deletePost(post.id)
      alert({
        title: "Post deleted",
        description: "Your post has been removed.",
      })
      navigate("/")
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12 max-w-4xl">
        <Button asChild variant="ghost" className="mb-8 hover:bg-white/50">
          <Link to="/" className="flex items-center gap-2">
            <ArrowLeft className="w-4 h-4" />
            Back to Feed
          </Link>
        </Button>

        <article className="bg-white/60 backdrop-blur-md rounded-3xl p-8 md:p-12 shadow-xl border border-white/20">
          <header className="space-y-6 mb-12">
            <div className="flex items-center justify-between flex-wrap gap-4">
              {isAuthor && (
                <div className="flex gap-2">
                  <Button asChild variant="outline" size="sm" className="rounded-full bg-transparent">
                    <Link to={`/edit/${post.id}`} className="flex items-center gap-2">
                      <Edit3 className="w-3 h-3" />
                      Edit
                    </Link>
                  </Button>
                  <Button
                    onClick={handleDelete}
                    variant="outline"
                    size="sm"
                    className="rounded-full bg-transparent text-red-600 hover:text-red-700 hover:bg-red-50"
                  >
                    <Trash2 className="w-3 h-3 mr-2" />
                    Delete
                  </Button>
                </div>
              )}
            </div>

            <h1 className="text-4xl md:text-5xl font-black leading-tight tracking-tight">{post.title}</h1>

            <div className="flex items-center gap-6 text-muted-foreground text-sm font-medium">
              <div className="flex items-center gap-2">
                <User className="w-4 h-4" />
                <span>{post.author}</span>
              </div>
              <div className="flex items-center gap-2">
                <Calendar className="w-4 h-4" />
                <span>{post.date}</span>
              </div>
            </div>
          </header>

          <div className="prose prose-lg max-w-none prose-headings:font-black prose-p:text-muted-foreground prose-p:leading-relaxed">
            {post.content.split("\n").map((para, i) =>
              para.startsWith("#") ? (
                <h2 key={i} className="text-2xl font-bold mt-8 mb-4">
                  {para.replace(/#/g, "").trim()}
                </h2>
              ) : (
                <p key={i} className="mb-4">
                  {para}
                </p>
              ),
            )}
          </div>

          <Separator className="my-12 opacity-50" />

          <section id="comments" className="space-y-10">
            <div className="flex items-center gap-3">
              <MessageSquare className="w-6 h-6 text-primary" />
              <h2 className="text-2xl font-black">Comments ({post.comments.length})</h2>
            </div>

            {!isAuthenticated ? (
              <div className="p-6 rounded-2xl bg-primary/5 border border-primary/10 text-center">
                <p className="text-muted-foreground mb-4">You must be logged in to post a comment.</p>
                <Button asChild>
                  <Link to="/login">Log In</Link>
                </Button>
              </div>
            ) : (
              <div className="space-y-4">
                <Textarea
                  placeholder="Share your thoughts..."
                  value={comment}
                  onChange={(e) => setComment(e.target.value)}
                  className="bg-white/50 border-2 border-primary/10 focus-visible:ring-primary/20 rounded-2xl min-h-[120px]"
                />
                <div className="flex justify-end">
                  <Button
                    onClick={handleAddComment}
                    disabled={!comment.trim()}
                    className="rounded-full px-8 shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
                  >
                    Post Comment
                  </Button>
                </div>
              </div>
            )}

            <div className="space-y-6">
              {post.comments.length > 0 ? (
                post.comments
                  .map((c) => (
                    <div key={c.id} className="flex gap-4 p-6 rounded-2xl bg-white/40 border border-white/20">
                      <Avatar className="w-10 h-10 border-2 border-primary/10">
                        <AvatarFallback className="bg-primary/5 text-primary font-bold">
                          {c.author
                            .split(" ")
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div className="flex-grow space-y-1">
                        <div className="flex items-center justify-between">
                          <span className="font-bold">{c.author}</span>
                          <span className="text-xs text-muted-foreground">{c.date}</span>
                        </div>
                        <p className="text-muted-foreground leading-relaxed">{c.content}</p>
                      </div>
                    </div>
                  ))
                  .reverse()
              ) : (
                <p className="text-center py-8 text-muted-foreground italic">
                  No comments yet. Be the first to share your thoughts!
                </p>
              )}
            </div>
          </section>
        </article>
      </main>

      <Footer />
    </div>
  )
}
