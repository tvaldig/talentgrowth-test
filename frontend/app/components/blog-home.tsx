"use client"

import { Navbar } from "./navbar"
import { Footer } from "./footer"
import { BlogCard } from "./blog-card"
import { SearchBar } from "./search-bar"
import { BackgroundPattern } from "./background-pattern"
import { useBlog } from "hooks/use-blog"
import {
  Pagination,
  PaginationContent,
  PaginationItem,
  PaginationLink,
  PaginationNext,
  PaginationPrevious,
} from "./ui/pagination"
import { Empty } from "./ui/empty"

export function BlogHome() {
  const { posts, searchQuery, setSearchQuery, currentPage, setCurrentPage, totalPages } = useBlog()

  return (
    <div className="min-h-screen flex flex-col">
      <BackgroundPattern />
      <Navbar />

      <main className="flex-grow container mx-auto px-4 py-12">
        <header className="text-center mb-16 space-y-4">
          <h1 className="text-4xl md:text-6xl font-black tracking-tighter text-balance">
            Insights, Stories & <span className="text-primary italic">Colorful</span> Ideas
          </h1>
          <p className="text-muted-foreground text-lg max-w-2xl mx-auto text-balance">
            Explore our collection of articles on development, design, and more.
          </p>
        </header>

        <SearchBar value={searchQuery} onChange={setSearchQuery} />

        {posts.length > 0 ? (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {posts.map((post) => (
              <BlogCard key={post.id} post={post} />
            ))}
          </div>
        ) : (
          <Empty
            title="No posts found"
            //description="We couldn't find any articles matching your search criteria. Try a different keyword!"
            className="py-20"
          />
        )}

        {totalPages > 1 && (
          <div className="mt-16">
            <Pagination>
              <PaginationContent>
                <PaginationItem>
                  <PaginationPrevious
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(Math.max(1, currentPage - 1))
                    }}
                    className={currentPage === 1 ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>

                {Array.from({ length: totalPages }, (_, i) => i + 1).map((page) => (
                  <PaginationItem key={page}>
                    <PaginationLink
                      href="#"
                      onClick={(e) => {
                        e.preventDefault()
                        setCurrentPage(page)
                      }}
                      isActive={currentPage === page}
                      className="cursor-pointer"
                    >
                      {page}
                    </PaginationLink>
                  </PaginationItem>
                ))}

                <PaginationItem>
                  <PaginationNext
                    href="#"
                    onClick={(e) => {
                      e.preventDefault()
                      setCurrentPage(Math.min(totalPages, currentPage + 1))
                    }}
                    className={currentPage === totalPages ? "pointer-events-none opacity-50" : "cursor-pointer"}
                  />
                </PaginationItem>
              </PaginationContent>
            </Pagination>
          </div>
        )}
      </main>

      <Footer />
    </div>
  )
}
