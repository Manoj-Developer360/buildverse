import './App.css'
import { Layout } from "./components/Layout"
import { LayoutProvider } from "@/contexts/layout-context"
import { TreeNode, houseTreeData } from './types/house'
import { useEffect } from 'react'
import HomePage from './pages/HomePage'
import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'
import DetailsPage from './pages/DetailsPage'
import ReportsPage from './pages/ReportsPage'
import SettingsPage from './pages/SettingsPage'
import IoTPage from './pages/IoTPage'
import DashboardPage from './pages/DashboardPage'

function App() {
  // const [selectedNodeId, setSelectedNodeId] = useState<string | undefined>()
  // const [selectedNode, setSelectedNode] = useState<TreeNode | undefined>()
  // const [visibility, setVisibility] = useState<Record<string, boolean>>({})

  // Initialize visibility state from houseTreeData
  useEffect(() => {
    const initialVisibility: Record<string, boolean> = {}
    
    const initNodeVisibility = (nodes: TreeNode[]) => {
      nodes.forEach(node => {
        initialVisibility[node.id] = node.visible ?? true
        if (node.children) {
          initNodeVisibility(node.children)
        }
      })
    }

    initNodeVisibility(houseTreeData)
    // setVisibility(initialVisibility)
  }, [])

  // const handleNodeSelect = (node: TreeNode) => {
  //   setSelectedNodeId(node.id)
  //   setSelectedNode(node)
  // }

  // const handleVisibilityToggle = (nodeId: string) => {
  //   setVisibility(prev => ({
  //     ...prev,
  //     [nodeId]: !prev[nodeId]
  //   }))
  // }
  
  return (
    <Router>
      <LayoutProvider>
        <Layout>
          <Routes>
            <Route path="/" element={<HomePage />} />
            <Route path="/details" element={<DetailsPage nodes={houseTreeData} />} />
            <Route path="/reports" element={<ReportsPage />} />
            <Route path="/analytics" element={<DashboardPage />} />
            <Route path="/iot" element={<IoTPage />} />
            <Route path="/settings" element={<SettingsPage />} />
          </Routes>
         </Layout>
      </LayoutProvider>
    </Router>
  );
}

export default App;
