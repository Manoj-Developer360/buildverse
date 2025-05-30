import { createContext, useContext, useState } from "react"

interface LayoutContextType {
  sidebarExpanded: boolean
  setSidebarExpanded: (expanded: boolean) => void
}

const LayoutContext = createContext<LayoutContextType | undefined>(undefined)

export function LayoutProvider({ children }: { children: React.ReactNode }) {
  const [sidebarExpanded, setSidebarExpanded] = useState(true)

  return (
    <LayoutContext.Provider value={{ sidebarExpanded, setSidebarExpanded }}>
      {children}
    </LayoutContext.Provider>
  )
}

export function useLayout() {
  const context = useContext(LayoutContext)
  if (!context) throw new Error("useLayout must be used within LayoutProvider")
  return context
} 