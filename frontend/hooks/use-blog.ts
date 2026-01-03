"use client"

import { useState, useMemo } from "react"
import { INITIAL_POSTS, type Post } from "lib/blog-data"

export function useBlog() {
  const [posts, setPosts] = useState<Post[]>(INITIAL_POSTS)
  const [searchQuery, setSearchQuery] = useState("")
  const [currentPage, setCurrentPage] = useState(1)
  const postsPerPage = 3

  const filteredPosts = useMemo(() => {
    return posts.filter(
      (post) =>
        post.title.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.excerpt.toLowerCase().includes(searchQuery.toLowerCase()) ||
        post.author.toLowerCase().includes(searchQuery.toLowerCase()),
    )
  }, [posts, searchQuery])

  const totalPages = Math.ceil(filteredPosts.length / postsPerPage)

  const currentPosts = useMemo(() => {
    const indexOfLastPost = currentPage * postsPerPage
    const indexOfFirstPost = indexOfLastPost - postsPerPage
    return filteredPosts.slice(indexOfFirstPost, indexOfLastPost)
  }, [filteredPosts, currentPage])

  const addPost = (newPost: Omit<Post, "id" | "date" | "comments" | "color">) => {
    const post: Post = {
      ...newPost,
      id: Math.random().toString(36).substr(2, 9),
      date: new Date().toISOString().split("T")[0],
      comments: [],
      color: ["bg-blue-500", "bg-purple-500", "bg-emerald-500", "bg-orange-500", "bg-pink-500"][
        Math.floor(Math.random() * 5)
      ],
    }
    setPosts((prev) => [post, ...prev])
  }

  const updatePost = (id: string, updatedFields: Partial<Post>) => {
    setPosts((prev) => prev.map((post) => (post.id === id ? { ...post, ...updatedFields } : post)))
  }

  const deletePost = (id: string) => {
    setPosts((prev) => prev.filter((post) => post.id !== id))
  }

  return {
    posts: currentPosts,
    allPosts: posts,
    searchQuery,
    setSearchQuery,
    currentPage,
    setCurrentPage,
    totalPages,
    addPost,
    updatePost,
    deletePost,
  }
}
