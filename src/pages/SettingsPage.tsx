import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Toaster, toast } from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [privacy, setPrivacy] = useState<string>('Public');
  const [autoBackup, setAutoBackup] = useState<boolean>(false);
  const [dataSync, setDataSync] = useState<boolean>(true);

  // Load settings from localStorage
  useEffect(() => {
    setNotificationsEnabled(localStorage.getItem('notifications') === 'true');
    setPrivacy(localStorage.getItem('privacy') || 'Public');
    setAutoBackup(localStorage.getItem('autoBackup') === 'true');
    setDataSync(localStorage.getItem('dataSync') === 'true');
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('notifications', JSON.stringify(notificationsEnabled));
    localStorage.setItem('privacy', privacy);
    localStorage.setItem('autoBackup', JSON.stringify(autoBackup));
    localStorage.setItem('dataSync', JSON.stringify(dataSync));

    toast.success('Settings updated successfully!');
  };

  return (
    <div className="p-8 max-w-3xl mx-auto shadow-2xl rounded-2xl border bg-white text-gray-900">
      <Toaster />
      <h1 className="text-3xl font-bold text-center mb-6">Settings</h1>

      <div className="space-y-6">
        {/* Notifications */}
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-xl border">
          <span className="text-lg font-semibold">Enable Notifications</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-6"></div>
          </label>
        </div>

        {/* Privacy Settings */}
        <div className="p-4 bg-gray-100 rounded-xl border">
          <label className="block mb-2 text-lg font-semibold text-gray-700">Profile Privacy</label>
          <select
            value={privacy}
            onChange={(e) => setPrivacy(e.target.value)}
            className="w-full border border-gray-300 p-3 rounded-xl bg-white shadow-sm text-gray-900 focus:ring-2 focus:ring-blue-500"
          >
            <option value="Public">Public</option>
            <option value="Private">Private</option>
          </select>
        </div>

        {/* Auto Backup */}
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-xl border">
          <span className="text-lg font-semibold">Enable Auto Backup</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={autoBackup}
              onChange={() => setAutoBackup(!autoBackup)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-6"></div>
          </label>
        </div>

        {/* Data Sync */}
        <div className="flex justify-between items-center p-4 bg-gray-100 rounded-xl border">
          <span className="text-lg font-semibold">Enable Data Sync</span>
          <label className="relative inline-flex cursor-pointer items-center">
            <input
              type="checkbox"
              checked={dataSync}
              onChange={() => setDataSync(!dataSync)}
              className="sr-only peer"
            />
            <div className="w-12 h-6 bg-gray-300 peer-checked:bg-blue-600 rounded-full transition-all"></div>
            <div className="absolute left-1 top-1 w-4 h-4 bg-white rounded-full shadow-md transition-all peer-checked:translate-x-6"></div>
          </label>
        </div>

        {/* Save Button */}
        <div className="text-center">
          <Button
            onClick={handleSaveSettings}
            className="px-6 py-3 mt-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg"
          >
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
