"use client"

import type React from "react"

import { useState } from "react"
import { useRouter } from "next/navigation"
import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "./ui/select"
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from "./ui/card"
import { ArrowLeft, Save } from "lucide-react"
import Link from "next/link"

interface BlogFormProps {
  initialData?: {
    title: string
    author: string
    category: string
    excerpt: string
    content: string
  }
  onSubmit: (data: any) => void
  title: string
  description: string
}

export function BlogForm({ initialData, onSubmit, title, description }: BlogFormProps) {
  const router = useRouter()
  const [formData, setFormData] = useState({
    title: initialData?.title || "",
    author: initialData?.author || "",
    category: initialData?.category || "Tutorial",
    excerpt: initialData?.excerpt || "",
    content: initialData?.content || "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Button asChild variant="ghost" className="mb-8 hover:bg-white/50">
        <Link href="/" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </Link>
      </Button>

      <Card className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/20">
        <CardHeader className="space-y-1 p-8">
          <CardTitle className="text-3xl font-black">{title}</CardTitle>
          <CardDescription className="text-muted-foreground">{description}</CardDescription>
        </CardHeader>
        <CardContent className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div className="space-y-2">
                <Label htmlFor="title" className="font-bold">
                  Title
                </Label>
                <Input
                  id="title"
                  placeholder="Enter a catchy title"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                  required
                  className="bg-white/50 border-2 border-primary/10 focus-visible:ring-primary/20 rounded-xl"
                />
              </div>
              <div className="space-y-2">
                <Label htmlFor="author" className="font-bold">
                  Author
                </Label>
                <Input
                  id="author"
                  placeholder="Your name"
                  value={formData.author}
                  onChange={(e) => setFormData({ ...formData, author: e.target.value })}
                  required
                  className="bg-white/50 border-2 border-primary/10 focus-visible:ring-primary/20 rounded-xl"
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label htmlFor="category" className="font-bold">
                Category
              </Label>
              <Select
                value={formData.category}
                onValueChange={(value) => setFormData({ ...formData, category: value })}
              >
                <SelectTrigger className="bg-white/50 border-2 border-primary/10 focus-visible:ring-primary/20 rounded-xl">
                  <SelectValue placeholder="Select a category" />
                </SelectTrigger>
                <SelectContent>
                  <SelectItem value="Tutorial">Tutorial</SelectItem>
                  <SelectItem value="Opinion">Opinion</SelectItem>
                  <SelectItem value="Guide">Guide</SelectItem>
                  <SelectItem value="News">News</SelectItem>
                  <SelectItem value="Review">Review</SelectItem>
                </SelectContent>
              </Select>
            </div>

            <div className="space-y-2">
              <Label htmlFor="excerpt" className="font-bold">
                Excerpt
              </Label>
              <Textarea
                id="excerpt"
                placeholder="A short summary of your post..."
                value={formData.excerpt}
                onChange={(e) => setFormData({ ...formData, excerpt: e.target.value })}
                required
                className="bg-white/50 border-2 border-primary/10 focus-visible:ring-primary/20 rounded-xl min-h-[80px]"
              />
            </div>

            <div className="space-y-2">
              <Label htmlFor="content" className="font-bold">
                Content (Markdown supported)
              </Label>
              <Textarea
                id="content"
                placeholder="Write your story here..."
                value={formData.content}
                onChange={(e) => setFormData({ ...formData, content: e.target.value })}
                required
                className="bg-white/50 border-2 border-primary/10 focus-visible:ring-primary/20 rounded-xl min-h-[300px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full h-12 text-lg font-bold shadow-lg hover:shadow-primary/20 transition-all active:scale-95"
            >
              <Save className="w-5 h-5 mr-2" />
              Save Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
