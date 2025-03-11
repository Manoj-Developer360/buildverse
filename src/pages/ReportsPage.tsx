import React, { useState } from 'react';
import { Button } from '../components/ui/button';
import Card from "@/components/ui/Card";
import { CardContent, CardHeader, CardTitle, CardDescription } from "@/components/ui/Card";
import { ResponsiveContainer, LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip } from 'recharts';
import jsPDF from 'jspdf';

const sampleData = [
  { name: 'Jan', value: 4000 },
  { name: 'Feb', value: 3000 },
  { name: 'Mar', value: 2000 },
  { name: 'Apr', value: 2780 },
  { name: 'May', value: 1890 },
  { name: 'Jun', value: 2390 },
  { name: 'Jul', value: 3490 },
];

const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<string>('PDF');

  const handleDownload = () => {
    const doc = new jsPDF();
    doc.text('Report Title', 20, 20);
    doc.text(`Report Type: ${reportType}`, 20, 30);
    doc.save(`report.${reportType.toLowerCase()}`);
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      <Card>
        <CardHeader>
          <CardTitle>Download Report</CardTitle>
          <CardDescription>Select the format to download the report</CardDescription>
        </CardHeader>
        <CardContent>
          <div className="mb-4">
            <label className="block mb-2">Select Report Format:</label>
            <select
              value={reportType}
              onChange={(e) => setReportType(e.target.value)}
              className="border p-2 rounded"
            >
              <option value="PDF">PDF</option>
              <option value="CSV">CSV</option>
              <option value="Excel">Excel</option>
            </select>
          </div>
          <Button onClick={handleDownload} className="mt-4">Download Report</Button>
        </CardContent>
      </Card> <br></br>
      <Card className="mt-4">
        <CardHeader>
          <CardTitle>Create Chart</CardTitle>
          <CardDescription>Visualize your data with charts</CardDescription>
        </CardHeader>
        <CardContent>
          <ResponsiveContainer width="100%" height={300}>
            <LineChart data={sampleData}>
              <CartesianGrid strokeDasharray="3 3" />
              <XAxis dataKey="name" />
              <YAxis />
              <Tooltip />
              <Line type="monotone" dataKey="value" stroke="#8884d8" />
            </LineChart>
          </ResponsiveContainer>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage; 