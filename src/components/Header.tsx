export function Header() {
  return (
    <header className="fixed top-0 left-0 right-0 h-16 bg-white border-b shadow-sm z-50 dark:bg-gray-900">
      <div className="container h-full flex items-center justify-between pl-0">
        <div className="flex items-center">
          <img src="/src/assets/logo.png" alt="Logo" className="h-20 w-auto object-contain" />
          <span className="font-bold text-2xl text-gray-800">BUILDVERSE</span>
        </div>
      </div>
    </header>
  )
} 