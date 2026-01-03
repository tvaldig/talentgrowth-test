export function Footer() {
  return (
    <footer className="w-full py-12 border-t bg-muted/30">
      <div className="container mx-auto px-4 text-center">
        <p className="text-muted-foreground text-sm">
          © {new Date().getFullYear()} ColorfulBlog. Built with love by Timotius Vivaldi Gunawan.
        </p>
      </div>
    </footer>
  )
}
