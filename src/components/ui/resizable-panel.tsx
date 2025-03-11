import { Maximize2, Minimize2 } from "lucide-react"
import { useState, useRef, useEffect } from "react"
import { Button } from "./button"
import { cn } from "@/lib/utils"

interface ResizablePanelProps {
  children: React.ReactNode
  defaultSize: { width?: string; height?: string }
  minSize?: { width?: number; height?: number }
  maxSize?: { width?: number; height?: number }
  className?: string
  title?: string
}

export function ResizablePanel({
  children,
  defaultSize,
  minSize,
  maxSize,
  className = "",
  title
}: ResizablePanelProps) {
  const [isZoomed, setIsZoomed] = useState(false)
  // const { sidebarExpanded } = useLayout()
  const [resizeDirection, setResizeDirection] = useState<string | null>(null)
  const panelRef = useRef<HTMLDivElement>(null)
  const initialSize = useRef({ width: 0, height: 0 })
  const initialPosition = useRef({ x: 0, y: 0 })

  const handleResizeStart = (direction: string) => (e: React.MouseEvent) => {
    e.preventDefault()
    setResizeDirection(direction)
    initialPosition.current = { x: e.clientX, y: e.clientY }
    initialSize.current = {
      width: panelRef.current?.offsetWidth || 0,
      height: panelRef.current?.offsetHeight || 0
    }
  }

  useEffect(() => {
    const handleMouseMove = (e: MouseEvent) => {
      if (!resizeDirection || !panelRef.current) return

      const dx = e.clientX - initialPosition.current.x
      const container = panelRef.current.parentElement
      if (!container) return

      let newWidth = initialSize.current.width

      if (resizeDirection.includes('e')) {
        newWidth = Math.max(initialSize.current.width + dx, minSize?.width || 0)
        panelRef.current.style.width = `${newWidth}px`

        // Adjust sibling width
        const sibling = panelRef.current.nextElementSibling as HTMLElement
        if (sibling) {
          const remainingWidth = container.clientWidth - newWidth - 4 // 4px for gap
          sibling.style.width = `${remainingWidth}px`
        }
      }
      if (resizeDirection.includes('w')) {
        newWidth = Math.max(initialSize.current.width - dx, minSize?.width || 0)
        panelRef.current.style.width = `${newWidth}px`

        // Adjust sibling width
        const sibling = panelRef.current.previousElementSibling as HTMLElement
        if (sibling) {
          const remainingWidth = container.clientWidth - newWidth - 4 // 4px for gap
          sibling.style.width = `${remainingWidth}px`
        }
      }
    }

    const handleMouseUp = () => {
      setResizeDirection(null)
    }

    if (resizeDirection) {
      document.addEventListener('mousemove', handleMouseMove)
      document.addEventListener('mouseup', handleMouseUp)
    }

    return () => {
      document.removeEventListener('mousemove', handleMouseMove)
      document.removeEventListener('mouseup', handleMouseUp)
    }
  }, [resizeDirection, minSize])

  // Handle outside click for expanded view
  useEffect(() => {
    const handleClickOutside = (e: MouseEvent) => {
      if (isZoomed && e.target instanceof Element) {
        const modalContent = document.querySelector('.modal-content')
        if (modalContent && !modalContent.contains(e.target)) {
          setIsZoomed(false)
        }
      }
    }

    if (isZoomed) {
      document.addEventListener('mousedown', handleClickOutside)
    }

    return () => {
      document.removeEventListener('mousedown', handleClickOutside)
    }
  }, [isZoomed])

  if (isZoomed) {
    return (
      <div className="fixed inset-0 bg-background/80 backdrop-blur-sm z-[100]">
        <div 
          className="fixed inset-4 bg-card rounded-lg border shadow-lg modal-content flex flex-col z-[101]"
        >
          <div className="p-2 flex justify-end bg-card/90 backdrop-blur-sm border-b">
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={() => setIsZoomed(false)}
            >
              <Minimize2 className="h-4 w-4" />
            </Button>
          </div>
          <div className="flex-1 p-6 overflow-auto">
            {title && <h2 className="text-lg font-semibold mb-4">{title}</h2>}
            {children}
          </div>
        </div>
      </div>
    )
  }

  // const sidebarWidth = sidebarExpanded ? 256 : 64

  return (
    <div
      ref={panelRef}
      className={cn(
        "relative bg-card rounded-lg border shadow-sm",
        isZoomed && "fixed inset-4 z-10",
        className
      )}
      style={{
        width: defaultSize.width,
        height: defaultSize.height,
        minWidth: minSize?.width,
        minHeight: minSize?.height,
        maxWidth: maxSize?.width || '100%',
        maxHeight: maxSize?.height || '100%',
        transition: 'width 0.3s'
      }}
    >
      {/* Only horizontal resize handles */}
      <div className="absolute ">
        <div className="absolute top-0 left-0 w-1 h-full cursor-w-resize hover:bg-primary/10" onMouseDown={handleResizeStart('w')} />
        <div className="absolute top-0 right-0 w-1 h-full cursor-e-resize hover:bg-primary/10" onMouseDown={handleResizeStart('e')} />
      </div>

      <div className="absolute right-2 top-2 flex gap-2">
        <Button
          variant="ghost"
          size="icon"
          className="h-6 w-6"
          onClick={() => setIsZoomed(true)}
        >
          <Maximize2 className="h-4 w-4" />
        </Button>
      </div>
      <div className="h-full w-full p-2">
        {title && <h2 className="text-lg font-semibold mb-1">{title}</h2>}
        <div className="h-[calc(100%-2rem)]">
          {children}
        </div>
      </div>
    </div>
  )
} 