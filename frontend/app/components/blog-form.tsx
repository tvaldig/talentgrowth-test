import { useState } from "react"
import type React from "react"
import { Link } from "react-router-dom"
import { ArrowLeft, Save } from "lucide-react"

import { Button } from "./ui/button"
import { Input } from "./ui/input"
import { Textarea } from "./ui/textarea"
import { Label } from "./ui/label"
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "./ui/card"

interface BlogFormProps {
  initialData?: {
    title: string
    content: string
  }
  onSubmit: (data: { title: string; content: string }) => void
  title: string
  description: string
}

export function BlogForm({
  initialData,
  onSubmit,
  title,
  description,
}: BlogFormProps) {
  const [formData, setFormData] = useState({
    title: initialData?.title ?? "",
    content: initialData?.content ?? "",
  })

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault()
    onSubmit(formData)
  }

  return (
    <div className="max-w-2xl mx-auto py-12 px-4">
      <Button asChild variant="ghost" className="mb-8">
        <Link to="/" className="flex items-center gap-2">
          <ArrowLeft className="w-4 h-4" />
          Cancel
        </Link>
      </Button>

      <Card className="bg-white/60 backdrop-blur-md rounded-3xl shadow-xl border border-white/20">
        <CardHeader className="space-y-1 p-8">
          <CardTitle className="text-3xl font-black">
            {title}
          </CardTitle>
          <CardDescription>
            {description}
          </CardDescription>
        </CardHeader>

        <CardContent className="p-8 pt-0">
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* TITLE */}
            <div className="space-y-2">
              <Label htmlFor="title" className="font-bold">
                Title
              </Label>
              <Input
                id="title"
                placeholder="Enter post title"
                value={formData.title}
                onChange={(e) =>
                  setFormData({ ...formData, title: e.target.value })
                }
                required
              />
            </div>

            {/* CONTENT */}
            <div className="space-y-2">
              <Label htmlFor="content" className="font-bold">
                Content
              </Label>
              <Textarea
                id="content"
                placeholder="Write your post here..."
                value={formData.content}
                onChange={(e) =>
                  setFormData({ ...formData, content: e.target.value })
                }
                required
                className="min-h-[300px]"
              />
            </div>

            <Button
              type="submit"
              className="w-full rounded-full h-12 text-lg font-bold"
            >
              <Save className="w-5 h-5 mr-2" />
              Publish Post
            </Button>
          </form>
        </CardContent>
      </Card>
    </div>
  )
}
