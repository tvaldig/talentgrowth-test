export function BackgroundPattern() {
  return (
    <div className="fixed inset-0 -z-10 overflow-hidden pointer-events-none opacity-30">
      <div className="absolute top-[10%] left-[5%] w-64 h-64 bg-blue-200 rounded-full blur-3xl animate-pulse" />
      <div className="absolute top-[60%] right-[10%] w-96 h-96 bg-purple-200 rounded-full blur-3xl animate-pulse delay-700" />
      <div className="absolute bottom-[5%] left-[20%] w-72 h-72 bg-emerald-200 rounded-full blur-3xl animate-pulse delay-1000" />
    </div>
  )
}
