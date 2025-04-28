// AdminPanel.tsx

import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Toaster, toast } from 'react-hot-toast';
import * as Papa from 'papaparse';

interface Block {
  id: number;
  building: string;
  item: string;
  type: string;
  quantity: string;
  unit: string;
  cost: string;
}

const AdminPanel: React.FC = () => {
  const [blocks, setBlocks] = useState<Block[]>([]);
  const [formData, setFormData] = useState<Block>({
    id: 0,
    building: '',
    item: '',
    type: '',
    quantity: '',
    unit: '',
    cost: '',
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
    if (!formData.building || !formData.item || !formData.type) {
      toast.error('Please fill in all required fields');
      return;
    }

    if (formData.id !== 0) {
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
      toast.success('Block created successfully!');
    }

    setFormData({
      id: 0,
      building: '',
      item: '',
      type: '',
      quantity: '',
      unit: '',
      cost: '',
    });
  };

  const handleEdit = (block: Block) => {
    setFormData(block);
  };

  const handleDelete = (id: number) => {
    setBlocks((prev) => prev.filter((block) => block.id !== id));
    toast.success('Block deleted successfully!');
  };

  const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    if (e.target.files?.length) {
      setFile(e.target.files[0]);
    }
  };

  const handleImport = () => {
    if (!file) {
      toast.error('Please select a CSV file to import.');
      return;
    }

    Papa.parse(file, {
      complete: (result) => {
        const importedBlocks = (result.data as string[][])
          .filter((row, index) => {
            if (index === 0) return false; // Ignore header
            return row.length >= 6;
          })
          .map((row) => ({
            id: Date.now() + Math.random(),
            building: row[0] || '',
            item: row[1] || '',
            type: row[2] || '',
            quantity: row[3] || '',
            unit: row[4] || '',
            cost: row[5] || '',
          }));
        setBlocks((prev) => [...prev, ...importedBlocks]);
        toast.success('Blocks imported successfully!');
      },
      header: false,
      skipEmptyLines: true,
    });
  };

  return (
    <div className="p-8 mt-20 bg-gradient-to-br from-white to-gray-100 shadow-2xl rounded-2xl max-w-7xl mx-auto">
      <Toaster />
      <h2 className="text-4xl font-bold text-gray-800 mb-8 text-center">🏢 Building Blocks Management</h2>

      {/* File Upload Section */}
      <div className="flex flex-col md:flex-row items-center mb-10 gap-4">
        <input
          type="file"
          accept=".csv"
          onChange={handleFileChange}
          className="border border-gray-300 bg-white rounded-lg p-3 text-gray-700 focus:outline-none focus:ring-1 focus:ring-gray-400 w-full md:w-auto"
        />
        <Button
          onClick={handleImport}
          className="bg-gray-800 text-white px-8 py-3 rounded-lg hover:bg-gray-700 w-full md:w-auto"
        >
          Import CSV
        </Button>
      </div>

      {/* Form Section */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        {['building', 'item', 'type', 'quantity', 'unit', 'cost'].map((field) => (
          <input
            key={field}
            type="text"
            name={field}
            value={(formData as any)[field]}
            onChange={handleChange}
            placeholder={field.charAt(0).toUpperCase() + field.slice(1)}
            className="border border-gray-400 bg-gray-50 rounded-lg p-3 text-gray-800 placeholder-gray-500 focus:outline-none focus:ring-1 focus:ring-gray-400 focus:border-gray-400"
          />
        ))}
        <Button
          onClick={handleSubmit}
          className="col-span-1 md:col-span-3 bg-gray-800 text-white py-3 rounded-lg hover:bg-gray-700"
        >
          {formData.id ? 'Update Block' : 'Add Block'}
        </Button>
      </div>

      {/* Table Section */}
      <div className="overflow-x-auto rounded-lg shadow-lg">
        <table className="min-w-full table-auto border border-gray-300">
          <thead className="bg-gray-900 text-white">
            <tr>
              <th className="px-6 py-4 text-left">Building</th>
              <th className="px-6 py-4 text-left">Item</th>
              <th className="px-6 py-4 text-left">Type</th>
              <th className="px-6 py-4 text-left">Quantity</th>
              <th className="px-6 py-4 text-left">Unit</th>
              <th className="px-6 py-4 text-left">Cost</th>
              <th className="px-6 py-4 text-left">Actions</th>
            </tr>
          </thead>
          <tbody className="bg-white text-gray-700">
            {blocks.length > 0 ? (
              blocks.map((block) => (
                <tr key={block.id} className="border-b border-gray-200 hover:bg-gray-100">
                  <td className="px-6 py-4">{block.building}</td>
                  <td className="px-6 py-4">{block.item}</td>
                  <td className="px-6 py-4">{block.type}</td>
                  <td className="px-6 py-4">{block.quantity}</td>
                  <td className="px-6 py-4">{block.unit}</td>
                  <td className="px-6 py-4">Rs. {parseFloat(block.cost).toFixed(4)}</td>
                  <td className="px-6 py-4 space-y-2">
                    <Button
                      onClick={() => handleEdit(block)}
                      className="w-full bg-gray-700 text-white text-sm py-2 rounded-lg hover:bg-gray-600" 
                    >
                      Edit
                    </Button>
                    <Button
                      onClick={() => handleDelete(block.id)}
                      className="w-full bg-gray-500 text-white text-sm py-2 rounded-lg hover:bg-gray-600"
                    >
                      Delete
                    </Button>
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan={7} className="text-center px-6 py-12 text-gray-400">
                  No building blocks added yet.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminPanel;
