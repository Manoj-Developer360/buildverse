import { Button } from "@/components/ui/button"
import { Menu, LayoutDashboard, LineChart, FileText, Settings } from "lucide-react"
import { useLayout } from "@/contexts/layout-context"
import { Link, useLocation } from 'react-router-dom'

export function Sidebar() {
  const { sidebarExpanded, setSidebarExpanded } = useLayout()
  const location = useLocation()

  return (
    <div
      className={`h-[calc(100vh-2rem)] bg-background border-r transition-all duration-300 ${
        sidebarExpanded ? 'w-64' : 'w-16'
      } mt-20 rounded-xl fixed left-0 top-0`}
    >
      <Button
        variant="ghost"
        size="icon"
        className="absolute right-4 top-3 h-6 w-6"
        onClick={() => setSidebarExpanded(!sidebarExpanded)}
      >
        <Menu className="h-4 w-4" />
      </Button>
      <nav className="flex flex-col gap-2 p-4 mt-12">
        <Link to="/" className={`flex items-center p-2 rounded-lg ${location.pathname === '/' ? 'bg-accent' : ''}`}>
          <LayoutDashboard className="h-4 w-4" />
          {sidebarExpanded && <span className="ml-2">Home</span>}
        </Link>
        <Link to="/details" className={`flex items-center p-2 rounded-lg ${location.pathname === '/details' ? 'bg-accent' : ''}`}>
          <FileText className="h-4 w-4" />
          {sidebarExpanded && <span className="ml-2">Details</span>}
        </Link>
        {/* <Link to="/reports" className={`flex items-center p-2 rounded-lg ${location.pathname === '/reports' ? 'bg-accent' : ''}`}>
          <FileText className="h-4 w-4" />
          {sidebarExpanded && <span className="ml-2">Reports</span>}
        </Link>
        <Link to="/analytics" className={`flex items-center p-2 rounded-lg ${location.pathname === '/analytics' ? 'bg-accent' : ''}`}>
          <LineChart className="h-4 w-4" />
          {sidebarExpanded && <span className="ml-2">Data & Insights</span>}
        </Link>
        <Link to="/iot" className={`flex items-center p-2 rounded-lg ${location.pathname === '/iot' ? 'bg-accent' : ''}`}>
          <Settings className="h-4 w-4" />
          {sidebarExpanded && <span className="ml-2">IoT Integrations</span>}
        </Link> */}
        <Link to="/settings" className={`flex items-center p-2 rounded-lg ${location.pathname === '/settings' ? 'bg-accent' : ''}`}>
          <Settings className="h-4 w-4" />
          {sidebarExpanded && <span className="ml-2">Settings</span>}
        </Link>
      </nav>
    </div>
  )
} 