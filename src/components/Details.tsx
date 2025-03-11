import React from 'react';
import { TreeNode } from '../types/house';
import { Tabs, TabsContent, TabsList, TabsTrigger } from './ui/tabs';
import ReactPlayer from 'react-player'
import LiveOccupancy from './LiveOccupancy'; // Import the LiveOccupancy component
import RealLiveOccupancy from './RealLiveOccupancy'; // Import the RealLiveOccupancy component

interface DetailsProps {
  node?: TreeNode;
}

// Add type guard functions
function isHouseNode(node: TreeNode): boolean {
  return node.type === 'house';
}


const Details: React.FC<DetailsProps> = ({ node }) => {
  if (!node) {
    return (
      <div className="bg-card h-full w-full rounded-lg border shadow-sm p-4">
        Select a node to see details
      </div>
    );
  }

  // Show different content based on node type
  if (isHouseNode(node)) {
    return (
      <Tabs defaultValue="bom" className="w-full h-full overflow-y-auto">
        <TabsList className=" space-x-4 py-6 rounded-lg ">
  <TabsTrigger value="bom" className="px-4 py-2 rounded-md hover:bg-gray-200 transition">BOM</TabsTrigger>
  <TabsTrigger value="camera" className="px-4 py-2 rounded-md hover:bg-gray-200 transition">CCTV Cameras</TabsTrigger>
  <TabsTrigger value="maintenance" className="px-4 py-2 rounded-md hover:bg-gray-200 transition">Maintenance</TabsTrigger>
  <TabsTrigger value="history" className="px-4 py-2 rounded-md hover:bg-gray-200 transition">Historic Analysis</TabsTrigger>
</TabsList>

        <TabsContent value="bom" className="p-4">
  <h2 className="text-lg font-semibold mb-4">Bill of Materials</h2>
  {node.materials ? (
    <table className="w-full border-collapse shadow-md">
      <thead className="bg-gray-100">
        <tr>
          <th className="text-left p-3 border">Item</th>
          <th className="text-left p-3 border">Type</th>
          <th className="text-right p-3 border">Quantity</th>
          <th className="text-right p-3 border">Notes</th>
          <th className="text-right p-3 border">Unit</th>
          <th className="text-right p-3 border">Cost</th>
        </tr>
      </thead>
      <tbody>
        {node.materials.map((material: any, index: any) => (
          <tr 
            key={index} 
            className="hover:bg-gray-50 transition"
          >
            <td className="p-3 border">{material.item}</td>
            <td className="p-3 border">{material.type}</td>
            <td className="text-right p-3 border">{material.quantity}</td>
            <td className="text-right p-3 border">{material.notes}</td>
            <td className="text-right p-3 border">{material.unit}</td>
            <td className="text-right p-3 border">Rs.{material.cost}</td>
          </tr>

          
        ))}
      </tbody>
    </table>
  ) : (
    <p>No materials data available</p>
  )}
</TabsContent>


        
        <TabsContent value="camera" className="p-4">
          <Tabs defaultValue="mock-video-1">
            <TabsList>
              <TabsTrigger value="mock-video-1">Mock Video 1</TabsTrigger>
              <TabsTrigger value="mock-video-2">Mock Video 2</TabsTrigger>
              <TabsTrigger value="real-time">Real Time</TabsTrigger>
            </TabsList>
            <TabsContent value="mock-video-1" className="p-4">
              <div className="flex justify-left">
                <ReactPlayer width="70%" height="70%" url='cctv1.webm' playing={true} loop={true} />
                <div className="flex flex-col ml-4">
                  <LiveOccupancy />
                </div>
              </div>
            </TabsContent>
            <TabsContent value="mock-video-2" className="p-4">
              <div className="flex justify-left">
                  <ReactPlayer width="70%" height="70%" url='cctv2.webm' playing={true} loop={true} />
                  <div className="flex flex-col ml-4">
                    <LiveOccupancy />
                  </div>
              </div>
            </TabsContent>
            <TabsContent value="real-time" className="p-4">
              <div className="flex justify-left">
                <ReactPlayer 
                  width="70%" 
                  height="70%" 
                  url='http://localhost:4000/output.m3u8' 
                  playing={true} 
                  loop={true} 
                />
                <div className="flex flex-col ml-4">
                  <RealLiveOccupancy />
                </div>
              </div>
            </TabsContent>
          </Tabs>
        </TabsContent>


        
        <TabsContent value="maintenance" className="p-4 bg-white text-black rounded-lg shadow-lg">
  <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Maintenance</h2>
  {node.maintenance ? (
    <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Maintenance Schedule:</h3>
        <div className="text-gray-700">Last Maintenance: <span className="font-medium">{node.maintenance.lastMaintenance}</span></div>
        <div className="text-gray-700">Next Maintenance: <span className="font-medium">{node.maintenance.nextMaintenance}</span></div>
        <div className={`text-sm font-medium mt-2 ${node.maintenance.status === 'Needs Attention' ? 'text-red-500' : 'text-green-500'}`}>
          Status: {node.maintenance.status}
        </div>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Maintenance Checklist:</h3>
        <ul className="list-disc pl-4 space-y-2">
          {node.maintenance.preventiveMaintenance?.map((maintenance, index) => (
            <li key={index} className="text-gray-700">{maintenance}</li>
          ))}
        </ul>
      </div>

      <div className="p-4 bg-gray-100 rounded-lg shadow">
        <h3 className="font-semibold mb-2">Issues:</h3>
        <ul className="list-disc pl-4 space-y-2">
          {node?.maintenance?.issues?.map((issue: any, index: any) => (
            <li key={index} className="text-red-500">{issue}</li>
          ))}
        </ul>
      </div>
    </div>
  ) : (
    <p className="text-gray-500">No maintenance data available</p>
  )}
</TabsContent>


<TabsContent value="history" className="p-4 bg-white text-black rounded-lg shadow-lg">
  <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Historic Analysis</h2>
  {node.history ? (
    <div className="space-y-6">
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold text-gray-800">Construction Date:</h3>
        <p className="text-gray-700">{node.history.constructionDate}</p>
      </div>
      
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2">Renovations</h3>
        <div className="space-y-2">
          {node.history.renovations.map((renovation, index) => (
            <div key={index} className="p-2 border-l-4 border-blue-500 bg-white rounded">
              <div className="text-gray-800 font-medium">{renovation.date}: {renovation.description}</div>
              <div className="text-gray-600">Cost: <span className="font-semibold">Rs.{renovation.cost}</span></div>
            </div>
          ))}
        </div>
      </div>
      
      <div className="p-4 bg-gray-100 rounded-lg">
        <h3 className="font-semibold text-gray-800 border-b border-gray-300 pb-2">Incidents</h3>
        <div className="space-y-2">
          {node.history.incidents.map((incident, index) => (
            <div key={index} className="p-2 border-l-4 border-red-500 bg-white rounded">
              <div className="text-gray-800 font-medium">{incident.date}: {incident.description}</div>
              <div className="text-gray-600">Severity: <span className="font-semibold">{incident.severity}</span></div>
            </div>
          ))}
        </div>
      </div>
    </div>
  ) : (
    <p className="text-gray-500">No historical data available</p>
  )}
</TabsContent>

      </Tabs>
    );
  }

  // For other node types, show basic info
  return (
    <div className="bg-card h-full w-full rounded-lg border shadow-sm p-4 overflow-y-auto">
      <h2 className="text-lg font-semibold">{node.name}</h2>
      <p className="mt-2">{node.description}</p>
      <div className="mt-4">
        <h3 className="font-semibold">Type: {node.type}</h3>
        <p className="mt-2">Position: [{node.position.join(', ')}]</p>
      </div>
    </div>
  );
};

export default Details; 