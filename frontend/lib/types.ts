export interface Comment {
  id: number
  content: string
  author: {
    id: number
    name: string
  }
  post_id: number
  created_at: string
}

export interface Post {
  id: number
  title: string
  content: string
  author: {
    id: number
    name: string
  }
  created_at: string
}

export interface UIBlogPost {
  id: number
  title: string
  content: string
  authorId: number
  authorName: string
  date: string
  color: string
}

export interface PaginatedPosts {
  total: number
  page: number
  limit: number
  items: Post[]
}
