import React, { useState, useEffect } from 'react';
import { Button } from '../components/ui/button';
import { Toaster, toast } from 'react-hot-toast';

const SettingsPage: React.FC = () => {
  const [theme, setTheme] = useState<string>('light');
  const [notificationsEnabled, setNotificationsEnabled] = useState<boolean>(true);
  const [language, setLanguage] = useState<string>('English');

  // Load settings from localStorage
  useEffect(() => {
    const savedTheme = localStorage.getItem('theme') || 'light';
    const savedNotifications = localStorage.getItem('notifications') === 'true';
    const savedLanguage = localStorage.getItem('language') || 'English';

    setTheme(savedTheme);
    setNotificationsEnabled(savedNotifications);
    setLanguage(savedLanguage);

    document.documentElement.className = savedTheme;
  }, []);

  const handleSaveSettings = () => {
    localStorage.setItem('theme', theme);
    localStorage.setItem('notifications', JSON.stringify(notificationsEnabled));
    localStorage.setItem('language', language);

    document.documentElement.className = theme;

    toast.success('Settings saved successfully!');
  };

  return (
    <div className={`p-6 max-w-4xl mx-auto shadow-lg rounded-2xl border ${theme === 'dark' ? 'bg-gray-800 border-gray-600 text-white' : 'bg-white border-gray-200 text-gray-800'}`}>
      <Toaster />
      <h1 className="text-4xl font-extrabold mb-8 text-center">General Settings</h1>

      <div className="space-y-8">
        <div>
          <label className="block mb-3 text-lg font-semibold">Theme:</label>
          <select
            value={theme}
            onChange={(e) => setTheme(e.target.value)}
            className="w-full border p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="light">Light</option>
            <option value="dark">Dark</option>
          </select>
        </div>

        <div className="bg-gray-50 p-5 rounded-2xl border">
          <label className="flex items-center justify-between">
            <span className="text-lg font-semibold">Enable Notifications</span>
            <input
              type="checkbox"
              checked={notificationsEnabled}
              onChange={() => setNotificationsEnabled(!notificationsEnabled)}
              className="w-7 h-7 text-blue-500 focus:ring-blue-500 border-gray-300 rounded-lg"
            />
          </label>
        </div>

        <div>
          <label className="block mb-3 text-lg font-semibold">Language:</label>
          <select
            value={language}
            onChange={(e) => setLanguage(e.target.value)}
            className="w-full border p-3 rounded-xl bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <option value="English">English</option>
            <option value="Spanish">Spanish</option>
            <option value="French">French</option>
          </select>
        </div>

        <div className="text-center">
          <Button 
            onClick={handleSaveSettings} 
            className="px-8 py-3 mt-6 bg-blue-600 text-white font-bold rounded-xl hover:bg-blue-700 transition-shadow shadow-md hover:shadow-lg">
            Save Settings
          </Button>
        </div>
      </div>
    </div>
  );
};

export default SettingsPage;
