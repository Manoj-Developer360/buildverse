// AdminPanel.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'react-hot-toast';
import * as Papa from 'papaparse';

interface Block {
  id: number;
  name: string;
  totalCost: string;
  status: string;
  lastMaintenance: string;
  nextMaintenance: string;
}

const AdminPanel: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [formData, setFormData] = useState<Block>({
    id: 0,
    name: '',
    totalCost: '',
    status: '',
    lastMaintenance: '',
    nextMaintenance: '',
  });
  const [file, setFile] = useState<File | null>(null);

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleSubmit = () => {
    if (!formData.name || !formData.totalCost || !formData.status) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.id) {
      setBlocks((prev) =>
        prev.map((block) => (block.id === formData.id ? formData : block))
      );
      toast.success('Block updated successfully!');
    } else {
      const newBlock: Block = {
        ...formData,
        id: Date.now(),
      };
      setBlocks((prev) => [...prev, newBlock]);
      toast.success('Block added!');
    }

    setFormData({
      id: 0,
      name: '',
      totalCost: '',
      status: '',
      lastMaintenance: '',
      nextMaintenance: '',
    });
  };

  const handleEdit = (block: Block) => {
    setFormData(block);
  };

  const handleDelete = (id: number) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    toast.success('Block deleted!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file) {
      toast.error('Please select a file to import.');
      return;
    }

    Papa.parse(file as File, {
      complete: (result) => {
        const importedBlocks = result.data.map((row: any) => ({
          id: Date.now(),
          name: row[0],
          totalCost: row[1],
          status: row[2],
          lastMaintenance: row[3],
          nextMaintenance: row[4],
        }));
        setBlocks(importedBlocks);
        toast.success('Blocks imported successfully!');
      },
      header: false,
    });
  };

  return (
    <div className="p-6 mt-20 bg-white shadow-lg rounded-xl max-w-6xl mx-auto">
      <Toaster />
      <h2 className="text-3xl font-semibold text-gray-800 mb-6">🔧 Admin Panel</h2>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-6">
  <input
    type="text"
    name="name"
    placeholder="Block Name"
    value={formData.name}
    onChange={handleChange}
    className="border border-gray-300 bg-white rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
  />  
  <input
    type="number"
    name="totalCost"
    placeholder="Total Cost"
    value={formData.totalCost}
    onChange={handleChange}
    className="border border-gray-300 bg-white rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
  />
  <input
    type="text"
    name="status"
    placeholder="Status"
    value={formData.status}
    onChange={handleChange}
    className="border border-gray-300 bg-white rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
  />
  <input
    type="date"
    name="lastMaintenance"
    value={formData.lastMaintenance}
    onChange={handleChange}
    className="border border-gray-300 bg-white rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
  />
  <input
    type="date"
    name="nextMaintenance"
    value={formData.nextMaintenance}
    onChange={handleChange}
    className="border border-gray-300 bg-white rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
  />
</div>


      <Button onClick={handleSubmit} className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700">
        {formData.id ? 'Update Block' : 'Add Block'}
      </Button>

      {/* Import CSV Section */}
      <div className="mt-6 mb-6">
  <input
    type="file"
    onChange={handleFileChange}
    accept=".csv"
    className="border border-gray-300 bg-white rounded-lg p-3 text-black focus:outline-none focus:ring-2 focus:ring-gray-500"
  />
  <Button 
    onClick={handleImport} 
    className="bg-gray-600 text-white px-6 py-2 rounded-lg hover:bg-gray-700 ml-4"
  >
    Import CSV
  </Button>
</div>


      {/* Table Section */}
      <div className="mt-10">
        <h3 className="text-xl font-semibold text-gray-800 mb-4">📋 Managed Blocks</h3>
        <div className="overflow-x-auto">
          <table className="min-w-full border border-gray-200 rounded-lg text-left">
            <thead className="bg-gray-50 text-sm text-gray-600">
              <tr>
                <th className="p-4">Name</th>
                <th className="p-4">Total Cost</th>
                <th className="p-4">Status</th>
                <th className="p-4">Last Maint.</th>
                <th className="p-4">Next Maint.</th>
                <th className="p-4">Actions</th>
              </tr>
            </thead>
            <tbody>
              {blocks.map((block) => (
                <tr key={block.id} className="border-t hover:bg-gray-50">
                  <td className="p-4 text-gray-700">{block.name}</td>
                  <td className="p-4 text-gray-700">${block.totalCost}</td>
                  <td className="p-4 text-gray-700">{block.status}</td>
                  <td className="p-4 text-gray-700">{block.lastMaintenance}</td>
                  <td className="p-4 text-gray-700">{block.nextMaintenance}</td>
                  <td className="p-4 space-x-2">
                    <Button onClick={() => handleEdit(block)} className="bg-yellow-500 text-white px-3 py-1 rounded-lg">
                      Edit
                    </Button>
                    <Button onClick={() => handleDelete(block.id)} className="bg-red-600 text-white px-3 py-1 rounded-lg">
                      Delete
                    </Button>
                  </td>
                </tr>
              ))}
              {blocks.length === 0 && (
                <tr>
                  <td colSpan={6} className="text-center p-4 text-gray-400">
                    No blocks added yet.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

export default AdminPanel;
