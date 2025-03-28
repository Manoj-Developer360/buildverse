import React, { useState } from 'react';
import { TreeNode } from '../types/house';
import { 
  Command,
  CommandInput,
  CommandList,
  CommandItem,
  CommandGroup,
  CommandDialog,
  CommandEmpty
} from '@/components/ui/command';
import { Button } from '@/components/ui/button';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Check } from 'lucide-react';
import ReactPlayer from 'react-player';
import LiveOccupancy from '@/components/LiveOccupancy';
import RealLiveOccupancy from '@/components/RealLiveOccupancy';

interface DetailsPageProps {
  nodes: TreeNode[];
}

const DetailsPage: React.FC<DetailsPageProps> = ({ nodes }) => {
  const [selectedNodeIds, setSelectedNodeIds] = useState<string[]>([]);
  const [isCommandOpen, setIsCommandOpen] = useState(false);

  const handleSelectChange = (nodeId: string) => {
    setSelectedNodeIds(prev => {
      if (prev.includes(nodeId)) {
        return prev.filter(id => id !== nodeId);
      } else {
        return [...prev, nodeId];
      }
    });
  };

  const selectedNodes = nodes.filter(node => selectedNodeIds.includes(node.id));

  // Calculate Totals and Averages for BOM
  const totalQuantity = selectedNodes.reduce((acc, node) => 
    acc + (node.materials?.reduce((sum, mat) => sum + mat.quantity, 0) || 0), 0);
  const totalCost = selectedNodes.reduce((acc, node) => 
    acc + (node.materials?.reduce((sum, mat) => sum + mat.cost, 0) || 0), 0);

  // Calculate totals and averages
  // const totalTemperature = selectedNodes.reduce((sum, node) => sum + (node.monitoring?.temperature || 0), 0);
  // const totalHumidity = selectedNodes.reduce((sum, node) => sum + (node.monitoring?.humidity || 0), 0);
  // const totalRainfall = selectedNodes.reduce((sum, node) => sum + (node.monitoring?.rainfall || 0), 0);
  // const totalElectricity = selectedNodes.reduce((sum, node) => sum + (node.monitoring?.electricity || 0), 0);
  // const totalVoltage = selectedNodes.reduce((sum, node) => sum + (node.monitoring?.voltage || 0), 0);
  // const totalWater = selectedNodes.reduce((sum, node) => sum + (node.monitoring?.water || 0), 0);
  // const totalCommonArea = selectedNodes.reduce((sum, node) => sum + (node.monitoring?.commonArea || 0), 0);
  // const totalPrivateArea = selectedNodes.reduce((sum, node) => sum + (node.monitoring?.restrictedArea || 0), 0);

  // const averageTemperature = selectedNodes.length ? (totalTemperature / selectedNodes.length).toFixed(2) : 'N/A';
  // const averageHumidity = selectedNodes.length ? (totalHumidity / selectedNodes.length).toFixed(2) : 'N/A';
  // const averageRainfall = selectedNodes.length ? (totalRainfall / selectedNodes.length).toFixed(2) : 'N/A';
  // const averageElectricity = selectedNodes.length ? (totalElectricity / selectedNodes.length).toFixed(2) : 'N/A';
  // const averageVoltage = selectedNodes.length ? (totalVoltage / selectedNodes.length).toFixed(2) : 'N/A';
  // const averageWater = selectedNodes.length ? (totalWater / selectedNodes.length).toFixed(2) : 'N/A';


  return (
    <div className="h-full p-6 bg-gray-100 dark:bg-gray-900 rounded-xl shadow-lg">
  <h1 className="text-3xl font-extrabold mb-6 text-gray-800 dark:text-gray-200">
    Details Summary
  </h1>

  <div className="flex flex-col gap-4">
    <Button 
      variant="outline" 
      onClick={() => setIsCommandOpen(true)}
      className="w-full max-w-[400px] justify-start text-left font-medium border-gray-300 dark:border-gray-700 hover:bg-gray-200 dark:hover:bg-gray-800 transition"
    >
      <span className="truncate">
        {selectedNodeIds.length === 0 
          ? "Select nodes..." 
          : `${selectedNodeIds.length} node${selectedNodeIds.length === 1 ? '' : 's'} selected`}
      </span>
    </Button>

    <CommandDialog open={isCommandOpen} onOpenChange={setIsCommandOpen}>
      <Command className="rounded-xl border border-gray-300 dark:border-gray-700 shadow-xl bg-white dark:bg-gray-800">
        <CommandInput 
          placeholder="Search nodes..." 
          className="p-3 rounded-t-lg bg-gray-50 dark:bg-gray-700 border-b border-gray-300 dark:border-gray-600"
        />
        <CommandList className="max-h-60 overflow-y-auto">
          <CommandEmpty className="p-4 text-gray-500 dark:text-gray-400">No nodes found.</CommandEmpty>
          <CommandGroup heading="Available Nodes" className="p-2">
            {nodes.map(node => (
              <CommandItem
                key={node.id}
                onSelect={() => handleSelectChange(node.id)}
                className="flex items-center gap-3 p-3 rounded-lg hover:bg-gray-200 dark:hover:bg-gray-700 transition cursor-pointer"
              >
                <div className="flex items-center gap-2 flex-1">
                  <span className="text-gray-800 dark:text-gray-200">{node.name}</span>
                  {selectedNodeIds.includes(node.id) && (
                    <Check className="h-5 w-5 text-green-500" />
                  )}
                </div>
              </CommandItem>
            ))}
          </CommandGroup>
        </CommandList>
      </Command>
    </CommandDialog>
  </div>



      <Tabs defaultValue="bom" className="w-full h-full overflow-y-auto mt-4">
        <TabsList className='space-x-4'>
          <TabsTrigger value="bom">BOM</TabsTrigger>
          {/* <TabsTrigger value="monitoring">Live Data</TabsTrigger> */}
          <TabsTrigger value="camera">CCTV Cameras</TabsTrigger>         
          <TabsTrigger value="maintenance">Maintenance</TabsTrigger>
          <TabsTrigger value="history">Historic Analysis</TabsTrigger>
        </TabsList>

        <TabsContent value="bom" className="p-4 overflow-y-auto bg-white text-black rounded-lg shadow-lg">
  <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Materials</h2>
  {selectedNodes.length > 0 ? (
    <table className="w-full border-collapse shadow-md">
      <thead className="bg-gray-900 text-white">
        <tr>
          <th className="text-left p-2 border border-gray-300">Building</th>
          <th className="text-left p-2 border border-gray-300">Item</th>
          <th className="text-left p-2 border border-gray-300">Type</th>
          <th className="text-right p-2 border border-gray-300">Quantity</th>
          <th className="text-right p-2 border border-gray-300">Notes</th>
          <th className="text-right p-2 border border-gray-300">Unit</th>
          <th className="text-right p-2 border border-gray-300">Cost</th>
        </tr>
      </thead>
      <tbody className="divide-y divide-gray-200">
        {selectedNodes.map(node => node.materials?.map(material => ({ node, material })) || []).flat().map((item: any, index: any) => (
          <tr key={index} className="hover:bg-gray-100 transition-colors">
            <td className="p-2 border border-gray-300">{item.node.name}</td>
            <td className="p-2 border border-gray-300">{item.material.item}</td>
            <td className="p-2 border border-gray-300">{item.material.type}</td>
            <td className="text-right p-2 border border-gray-300">{item.material.quantity}</td>
            <td className="text-right p-2 border border-gray-300">{item.material.notes || '-'}</td>
            <td className="text-right p-2 border border-gray-300">{item.material.unit}</td>
            <td className="text-right p-2 border border-gray-300">Rs.{item.material.cost}</td>
          </tr>
        ))}
        <tr className="bg-gray-100 font-semibold">
          <td className="p-2 border border-gray-300">Total</td>
          <td className="p-2 border border-gray-300"></td>
          <td className="p-2 border border-gray-300"></td>
          <td className="text-right p-2 border border-gray-300">{totalQuantity}</td>
          <td className="text-right p-2 border border-gray-300"></td>
          <td className="text-right p-2 border border-gray-300"></td>
          <td className="text-right p-2 border border-gray-300">Rs.{totalCost}</td>
        </tr>

        {/* <tr>
                  <td className="p-2 border font-semibold">Average</td>
                  <td className="p-2 border"></td>
                  <td className="p-2 border"></td>
                  <td className="text-right p-2 border font-semibold">{averageQuantity}</td>
                  <td className="text-right p-2 border font-semibold"></td>
                  <td className="text-right p-2 border font-semibold"></td>
                  <td className="text-right p-2 border font-semibold">Rs.{averageCost}</td>
                </tr> */}
                
      </tbody>
    </table>
  ) : (
    <p className="text-gray-500">No materials data available</p>
  )}
</TabsContent>


        {/* <TabsContent value="monitoring" className="p-4 overflow-y-auto">
          <h2 className="text-lg font-semibold mb-4">Environment</h2>
          {selectedNodes.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border">Building</th>
                  <th className="text-right p-2 border">Temperature</th>
                  <th className="text-right p-2 border">Humidity</th>
                  <th className="text-right p-2 border">Rainfall</th>
                </tr>
              </thead>
              <tbody>
                {selectedNodes.map(node => (
                  <tr key={node.id}>
                    <td className="p-2 border">{node.name}</td>
                    <td className="text-right p-2 border">{node.monitoring?.temperature.toFixed(2) || 'N/A'}°C</td>
                    <td className="text-right p-2 border">{node.monitoring?.humidity.toFixed(2) || 'N/A'}%</td>
                    <td className="text-right p-2 border">{node.monitoring?.rainfall.toFixed(2) || 'N/A'} mm</td>
                  </tr>
                ))}
                <tr>
                  <td className="p-2 border font-semibold">Average</td>
                  <td className="text-right p-2 border font-semibold">{averageTemperature}°C</td>
                  <td className="text-right p-2 border font-semibold">{averageHumidity}%</td>
                  <td className="text-right p-2 border font-semibold">{averageRainfall} mm</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No monitoring data available</p>
          )}
          <h2 className="text-lg font-semibold mb-4">Consumption</h2>
          {selectedNodes.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border">Building</th>
                  <th className="text-right p-2 border">Electricity</th>
                  <th className="text-right p-2 border">Voltage</th>
                  <th className="text-right p-2 border">Water</th>
                </tr>
              </thead>
              <tbody>
                {selectedNodes.map(node => (
                  <tr key={node.id}>
                    <td className="p-2 border">{node.name}</td>
                    <td className="text-right p-2 border">{node.monitoring?.electricity.toFixed(2) || 'N/A'} kWh</td>
                    <td className="text-right p-2 border">{node.monitoring?.voltage.toFixed(2) || 'N/A'} V</td>
                    <td className="text-right p-2 border">{node.monitoring?.water.toFixed(2) || 'N/A'} m³</td>
                  </tr>
                ))}
                <tr>
                  <td className="p-2 border font-semibold">Average</td>
                  <td className="text-right p-2 border font-semibold">{averageElectricity} kWh</td>
                  <td className="text-right p-2 border font-semibold">{averageVoltage} V</td>
                  <td className="text-right p-2 border font-semibold">{averageWater} m³</td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No monitoring data available</p>
          )}
          <h2 className="text-lg font-semibold mb-4">Occupancy</h2>
          {selectedNodes.length > 0 ? (
            <table className="w-full border-collapse">
              <thead>
                <tr>
                  <th className="text-left p-2 border">Building</th>
                  <th className="text-right p-2 border">Common Area</th>
                  <th className="text-right p-2 border">Private Area</th>
                  <th className="text-right p-2 border">Total</th>
                </tr>
              </thead>
              <tbody>
                {selectedNodes.map(node => (
                  <tr key={node.id}>
                    <td className="p-2 border">{node.name}</td>
                    <td className="text-right p-2 border">{node.monitoring?.commonArea || 'N/A'} </td>
                    <td className="text-right p-2 border">{node.monitoring?.restrictedArea || 'N/A'} </td>
                    <td className="text-right p-2 border">{(node.monitoring?.commonArea || 0) + (node.monitoring?.restrictedArea || 0)} </td>
                  </tr>
                ))}
                <tr>
                  <td className="p-2 border font-semibold">Total Occupancy</td>
                  <td className="text-right p-2 border font-semibold">{totalCommonArea} </td>
                  <td className="text-right p-2 border font-semibold">{totalPrivateArea} </td>
                  <td className="text-right p-2 border font-semibold">{totalCommonArea + totalPrivateArea} </td>
                </tr>
              </tbody>
            </table>
          ) : (
            <p>No monitoring data available</p>
          )}
        </TabsContent> */}

<TabsContent value="maintenance" className="p-4 bg-white text-black rounded-lg shadow-lg">
  <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Maintenance</h2>
  {selectedNodes.length > 0 ? (
    <div className="space-y-6">
      {selectedNodes.map(node => (
        <div className="flex gap-x-10 p-4 border space-x-6 border-gray-300 rounded-lg shadow-sm">
          <h3 className="font-semibold mt-2 text-xl">Building: {node.name}</h3>
          <div className="space-y-2">
            <h3 className="font-semibold mt-2 text-lg">Maintenance Schedule:</h3>
            <div className="text-gray-700">Last Maintenance: <span className="font-medium">{node?.maintenance?.lastMaintenance || '-'}</span></div>
            <div className="text-gray-700">Next Maintenance: <span className="font-medium">{node?.maintenance?.nextMaintenance || '-'}</span></div>
            <div className="text-gray-700"> Status: <span className={`font-medium ${node?.maintenance?.status?.includes('Needs Attention') ? 'text-red-500' : 'text-green-500'}`}>{node?.maintenance?.status || '-'}</span></div>          </div>
          <div className="space-y-2">
            <h3 className="font-semibold mt-2  text-lg">Maintenance Checklist:</h3>
            <div className="">
              <ul className="list-disc pl-4 space-y-1">
                {node?.maintenance?.preventiveMaintenance?.length > 0 ? (
                  node.maintenance.preventiveMaintenance.map((maintenance, index) => (
                    <li key={index} className="text-gray-700">{maintenance}</li>
                  ))
                ) : (
                  <li className="text-gray-400 italic">No checklist items</li>
                )}
              </ul>
            </div>
          </div>
          <div className="space-y-2">
            <h3 className="font-semibold mt-2 text-lg">Issues:</h3>
            <div className="">
              <ul className="list-disc pl-4 space-y-1">
                {node?.maintenance?.issues?.length > 0 ? (
                  node.maintenance.issues.map((issue, index) => (
                    <li key={index} className="text-gray-700">{issue}</li>
                  ))
                ) : (
                  <li className="text-gray-400 italic">No issues reported</li>
                )}
              </ul>
            </div>
          </div>
        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No maintenance data available</p>
  )}
</TabsContent>


<TabsContent value="history" className="p-4 bg-white text-black">
  <h2 className="text-lg font-semibold mb-4 border-b border-gray-300 pb-2">Historic Analysis</h2>
  {selectedNodes.length > 0 ? (
    <div className="space-y-6">
      {selectedNodes.map(node => (
        <div key={node.name} className="p-4 border border-gray-300 rounded-lg shadow-sm">
          <h3 className="font-semibold text-lg mb-4">Building: {node.name}</h3>
          
          <div className="mb-4">
            <span className="text-gray-600">Construction Date:</span> <span className="font-medium">{node?.history?.constructionDate || '-'}</span>
          </div>
          
          <div className="mb-4">
            <h3 className="font-semibold mb-2">Renovations:</h3>
            {node?.history?.renovations?.length > 0 ? (
              node.history.renovations.map((renovation, index) => (
                <div key={index} className="ml-4 p-3 border-l-4 border-blue-400 bg-blue-50 rounded">
                  <div className="font-medium">{renovation.date}: {renovation.description}</div>
                  <div className="text-gray-600">Cost: <span className="font-semibold">Rs.{renovation.cost}</span></div>
                </div>
              ))
            ) : (   
              <div className="text-gray-500">No renovations recorded</div>
            )}
          </div>

          <div>
            <h3 className="font-semibold mb-2">Incidents:</h3>
            {node?.history?.incidents?.length > 0 ? (
              node.history.incidents.map((incident, index) => (
                <div key={index} className={`ml-4 p-3 border-l-4 rounded ${incident.severity === 'High' ? 'border-red-400 bg-red-50' : 'border-yellow-400 bg-yellow-50'}`}>
                  <div className="font-medium">{incident.date}: {incident.description}</div>
                  <div className="text-gray-600">Severity: <span className={`${incident.severity === 'High' ? 'text-red-500' : 'text-yellow-500'} font-semibold`}>{incident.severity}</span></div>
                </div>
              ))
            ) : (
              <div className="text-gray-500">No incidents recorded</div>
            )}
          </div>

        </div>
      ))}
    </div>
  ) : (
    <p className="text-gray-500">No historical data available</p>
  )}
</TabsContent>

<TabsContent value="camera" className="p-4 bg-gray-100">
  <Tabs defaultValue="mock-video-1">
    <TabsList className=" space-x-4 rounded-lg">
      <TabsTrigger value="mock-video-1" className="px-4 rounded-lg hover:bg-slate-50 transition">Mock Video 1</TabsTrigger>
      <TabsTrigger value="mock-video-2" className="px-4 py-2 rounded-lg hover:bg-slate-50 transition">Mock Video 2</TabsTrigger>
      <TabsTrigger value="real-time" className="px-4 py-2 rounded-lg hover:bg-slate-50 transition">Real Time</TabsTrigger>
    </TabsList>

    <TabsContent value="mock-video-1" className="p-4">
      <div className="flex justify-left gap-6">
        <div className="w-3/4 bg-black rounded-lg shadow-lg overflow-hidden">
          <ReactPlayer width="100%" height="100%" url='cctv1.webm' playing={true} loop={true} />
        </div>
        <div className="flex flex-col w-1/4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Live Occupancy</h3>
          <LiveOccupancy />
        </div>
      </div>
    </TabsContent>

    <TabsContent value="mock-video-2" className="p-4">
      <div className="flex justify-left gap-6">
        <div className="w-3/4 bg-black rounded-lg shadow-lg overflow-hidden">
          <ReactPlayer width="100%" height="100%" url='cctv2.webm' playing={true} loop={true} />
        </div>
        <div className="flex flex-col w-1/4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Live Occupancy</h3>
          <LiveOccupancy />
        </div>
      </div>
    </TabsContent>

    <TabsContent value="real-time" className="p-4">
      <div className="flex justify-left gap-6">
        <div className="w-3/4 bg-black rounded-lg shadow-lg overflow-hidden">
          <ReactPlayer width="100%" height="100%" url='http://localhost:4000/output.m3u8' playing={true} loop={true} />
        </div>
        {/* <div className="flex flex-col w-1/4 bg-white p-4 rounded-lg shadow-lg">
          <h3 className="font-semibold mb-2">Real-Time Occupancy</h3>
          <RealLiveOccupancy />
        </div> */}
      </div>
    </TabsContent>

  </Tabs>
</TabsContent>

      </Tabs>
    </div>
  );
};

export default DetailsPage; 