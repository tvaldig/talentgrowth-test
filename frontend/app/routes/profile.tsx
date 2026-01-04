import { useState } from "react"
import { Link } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { ProtectedRoute } from "../components/protected-route"
import { useAuth } from "../../hooks/use-auth"
import { useBlog } from "../../hooks/use-blog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
import { Edit2, Save, X, FileText } from "lucide-react"

function ProfileContent() {
  const { user, updateProfile } = useAuth()
  const { posts } = useBlog()

  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(user?.name || "")

  if (!user) return null

  const userPosts = posts.filter(
    (post) => post.authorId === user.id
  )

  const handleSave = async () => {
    if (!username.trim()) return
    try {
      await updateProfile({ name: username })
      setIsEditing(false)
    } catch (err) {
      console.error("Failed to update profile", err)
    }
  }

  const handleCancel = () => {
    setUsername(user.name)
    setIsEditing(false)
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-2xl border-primary/10 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />

          <CardHeader className="relative -mt-16 pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src="/placeholder.svg" />
                <AvatarFallback className="text-4xl">
                  {user.name[0].toUpperCase()}
                </AvatarFallback>
              </Avatar>

              <div className="flex-grow">
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="username">Username</Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                    />
                  </div>
                ) : (
                  <CardTitle className="text-3xl font-bold">
                    {user.name}
                  </CardTitle>
                )}
                <CardDescription>{user.email}</CardDescription>
              </div>

              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button size="sm" onClick={handleSave}>
                      <Save className="w-4 h-4 mr-2" />
                      Save
                    </Button>
                    <Button size="sm" variant="outline" onClick={handleCancel}>
                      <X className="w-4 h-4 mr-2" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button size="sm" onClick={() => setIsEditing(true)}>
                    <Edit2 className="w-4 h-4 mr-2" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>

          <CardContent className="space-y-6 pt-6">
            <Separator />

            {/* POSTS */}
            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  My Posts
                </h3>
                <Badge variant="secondary">
                  {userPosts.length} posts
                </Badge>
              </div>

              {userPosts.length > 0 ? (
                <div className="space-y-3">
                  {userPosts.map((post) => (
                    <div
                      key={post.id}
                      className="relative p-4 rounded-lg border hover:border-primary/50 transition group"
                    >
                      {/* Edit icon */}
                      <Link
                        to={`/edit/${post.id}`}
                        onClick={(e) => e.stopPropagation()}
                        className="absolute top-3 right-3"
                        title="Edit post"
                        >
                        <Edit2 className="w-4 h-4 text-gray-700 hover:text-primary" />
                      </Link>

                      {/* Card content */}
                      <Link to={`/post/${post.id}`} className="block space-y-1">
                        <h4 className="font-semibold text-lg">
                          {post.title}
                        </h4>

                        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed text-ellipsis">
                          {post.content}
                        </p>

                        <span className="text-xs text-muted-foreground">
                          {post.date}
                        </span>
                      </Link>
                    </div>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No posts yet.</p>
                  <Button asChild className="mt-4">
                    <Link to="/create">Create Post</Link>
                  </Button>
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      </main>

      <Footer />
    </div>
  )
}

export default function ProfilePage() {
  return (
    <ProtectedRoute>
      <ProfileContent />
    </ProtectedRoute>
  )
}
