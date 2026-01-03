"use client"

import { useState } from "react"
import { Link } from "react-router"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { ProtectedRoute } from "../components/protected-route"
import { useAuth } from "../../hooks/use-auth"
import { useBlog } from "../../hooks/use-blog"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Textarea } from "../components/ui/textarea"
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from "../components/ui/card"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"
import { Badge } from "../components/ui/badge"
import { Separator } from "../components/ui/separator"
//import { useToast } from "../hooks/use-toast"
import { Calendar, Edit2, Save, X, FileText } from "lucide-react"

function ProfileContent() {
  const { user } = useAuth()
  const { allPosts } = useBlog()
  //const { toast } = useToast()
  const [isEditing, setIsEditing] = useState(false)
  const [username, setUsername] = useState(user?.name || "")

  const userPosts = allPosts.filter((post) => post.author === user?.name)

  const handleSave = () => {
    alert({
      title: "Profile updated!",
      description: "Your changes have been saved.",
    })
    setIsEditing(false)
  }

  const handleCancel = () => {
    setUsername(user?.name || "")
    setIsEditing(false)
  }

  if (!user) return null

  return (
    <div className="min-h-screen flex flex-col">
      <Navbar />
      <main className="flex-grow container mx-auto px-4 py-8 max-w-4xl">
        <Card className="shadow-2xl border-primary/10 overflow-hidden">
          <div className="h-32 bg-gradient-to-r from-blue-500 via-purple-500 to-pink-500" />
          <CardHeader className="relative -mt-16 pb-4">
            <div className="flex flex-col sm:flex-row items-start sm:items-end gap-4">
              <Avatar className="w-32 h-32 border-4 border-white shadow-xl">
                <AvatarImage src={"/placeholder.svg"} alt={user.name} />
                <AvatarFallback className="text-4xl">{user.name[0].toUpperCase()}</AvatarFallback>
              </Avatar>
              <div className="flex-grow">
                {isEditing ? (
                  <div className="space-y-2">
                    <Label htmlFor="username" className="text-white text-sm">
                      Username
                    </Label>
                    <Input
                      id="username"
                      value={username}
                      onChange={(e) => setUsername(e.target.value)}
                      className="bg-white/90 backdrop-blur"
                    />
                  </div>
                ) : (
                  <CardTitle className="text-3xl font-bold text-white drop-shadow-lg">{user.name}</CardTitle>
                )}
                <CardDescription className="text-white/90 text-base mt-1">{user.email}</CardDescription>
              </div>
              <div className="flex gap-2">
                {isEditing ? (
                  <>
                    <Button onClick={handleSave} size="sm" className="gap-2">
                      <Save className="w-4 h-4" />
                      Save
                    </Button>
                    <Button onClick={handleCancel} variant="outline" size="sm" className="gap-2 bg-transparent">
                      <X className="w-4 h-4" />
                      Cancel
                    </Button>
                  </>
                ) : (
                  <Button onClick={() => setIsEditing(true)} size="sm" className="gap-2">
                    <Edit2 className="w-4 h-4" />
                    Edit Profile
                  </Button>
                )}
              </div>
            </div>
          </CardHeader>
          <CardContent className="space-y-6 pt-6">

            <div className="flex items-center gap-2 text-muted-foreground">
              <Calendar className="w-4 h-4" />
              <span className="text-sm">Member since 2024</span>
            </div>

            <Separator />

            <div>
              <div className="flex items-center justify-between mb-4">
                <h3 className="text-xl font-bold flex items-center gap-2">
                  <FileText className="w-5 h-5" />
                  My Posts
                </h3>
                <Badge variant="secondary" className="text-sm">
                  {userPosts.length} {userPosts.length === 1 ? "post" : "posts"}
                </Badge>
              </div>

              {userPosts.length > 0 ? (
                <div className="space-y-3">
                  {userPosts.map((post) => (
                    <Link
                      key={post.id}
                      to={`/post/${post.id}`}
                      className="block p-4 rounded-lg border hover:border-primary/50 hover:shadow-md transition-all bg-card"
                    >
                      <div className="flex items-start justify-between gap-4">
                        <div className="flex-grow">
                          <h4 className="font-semibold text-lg mb-1 hover:text-primary transition-colors">
                            {post.title}
                          </h4>
                          <p className="text-sm text-muted-foreground line-clamp-2">{post.excerpt}</p>
                          <div className="flex items-center gap-2 mt-2">
                            <Badge variant="outline" className="text-xs">
                              {post.category}
                            </Badge>
                            <span className="text-xs text-muted-foreground">{post.date}</span>
                          </div>
                        </div>
                      </div>
                    </Link>
                  ))}
                </div>
              ) : (
                <div className="text-center py-12 text-muted-foreground">
                  <FileText className="w-12 h-12 mx-auto mb-3 opacity-50" />
                  <p>No posts yet. Create your first post to get started!</p>
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
