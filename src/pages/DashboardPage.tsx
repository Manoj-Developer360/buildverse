import React from 'react';
import Card from "@/components/ui/Card";
import { CardContent, CardDescription, CardHeader, CardTitle } from "@/components/ui/Card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { ResponsiveContainer, LineChart, Line, BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, PieChart, Pie, Cell } from 'recharts';

const temperatureData = [
  { time: '00:00', value: 22 },
  { time: '04:00', value: 21 },
  { time: '08:00', value: 23 },
  { time: '12:00', value: 25 },
  { time: '16:00', value: 24 },
  { time: '20:00', value: 22 },
];

const occupancyData = [
  { area: 'Main Office', value: 45 },
  { area: 'Conference', value: 15 },
  { area: 'Cafeteria', value: 30 },
  { area: 'Labs', value: 25 },
];

const consumptionData = [
  { month: 'Jan', electricity: 2400, water: 1400 },
  { month: 'Feb', electricity: 1398, water: 1210 },
  { month: 'Mar', electricity: 9800, water: 1290 },
  { month: 'Apr', electricity: 3908, water: 1300 },
  { month: 'May', electricity: 4800, water: 1181 },
  { month: 'Jun', electricity: 3800, water: 1500 },
];

const maintenanceData = [
  { name: 'Completed', value: 45 },
  { name: 'Pending', value: 35 },
  { name: 'Critical', value: 20 },
];

const COLORS = ['#00C49F', '#FFBB28', '#FF8042'];

const DashboardPage: React.FC = () => {
  return (
    <div className="p-4 space-y-4">
      <h1 className="text-2xl font-bold">Dashboard</h1>

      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-3">
        {/* Temperature Monitoring */}
        <Card>
          <CardHeader>
            <CardTitle>Temperature</CardTitle>
            <CardDescription>24-hour temperature variation</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <LineChart data={temperatureData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="time" />
                <YAxis />
                <Tooltip />
                <Line type="monotone" dataKey="value" stroke="#8884d8" />
              </LineChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Occupancy Distribution */}
        <Card>
          <CardHeader>
            <CardTitle>Occupancy</CardTitle>
            <CardDescription>Current occupancy by area</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <BarChart data={occupancyData}>
                <CartesianGrid strokeDasharray="3 3" />
                <XAxis dataKey="area" />
                <YAxis />
                <Tooltip />
                <Bar dataKey="value" fill="#82ca9d" />
              </BarChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>

        {/* Maintenance Status */}
        <Card>
          <CardHeader>
            <CardTitle>Maintenance</CardTitle>
            <CardDescription>Current maintenance status</CardDescription>
          </CardHeader>
          <CardContent>
            <ResponsiveContainer width="100%" height={200}>
              <PieChart>
                <Pie
                  data={maintenanceData}
                  cx="50%"
                  cy="50%"
                  innerRadius={60}
                  outerRadius={80}
                  fill="#8884d8"
                  dataKey="value"
                  label
                >
                  {maintenanceData?.map((entry: any, index: any) => (
                    <Cell key={`cell-${entry?.name}-${index}`} fill={COLORS[index % COLORS.length]} />
                  ))}
                </Pie>
                <Tooltip />
                <Legend />
              </PieChart>
            </ResponsiveContainer>
          </CardContent>
        </Card>
      </div>

      {/* Resource Consumption */}
      <Card className="col-span-full">
        <CardHeader>
          <CardTitle>Resource Consumption</CardTitle>
          <CardDescription>Monthly electricity and water consumption</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <BarChart data={consumptionData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="month" />
              <YAxis />
              <Tooltip />
              <Legend />
              <Bar dataKey="electricity" fill="#8884d8" />
              <Bar dataKey="water" fill="#82ca9d" />
            </BarChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>

      {/* Detailed Analytics Tabs */}
      <Tabs defaultValue="overview" className="w-full">
        <TabsList>
          <TabsTrigger value="overview">Overview</TabsTrigger>
          <TabsTrigger value="analytics">Analytics</TabsTrigger>
          <TabsTrigger value="reports">Reports</TabsTrigger>
        </TabsList>
        <TabsContent value="overview">
          <Card>
            <CardHeader>
              <CardTitle>Overview</CardTitle>
              <CardDescription>Summary of key metrics</CardDescription>
            </CardHeader>
            <CardContent>
              <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Total Sensors</h3>
                  <p className="text-2xl">124</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Active Alerts</h3>
                  <p className="text-2xl">7</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Power Usage</h3>
                  <p className="text-2xl">45.2 kW</p>
                </div>
                <div className="p-4 border rounded-lg">
                  <h3 className="font-semibold">Water Usage</h3>
                  <p className="text-2xl">2.4k L</p>
                </div>
              </div>
            </CardContent>
          </Card>
        </TabsContent>
        <TabsContent value="analytics">
          <Card>
            <CardHeader>
              <CardTitle>Analytics</CardTitle>
              <CardDescription>Detailed analysis and trends</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
        <TabsContent value="reports">
          <Card>
            <CardHeader>
              <CardTitle>Reports</CardTitle>
              <CardDescription>Generated reports and summaries</CardDescription>
            </CardHeader>
          </Card>
        </TabsContent>
      </Tabs>
    </div>
  );
};

export default DashboardPage; 