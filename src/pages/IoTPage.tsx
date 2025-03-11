import React, { useState } from 'react';
import { Button } from '../components/ui/button';

interface Sensor {
  id: number;
  type: string;
  location: string;
  threshold?: number;
  credentials?: {
    username: string;
    password: string;
  };
  accessUrl?: string;
}

const IoTPage: React.FC = () => {
  const [sensors, setSensors] = useState<Sensor[]>([]);
  const [sensorType, setSensorType] = useState<string>('Temperature Sensor');
  const [sensorLocation, setSensorLocation] = useState<string>('');
  const [sensorThreshold, setSensorThreshold] = useState<number | undefined>(undefined);
  const [username, setUsername] = useState<string>('');
  const [password, setPassword] = useState<string>('');
  const [accessUrl, setAccessUrl] = useState<string>('');
  const [activeTab, setActiveTab] = useState<'configure' | 'view'>('configure');

  const addSensor = () => {
    const newSensor: Sensor = {
      id: sensors.length + 1,
      type: sensorType,
      location: sensorLocation,
      threshold: sensorThreshold,
      credentials: { username, password },
      accessUrl,
    };
    setSensors([...sensors, newSensor]);
    setSensorLocation('');
    setSensorThreshold(undefined);
    setUsername('');
    setPassword('');
    setAccessUrl('');
  };

  return (
    <div className="p-6 h-full">
      <h1 className="text-3xl font-bold mb-6 text-center">IoT Integrations</h1>

      <div className="flex justify-center mb-6">
        <Button onClick={() => setActiveTab('configure')} variant={activeTab === 'configure' ? 'default' : 'outline'}>
          Configure Sensor
        </Button>
        <Button onClick={() => setActiveTab('view')} variant={activeTab === 'view' ? 'default' : 'outline'} className="ml-4">
          View Configured Sensors
        </Button>
      </div>

      {activeTab === 'configure' && (
        <div className="max-w-3xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Configure New Sensor</h2>
          <div className="grid gap-4">
            <div>
              <label className="block mb-2">Sensor Type:</label>
              <select
                value={sensorType}
                onChange={(e) => setSensorType(e.target.value)}
                className="border p-2 rounded w-full"
              >
                <option value="Temperature Sensor">Temperature Sensor</option>
                <option value="Water Sensor">Water Sensor</option>
                <option value="Camera">Camera</option>
              </select>
            </div>
            <div>
              <label className="block mb-2">Location:</label>
              <input
                type="text"
                value={sensorLocation}
                onChange={(e) => setSensorLocation(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Enter sensor location"
              />
            </div>
            {sensorType !== 'Camera' && (
              <div>
                <label className="block mb-2">Threshold:</label>
                <input
                  type="number"
                  value={sensorThreshold || ''}
                  onChange={(e) => setSensorThreshold(Number(e.target.value))}
                  className="border p-2 rounded w-full"
                  placeholder="Enter threshold value"
                />
              </div>
            )}
            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block mb-2">Username:</label>
                <input
                  type="text"
                  value={username}
                  onChange={(e) => setUsername(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Enter username"
                />
              </div>
              <div>
                <label className="block mb-2">Password:</label>
                <input
                  type="password"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="border p-2 rounded w-full"
                  placeholder="Enter password"
                />
              </div>
            </div>
            <div>
              <label className="block mb-2">Access URL:</label>
              <input
                type="text"
                value={accessUrl}
                onChange={(e) => setAccessUrl(e.target.value)}
                className="border p-2 rounded w-full"
                placeholder="Enter access URL"
              />
            </div>
            <Button onClick={addSensor} className="w-full">Add Sensor</Button>
          </div>
        </div>
      )}

      {activeTab === 'view' && (
        <div className="max-w-4xl mx-auto bg-white p-6 rounded-lg shadow-lg">
          <h2 className="text-2xl font-semibold mb-4">Configured Sensors</h2>
          <div className="max-h-80 overflow-y-auto border p-4 rounded">
            {sensors.length === 0 ? (
              <p className="text-gray-500">No sensors configured yet.</p>
            ) : (
              <ul className="space-y-4">
                {sensors.map(sensor => (
                  <li key={sensor.id} className="border p-4 rounded-lg bg-gray-50">
                    <strong>Type:</strong> {sensor.type} <br />
                    <strong>Location:</strong> {sensor.location} <br />
                    {sensor.threshold !== undefined && (
                      <>
                        <strong>Threshold:</strong> {sensor.threshold} <br />
                      </>
                    )}
                    <strong>Username:</strong> {sensor.credentials?.username} <br />
                    <strong>Access URL:</strong> {sensor.accessUrl} <br />
                  </li>
                ))}
              </ul>
            )}
          </div>
        </div>
      )}
    </div>
  );
};

export default IoTPage;
