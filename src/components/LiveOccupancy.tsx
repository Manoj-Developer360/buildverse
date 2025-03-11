import React, { useEffect, useState } from 'react';

const LiveOccupancy: React.FC = () => {
  const [occupancy, setOccupancy] = useState<number>(0);
  const [alertMessage, setAlertMessage] = useState<string | null>(null);
//   const [signal, setSignal] = useState<boolean>(true); // true means signal is present
  const signal = true;
  useEffect(() => {
    const interval = setInterval(() => {
      if (signal) {
        // Randomly update occupancy between 30 and 50
        const newOccupancy = Math.floor(Math.random() * 21) + 30;
        setOccupancy(newOccupancy);
        const dummyAlertMessages = [
            'Someone is in the private area without authorization',
            'Someone near the Launch pad',
            'Camera 1 is not working',
            'Camera 2 is not working',
        ]
        // set random alert message every 15 seconds and show it for 5 seconds
        if (Math.random() < 0.5) {
            setAlertMessage(dummyAlertMessages[Math.floor(Math.random() * dummyAlertMessages.length)]);
            setTimeout(() => {
                setAlertMessage(null);
            }, 5000);
        }
      }
    }, 5000); // Update every 2 seconds

    return () => clearInterval(interval);
  }, [signal]);

  return (
    <div className="p-4 w-full border rounded-lg shadow-md bg-white">
      <h2 className="text-lg font-semibold">Occupancy : {occupancy} people</h2>
      <p className="text-sm text-gray-500">Last updated: {new Date().toLocaleTimeString()}</p>
      <div className="pt-4">
         <p className="text-sm font-semibold">Common areas : {Math.floor(occupancy/(1.5))} people</p>
        <p className="text-sm font-semibold">Private areas : {Math.floor(occupancy/(3.5))} people</p>
      </div>
      <div className="pt-4">
        <p className="text-sm font-semibold">Alert : {alertMessage}</p>
      </div>
    </div>
  );
};

export default LiveOccupancy; 