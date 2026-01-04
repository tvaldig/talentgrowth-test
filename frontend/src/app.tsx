import { Outlet } from "react-router-dom"
import { AuthProvider } from "../hooks/use-auth"
import { Toaster } from "../app/components/ui/sonner"
import { BackgroundPattern } from "../app/components/background-pattern"

export default function App() {
  return (
    <AuthProvider>
      <BackgroundPattern />
      <Outlet />
      <Toaster />
    </AuthProvider>
  )
}
