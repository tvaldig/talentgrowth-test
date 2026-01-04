import { Link } from "react-router-dom"
import { Button } from "./ui/button"
import { PlusCircle, PenTool, User, LogOut } from "lucide-react"
import { useAuth } from "hooks/use-auth"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "./ui/dropdown-menu"
import { Avatar, AvatarFallback, AvatarImage } from "./ui/avatar"

export function Navbar() {
  const { user, logout, isAuthenticated } = useAuth()

  return (
    <nav className="sticky top-0 z-50 w-full border-b bg-white/80 backdrop-blur-md">
      <div className="container mx-auto px-4 h-16 flex items-center justify-between">
        <Link to="/" className="flex items-center gap-2 group">
          <div className="w-8 h-8 rounded-lg bg-primary flex items-center justify-center text-primary-foreground group-hover:rotate-12 transition-transform">
            <PenTool className="w-5 h-5" />
          </div>
          <span className="font-bold text-xl tracking-tight">ColorfulBlog</span>
        </Link>
        <div className="flex items-center gap-4">
          <Button asChild variant="ghost" className="hidden sm:flex">
            <Link to="/">Browse</Link>
          </Button>

          {isAuthenticated ? (
            <>
              <Button asChild className="rounded-full shadow-lg hover:shadow-primary/20 transition-all active:scale-95">
                <Link to="/create" className="flex items-center gap-2">
                  <PlusCircle className="w-4 h-4" />
                  <span>Create Post</span>
                </Link>
              </Button>
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" className="relative h-10 w-10 rounded-full">
                    <Avatar className="h-10 w-10 border-2 border-primary/20">
                      <AvatarImage src={"/placeholder.svg"} alt={user?.name} />
                      <AvatarFallback>{user?.name?.[0].toUpperCase()}</AvatarFallback>
                    </Avatar>
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent className="w-56" align="end" forceMount>
                  <DropdownMenuLabel className="font-normal">
                    <div className="flex flex-col space-y-1">
                      <p className="text-sm font-medium leading-none">{user?.name}</p>
                      <p className="text-xs leading-none text-muted-foreground">{user?.email}</p>
                    </div>
                  </DropdownMenuLabel>
                  <DropdownMenuSeparator />
                  <DropdownMenuItem asChild>
                    <Link to="/profile" className="cursor-pointer flex items-center">
                      <User className="mr-2 h-4 w-4" />
                      <span>Profile</span>
                    </Link>
                  </DropdownMenuItem>
                  <DropdownMenuItem onClick={logout} className="text-red-600 cursor-pointer">
                    <LogOut className="mr-2 h-4 w-4" />
                    <span>Log out</span>
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            </>
          ) : (
            <div className="flex items-center gap-2">
              <Button asChild variant="ghost">
                <Link to="/login">Login</Link>
              </Button>
              <Button asChild className="rounded-full shadow-md">
                <Link to="/signup">Sign Up</Link>
              </Button>
            </div>
          )}
        </div>
      </div>
    </nav>
  )
}
