"use client"

import { useEffect, useState } from "react"
import api from "../lib/api"
import type {
  PaginatedPosts,
  Comment,
  Post as ApiPost,
} from "../lib/types"
import type { UIBlogPost } from "../lib/types"

const COLORS = [
  "bg-blue-500",
  "bg-purple-500",
  "bg-emerald-500",
  "bg-orange-500",
  "bg-pink-500",
]

function mapPostToUI(post: ApiPost): UIBlogPost {
  return {
    id: post.id,
    title: post.title,
    content: post.content,
    authorId: post.author.id,
    authorName: post.author.name,
    date: new Date(post.created_at).toLocaleDateString(),
    color: COLORS[post.id % COLORS.length],
  }
}

export function useBlog() {
  /** PUBLIC POSTS */
  const [posts, setPosts] = useState<UIBlogPost[]>([])
  const [loading, setLoading] = useState(false)

  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const [totalPages, setTotalPages] = useState(1)

  /** MY POSTS */
  const [myPosts, setMyPosts] = useState<UIBlogPost[]>([])

  const postsPerPage = 3

  /**
   * FETCH PUBLIC POSTS
   */
  const fetchPosts = async () => {
    setLoading(true)
    try {
      const res = await api.get<PaginatedPosts>("/api/v1/posts/", {
        params: {
          page: currentPage,
          limit: postsPerPage,
          search: searchQuery || undefined,
        },
      })

      setPosts(res.data.items.map(mapPostToUI))
      setTotalPages(Math.ceil(res.data.total / postsPerPage))
    } finally {
      setLoading(false)
    }
  }

  /**
   * FETCH MY POSTS
   */
  const fetchMyPosts = async () => {
    const res = await api.get<ApiPost[]>("/api/v1/posts/me")
    setMyPosts(res.data.map(mapPostToUI))
  }

  useEffect(() => {
    fetchPosts()
  }, [currentPage, searchQuery])

  /**
   * CREATE POST
   */
  const addPost = async (data: { title: string; content: string }) => {
    const res = await api.post<ApiPost>("/api/v1/posts/", data)
    const uiPost = mapPostToUI(res.data)

    setPosts((prev) => [uiPost, ...prev])
    setMyPosts((prev) => [uiPost, ...prev])
  }

  /**
   * UPDATE POST
   */
  const updatePost = async (
    id: number,
    data: Partial<Pick<ApiPost, "title" | "content">>
  ) => {
    const res = await api.put<ApiPost>(`/api/v1/posts/${id}`, data)
    const updated = mapPostToUI(res.data)

    setPosts((prev) => prev.map((p) => (p.id === id ? updated : p)))
    setMyPosts((prev) => prev.map((p) => (p.id === id ? updated : p)))
  }

  /**
   * DELETE POST
   */
  const deletePost = async (id: number) => {
    await api.delete(`/api/v1/posts/${id}`)

    setPosts((prev) => prev.filter((p) => p.id !== id))
    setMyPosts((prev) => prev.filter((p) => p.id !== id))
  }

  /**
   * COMMENTS
   */
  const getComments = async (postId: number) => {
    const res = await api.get<Comment[]>(
      `/api/v1/posts/${postId}/comments`
    )
    return res.data
  }

  const addComment = async (postId: number, content: string) => {
    const res = await api.post<Comment>(
      `/api/v1/posts/${postId}/comments`,
      { content }
    )
    return res.data
  }

  const updateComment = async (commentId: number, content: string) => {
    const res = await api.put<Comment>(
      `/api/v1/comments/${commentId}`,
      { content }
    )
    return res.data
  }

  const deleteComment = async (commentId: number) => {
    await api.delete(`/api/v1/comments/${commentId}`)
  }

  return {
    /** PUBLIC */
    posts,
    loading,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,

    /** PROFILE */
    myPosts,
    fetchMyPosts,

    /** MUTATIONS */
    addPost,
    updatePost,
    deletePost,

    /** COMMENTS */
    getComments,
    addComment,
    updateComment,
    deleteComment,
  }
}
