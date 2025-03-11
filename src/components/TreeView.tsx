import { ChevronRight, ChevronDown, FocusIcon } from 'lucide-react'
import { TreeNode } from '@/types/house'
import { Button } from './ui/button'
import { cn } from '@/lib/utils'
import { useState, useEffect } from 'react'
import { gsap } from 'gsap'
import axios from 'axios'

interface TreeViewProps {
  nodes: TreeNode[]
  onNodeSelect: (node: TreeNode) => void
  onNodeVisibilityToggle: (nodeId: string) => void
  selectedNodeId?: string
  visibilityState: Record<string, boolean>
}

export function TreeView({ 
  nodes, 
  onNodeSelect, 
  onNodeVisibilityToggle,
  selectedNodeId,
  visibilityState
}: TreeViewProps) {
  const [expandedNodes, setExpandedNodes] = useState<Record<string, boolean>>({})

  const navigateToPosition = (position: [number, number, number]) => {
    const canvas = document.querySelector('canvas');
    if (!canvas) return;
    
    const camera = (canvas as any).__threejs?.camera;
    if (!camera) return;

    gsap.to(camera.position, {
      x: position[0] + 100, // Offset to get a good view
      y: position[1] + 100,
      z: position[2] + 100,
      duration: 2,
      ease: "power2.inOut"
    });

    gsap.to(camera.rotation, {
      x: -0.5,
      y: 0.5,
      z: 0.25,
      duration: 2,
      ease: "power2.inOut"
    });
  };

  // Expand all nodes by default
  useEffect(() => {
    const expanded: Record<string, boolean> = {}
    const expandAll = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        expanded[node.id] = true
        if (node.children) {
          expandAll(node.children)
        }
      })
    }
    // TODO: Uncomment this to expand all nodes by default
    // expandAll(nodes)
    setExpandedNodes(expanded)
  }, [])

  const handleRowClick = (node: TreeNode) => {
    console.log('clicked', node);
    onNodeSelect(node);
    navigateToPosition(node.position);
    
    if (node.children) {
      setExpandedNodes(prev => ({
        ...prev,
        [node.id]: !prev[node.id]
      }));
    }
  };

  const open3DModelInSoftware = (modelId: string) => {
    alert('Opening 3D model in software...')
    console.log('modelId', modelId);
    axios.get(`http://localhost:3000/open/${modelId}`)
      .then(response => {
        console.log('response', response);
      })
      .catch(error => {
        console.error('Error fetching model:', error);
      });
  }

  return (
    <div className="h-full overflow-auto">
      {nodes.map((node) => (
        <div key={node.id}>
          <div 
            className={cn(
              "flex items-center gap-2 p-2 hover:bg-accent/50 cursor-pointer",
              selectedNodeId === node.id && "bg-accent"
            )}
            onClick={() => handleRowClick(node)}
          >
            <div className="w-4">
              {node.children && (
                expandedNodes[node.id] ? (
                  <ChevronDown className="h-4 w-4" />
                ) : (
                  <ChevronRight className="h-4 w-4" />
                )
              )}
            </div>
            <span className="flex-1">{node.label}</span>
            <Button
              variant="ghost"
              size="icon"
              className="h-6 w-6"
              onClick={(e) => {
                e.stopPropagation()
                open3DModelInSoftware(node.id)
              }}
            >
                <FocusIcon className="h-3 w-3" />
            </Button>
          </div>
          {node.children && expandedNodes[node.id] && (
            <div className="pl-4">
              <TreeView
                nodes={node.children}
                onNodeSelect={onNodeSelect}
                onNodeVisibilityToggle={onNodeVisibilityToggle}
                selectedNodeId={selectedNodeId}
                visibilityState={visibilityState}
              />
            </div>
          )}
        </div>
      ))}
    </div>
  )
} 