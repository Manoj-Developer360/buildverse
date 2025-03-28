import React, { useState } from "react";
import { Button } from "../components/ui/button";
import Card from "@/components/ui/Card";
import {
  CardContent,
  CardHeader,
  CardTitle,
  CardDescription,
} from "@/components/ui/Card";
import jsPDF from "jspdf";
import autoTable from "jspdf-autotable"; // Import for table support

// Data for Blocks and Office
const sections = [
  {
    name: "Block 1",
    totalCost: 115000,
    maintenance: {
      lastMaintenance: "2024-02-01",
      nextMaintenance: "2024-08-01",
      status: "Good",
      issues: ["Minor wear on lecture podiums", "Slight fading of whiteboards"],
      preventiveMaintenance: [
        "Inspect smart boards",
        "Clean HVAC vents",
        "Check projector alignment",
        "Replace burnt-out bulbs",
      ],
    },
    history: [
      { date: "2015", description: "Initial construction of Block 1.", cost: 75000 },
      { date: "2018", description: "Renovated classrooms, installed smart boards.", cost: 40000 },
    ],
  },
  {
    name: "Block 2",
    totalCost: 105000,
    maintenance: {
      lastMaintenance: "2024-01-10",
      nextMaintenance: "2024-07-10",
      status: "Needs Attention",
      issues: ["Overheating in lab areas", "Minor leaks in ventilation"],
      preventiveMaintenance: [
        "Clean lab equipment",
        "Inspect ventilation systems",
        "Test safety alarms",
        "Calibrate instruments",
      ],
    },
    history: [
      { date: "2022", description: "Setup of advanced lab equipment.", cost: 70000 },
      { date: "2023", description: "Upgraded ventilation and safety systems.", cost: 35000 },
    ],
  },
  {
    name: "Block 3",
    totalCost: 110000,
    maintenance: {
      lastMaintenance: "2024-03-05",
      nextMaintenance: "2024-09-05",
      status: "Excellent",
      issues: ["None reported"],
      preventiveMaintenance: [
        "Check camera feeds",
        "Test biometric systems",
        "Maintain generator fuel levels",
        "Inspect security locks",
      ],
    },
    history: [
      { date: "2019", description: "Installed security systems.", cost: 50000 },
      { date: "2021", description: "Upgraded backup power generators.", cost: 60000 },
    ],
  },
  {
    name: "Office",
    totalCost: 95000,
    maintenance: {
      lastMaintenance: "2024-02-15",
      nextMaintenance: "2024-08-15",
      status: "Good",
      issues: ["Slight wear on chairs", "Carpet cleaning required"],
      preventiveMaintenance: [
        "Check IT infrastructure",
        "Upgrade security software",
        "Service air conditioning units",
      ],
    },
    history: [
      { date: "2017", description: "Renovated office spaces, added workstations.", cost: 60000 },
      { date: "2020", description: "Installed new IT infrastructure.", cost: 35000 },
    ],
  },
];

// Function to generate and download PDF
const generatePDF = () => {
  const doc = new jsPDF();
  
  sections.forEach((section, index) => {
    if (index !== 0) doc.addPage(); // New page for each block/office

    // Add Page Border
    doc.setDrawColor(0);
    doc.setLineWidth(1);
    doc.rect(10, 10, 190, 277); // Border for the entire page

    // Title
    doc.setFont("times", "bold");
    doc.setFontSize(18);
    doc.setTextColor(0, 51, 102);
    doc.text("College Infrastructure Report", 65, 20);

    // Section Name
    doc.setFont("helvetica", "bold");
    doc.setFontSize(16);
    doc.setTextColor(33, 37, 41);
    doc.text(section.name, 20, 35);

    // Total Cost
    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.text(`Total Cost: $${section.totalCost}`, 20, 45);

    // Maintenance Details
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 255);
    doc.text("Maintenance Details:", 20, 55);

    doc.setFont("helvetica", "normal");
    doc.setFontSize(12);
    doc.setTextColor(0, 0, 0);
    doc.text(`Last Maintenance: ${section.maintenance.lastMaintenance}`, 25, 65);
    doc.text(`Next Maintenance: ${section.maintenance.nextMaintenance}`, 25, 72);
    doc.text(`Status: ${section.maintenance.status}`, 25, 79);

    doc.text("Issues:", 25, 86);
    section.maintenance.issues.forEach((issue, i) => {
      doc.text(`- ${issue}`, 30, 92 + i * 6);
    });

    let y = 100 + section.maintenance.issues.length * 6;
    doc.text("Preventive Maintenance:", 25, y);
    section.maintenance.preventiveMaintenance.forEach((task, i) => {
      doc.text(`- ${task}`, 30, y + 6 + i * 6);
    });

    y += 15 + section.maintenance.preventiveMaintenance.length * 6;

    // Historic Analysis Table
    doc.setFont("times", "bold");
    doc.setFontSize(14);
    doc.setTextColor(100, 100, 255);
    doc.text("Historic Analysis:", 20, y);

    y += 6;
    const historyData = section.history.map((event) => [
      event.date,
      event.description,
      `$${event.cost}`,
    ]);

    autoTable(doc, {
      startY: y,
      head: [["Year", "Event", "Cost"]],
      body: historyData,
      theme: "grid",
      styles: { fontSize: 11, cellPadding: 4 },
      headStyles: { fillColor: [0, 51, 102], textColor: 255 },
    });

    y = doc.lastAutoTable.finalY + 10;
  });

  doc.save("college_blocks_report.pdf");
};

// Reports Page Component
const ReportsPage: React.FC = () => {
  const [reportType, setReportType] = useState<string>("PDF");

  const handleDownload = () => {
    if (reportType === "PDF") {
      generatePDF();
    } else {
      alert("Only PDF export is currently supported.");
    }
  };

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">Reports</h1>

      {/* Download Report Section */}
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
              className="border p-2 rounded w-35 bg-white text-black"
            >
              <option value="PDF">PDF</option>
              {/* <option value="CSV">CSV </option>
              <option value="Excel">Excel</option> */}
            </select>
          </div><br/>
          <Button onClick={handleDownload} className="mt-4">
            Download Report
          </Button>
        </CardContent>
      </Card>
    </div>
  );
};

export default ReportsPage;
