"use client"

import { Input } from "./ui/input"
import { Search } from "lucide-react"

interface SearchBarProps {
  value: string
  onChange: (value: string) => void
}

export function SearchBar({ value, onChange }: SearchBarProps) {
  return (
    <div className="relative max-w-md w-full mx-auto mb-12">
      <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-muted-foreground" />
      <Input
        type="text"
        placeholder="Search for articles or topics..."
        value={value}
        onChange={(e) => onChange(e.target.value)}
        className="pl-10 h-12 rounded-full border-2 border-primary/20 focus-visible:ring-primary/30 transition-all bg-white shadow-sm"
      />
    </div>
  )
}
