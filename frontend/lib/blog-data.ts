export interface Comment {
  id: string
  author: string
  date: string
  content: string
}

export interface Post {
  id: string
  title: string
  author: string
  date: string
  category: string
  excerpt: string
  content: string
  comments: Comment[]
  color: string
}

export const INITIAL_POSTS: Post[] = [
  {
    id: "1",
    title: "Getting Started with React Hooks",
    author: "Alice Johnson",
    date: "2024-03-15",
    category: "Tutorial",
    excerpt: "Learn how to use React Hooks to manage state and side effects in your functional components.",
    content:
      "# Getting Started with React Hooks\n\nReact Hooks revolutionized how we write components. By allowing state and other features in functional components, they made code more readable and reusable.\n\n## Why Hooks?\n\nBefore hooks, complex logic was often trapped in class components, making it hard to share. Hooks like `useState` and `useEffect` changed everything.",
    comments: [
      {
        id: "c1",
        author: "Bob Smith",
        date: "2024-03-16",
        content: "This was super helpful! I finally understand useEffect.",
      },
    ],
    color: "bg-blue-500",
  },
  {
    id: "2",
    title: "The Future of Web Development",
    author: "Bob Smith",
    date: "2024-03-10",
    category: "Opinion",
    excerpt: "Exploring the upcoming trends in web development for 2024 and beyond, from AI to WebAssembly.",
    content:
      "# The Future of Web Development\n\nThe web is evolving faster than ever. AI-driven development and WebAssembly are pushing the boundaries of what's possible in a browser.",
    comments: [],
    color: "bg-purple-500",
  },
  {
    id: "3",
    title: "10 Tips for Better Code Reviews",
    author: "Carol Williams",
    date: "2024-03-05",
    category: "Guide",
    excerpt: "Improve your team's code quality and communication with these effective code review strategies.",
    content:
      "# 10 Tips for Better Code Reviews\n\nCode reviews are about more than just finding bugs; they're about sharing knowledge and maintaining high standards.",
    comments: [
      { id: "c2", author: "David Brown", date: "2024-03-06", content: "Tip #4 is a game changer for our team." },
    ],
    color: "bg-emerald-500",
  },
  {
    id: "4",
    title: "Understanding Async/Await",
    author: "David Brown",
    date: "2024-02-28",
    category: "Tutorial",
    excerpt: "Master asynchronous programming in JavaScript using the modern async/await syntax.",
    content:
      "# Understanding Async/Await\n\nAsynchronous code doesn't have to be complicated. Async/await provides a clean, synchronous-looking way to handle promises.",
    comments: [],
    color: "bg-orange-500",
  },
  {
    id: "5",
    title: "Building Accessible Web Apps",
    author: "Eva Martinez",
    date: "2024-02-20",
    category: "News",
    excerpt: "Why accessibility matters and how you can make your web applications inclusive for everyone.",
    content:
      "# Building Accessible Web Apps\n\nAccessibility is not a feature; it's a fundamental right. Designing for everyone makes the web better for all users.",
    comments: [],
    color: "bg-pink-500",
  },
  {
    id: "6",
    title: "CSS Grid vs Flexbox",
    author: "Alice Johnson",
    date: "2024-02-15",
    category: "Guide",
    excerpt: "Deciding between CSS Grid and Flexbox for your layouts? Here's a comprehensive comparison.",
    content:
      "# CSS Grid vs Flexbox\n\nWhile they overlap, Grid is for 2D layouts and Flexbox is best for 1D. Knowing when to use which is key to modern CSS.",
    comments: [],
    color: "bg-cyan-500",
  },
]
