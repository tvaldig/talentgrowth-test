import { Card, CardContent, CardFooter, CardHeader } from "./ui/card"
import { Badge } from "./ui/badge"
import { Calendar, User } from "lucide-react"
import { Link } from "react-router-dom"
import type { UIBlogPost } from "lib/types"

interface BlogCardProps {
  post: UIBlogPost
}

export function BlogCard({ post }: BlogCardProps) {
  return (
    <Card className="overflow-hidden group hover:shadow-xl transition-all duration-300 border-none bg-white/50 backdrop-blur-sm">
      <div className={`h-2 w-full ${post.color}`} />
      <CardHeader className="space-y-1">
        <h3 className="text-xl font-bold leading-tight group-hover:text-primary transition-colors line-clamp-2">
          {post.title}
        </h3>
      </CardHeader>
      <CardContent>
        <p className="text-muted-foreground line-clamp-3 text-sm leading-relaxed text-ellipsis">{post.content}</p>
      </CardContent>
      <CardFooter className="flex items-center justify-between pt-4 text-xs text-muted-foreground border-t bg-muted/10">
        <div className="flex items-center gap-1">
          <User className="w-3 h-3" />
          <span>{post.authorName}</span>
        </div>
        <div className="flex items-center gap-1">
          <Calendar className="w-3 h-3" />
          <span>{post.date}</span>
        </div>
      </CardFooter>
      <Link to={`/post/${post.id}`} className="absolute inset-0 z-10">
        <span className="sr-only">Read more about {post.title}</span>
      </Link>
    </Card>
  )
}
