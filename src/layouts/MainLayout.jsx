import { Outlet } from "react-router-dom"

export default function MainLayout() {
  return (

    <div className="grid min-h-screen w-full grid-rows-[auto_auto_1fr_auto] gap-2 bg-background font-sans text-foreground">
      
      <header className="border-b bg-muted/50 p-4">
        Header
      </header>

      <nav className="bg-muted/30 p-4">
        Navigation
      </nav>

      <main className="p-4">
        {/* Đây là nơi nội dung các trang con sẽ hiển thị */}
        <Outlet />
      </main>

      <footer className="border-t bg-muted/50 p-4 text-center text-sm">
        Footer
      </footer>
      
    </div>
  )
}