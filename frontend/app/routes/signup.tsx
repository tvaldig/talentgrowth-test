import type React from "react"
import { useState } from "react"
import { Link, useNavigate } from "react-router-dom"
import { Navbar } from "../components/navbar"
import { Footer } from "../components/footer"
import { useAuth } from "../../hooks/use-auth"
import { Button } from "../components/ui/button"
import { Input } from "../components/ui/input"
import { Label } from "../components/ui/label"
import { Card, CardContent, CardDescription, CardFooter, CardHeader, CardTitle } from "../components/ui/card"
import toast, { Toaster } from 'react-hot-toast';
import { Loader2, Mail, Lock, User } from "lucide-react"

export default function SignupPage() {
  const [username, setUsername] = useState("")
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [isLoading, setIsLoading] = useState(false)
  const { register } = useAuth()
  const navigate = useNavigate()

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault()
    setIsLoading(true)

    try {
      await register(username, email, password)
      toast.success("Account created successfully!")
      navigate("/")
    } catch (error) {
      toast.error("Signup failed. Please try again.")
    } finally {
      setIsLoading(false)
    }
  }

  return (
    <div className="min-h-screen flex flex-col">
      <Toaster />
      <Navbar />
      <main className="flex-grow flex items-center justify-center p-4">
        <Card className="w-full max-w-md shadow-2xl border-primary/10 overflow-hidden">
          <CardHeader className="space-y-1">
            <CardTitle className="text-3xl font-bold text-center">Create Account</CardTitle>
            <CardDescription className="text-center">Join our community and share your thoughts</CardDescription>
          </CardHeader>
          <form onSubmit={handleSubmit}>
            <CardContent className="space-y-4">
              <div className="space-y-2">
                <Label htmlFor="username">Username</Label>
                <div className="relative">
                  <User className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="username"
                    placeholder="johndoe"
                    value={username}
                    onChange={(e) => setUsername(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="email">Email</Label>
                <div className="relative">
                  <Mail className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="email"
                    type="email"
                    placeholder="name@example.com"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
              <div className="space-y-2">
                <Label htmlFor="password">Password</Label>
                <div className="relative">
                  <Lock className="absolute left-3 top-3 h-4 w-4 text-muted-foreground" />
                  <Input
                    id="password"
                    type="password"
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="pl-10"
                    required
                  />
                </div>
              </div>
            </CardContent>
            <CardFooter className="flex flex-col space-y-4 my-4">
              <Button
                type="submit"
                className="w-full text-lg h-12 rounded-xl transition-all active:scale-[0.98]"
                disabled={isLoading}
              >
                {isLoading ? <Loader2 className="mr-2 h-4 w-4 animate-spin" /> : "Create Account"}
              </Button>
              <div className="text-center text-sm text-muted-foreground">
                Already have an account?{" "}
                <Link to="/login" className="text-primary font-semibold hover:underline">
                  Login
                </Link>
              </div>
            </CardFooter>
          </form>
        </Card>
      </main>
      <Footer />
    </div>
  )
}
