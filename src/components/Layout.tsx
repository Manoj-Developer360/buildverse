import { Header } from "./Header";
import { Sidebar } from "./Sidebar";
import { useLayout } from "@/contexts/layout-context";
import { ReactNode } from "react";

interface LayoutProps {
  children: ReactNode;
}

export function Layout({ children }: LayoutProps) {
  const { sidebarExpanded } = useLayout();
  const sidebarWidth = sidebarExpanded ? 256 : 64;

  return (
    <div className="fixed inset-0 flex flex-col overflow-hidden bg-gray-100">
      {/* Header */}
      <div className="h-16 w-full">
        <Header />
      </div>

      {/* Main Layout */}
      <div className="flex flex-1 overflow-hidden">
        {/* Sidebar - No Scroll */}
        <div
          className="h-full transition-all duration-300 overflow-hidden"
          style={{ width: `${sidebarWidth}px` }}
        >
          <Sidebar />
        </div>

        {/* Content Layout */}
        <main className="flex-1 p-4 overflow-y-auto">
          {/* Left Side - 3D Viewer & Details (Stacked) */}
          <div className="gap-1 min-h-[600px]">
            {children} 
          </div>

          {/* Right Side - Empty Container */}
          <div className="h-full"></div>
        </main>
      </div>
    </div>
  );
}