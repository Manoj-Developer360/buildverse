import { useState, useEffect } from 'react';
import { Viewer3D } from '../components/Viewer3D';
import ViewerInsideBuilding from '../components/ViewerInsideBuilding';
import { TreeView } from '../components/TreeView';
import Details from '../components/Details';
import { TreeNode, houseTreeData } from '../types/house';
import { ResizablePanel } from '@/components/ui/resizable-panel';

export default function HomePage() {
  const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>();
  const [selectedNode, setSelectedNode] = useState<TreeNode | undefined>();
  const [selectedPosition, setSelectedPosition] = useState<[number, number, number]>();
  const [visibility, setVisibility] = useState<Record<string, boolean>>({});
  const [viewMode, setViewMode] = useState<'3d' | 'inside'>('3d');

  // Initialize visibility state from houseTreeData
  useEffect(() => {
    const initialVisibility: Record<string, boolean> = {};
    
    const initNodeVisibility = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        initialVisibility[node.id] = node.visible ?? true;
        if (node.children) {
          initNodeVisibility(node.children);
        }
      });
    };

    initNodeVisibility(houseTreeData);
    setVisibility(initialVisibility);
  }, []);

  const handleNodeSelect = (node: TreeNode) => {
    setSelectedNodeId(node.id);
    setSelectedNode(node);
    setSelectedPosition(node.position as [number, number, number]);
  };

  const handleVisibilityToggle = (nodeId: string) => {
    setVisibility(prev => ({
      ...prev,
      [nodeId]: !prev[nodeId]
    }));
  };

  return (
    <div className="flex flex-col h-[calc(100vh-4rem)] gap-1 justify-center">
      <div className="flex gap-1 h-[calc(60vh-1rem)] justify-center">
        <ResizablePanel
          defaultSize={{ width: "70%", height: "100%" }}
          minSize={{ width: 800, height: 300 }}
          maxSize={{ height: window.innerHeight * 0.5 }}
          title="3D Viewer"
          className="flex-1"
        >
          {viewMode === '3d' ? (
            <Viewer3D 
              nodeVisibility={visibility} 
              selectedPosition={selectedPosition}
              onSwitchView={() => setViewMode('inside')}
            />
          ) : (
            <ViewerInsideBuilding 
              onSwitchView={() => setViewMode('3d')} 
            />
          )}
        </ResizablePanel>

        <ResizablePanel
          defaultSize={{ width: "30%", height: "100%" }}
          minSize={{ width: 300, height: 300 }}
          maxSize={{ height: window.innerHeight * 0.5 }}
          title="Tree View"
          className="flex-1"
        >
          <TreeView
            nodes={houseTreeData}
            onNodeSelect={handleNodeSelect}
            onNodeVisibilityToggle={handleVisibilityToggle}
            selectedNodeId={selectedNodeId}
            visibilityState={visibility}
          />
        </ResizablePanel>
      </div>

      <ResizablePanel
        defaultSize={{ height: "40%" }}
        minSize={{ width: 600, height: 200 }}
        maxSize={{ height: window.innerHeight * 0.4 }}
        title="Details"
        className="h-[calc(40vh-1rem)]"
      >
        <Details node={selectedNode} />
      </ResizablePanel>
    </div>
  );
} 