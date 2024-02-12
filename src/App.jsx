import React, { useState } from 'react';
import './App.css';
jjj

const CloudPlatformCalculator = () => {
  const [computeHours, setComputeHours] = useState(0);
  const [storageGB, setStorageGB] = useState(0);
  const [durationMonths, setDurationMonths] = useState(0);
  const [totalCosts, setTotalCosts] = useState({
    AWS: 0,
    Azure: 0,
    GCP: 0
  });

  const platforms = [
    { name: 'AWS', computePricePerHour: 0.005, storagePricePerGBMonth: 0.02 },
    { name: 'Azure', computePricePerHour: 0.006, storagePricePerGBMonth: 0.022 },
    { name: 'GCP', computePricePerHour: 0.004, storagePricePerGBMonth: 0.018 }
  ];

  const calculateTCO = () => {
    const newTotalCosts = {};
    platforms.forEach(platform => {
      const computeCost = platform.computePricePerHour * computeHours;
      const storageCost = platform.storagePricePerGBMonth * storageGB;
      const totalCost = (computeCost + storageCost) * durationMonths;
      newTotalCosts[platform.name] = totalCost;
    });
    setTotalCosts(newTotalCosts);
  };

  return (
    <div className="cloud-platform-calculator">
      <h2>Cloud Platform TCO Calculator</h2>
      <form onSubmit={(e) => {
        e.preventDefault();
        calculateTCO();
      }}>
        <div>
          <label htmlFor="computeHours">Compute Hours:</label>
          <input 
            type="number" 
            id="computeHours" 
            value={computeHours} 
            onChange={(e) => setComputeHours(parseInt(e.target.value))} 
          />
        </div>
        <div>
          <label htmlFor="storageGB">Storage (GB):</label>
          <input 
            type="number" 
            id="storageGB" 
            value={storageGB} 
            onChange={(e) => setStorageGB(parseInt(e.target.value))} 
          />
        </div>
        <div>
          <label htmlFor="durationMonths">Duration (Months):</label>
          <input 
            type="number" 
            id="durationMonths" 
            value={durationMonths} 
            onChange={(e) => setDurationMonths(parseInt(e.target.value))} 
          />
        </div>
        <button type="submit">Calculate TCO</button>
      </form>
      <div className="results">
        <h3>Total Cost of Ownership</h3>
        <table>
          <thead>
            <tr>
              <th>Cloud Platform</th>
              <th>Total Cost</th>
            </tr>
          </thead>
          <tbody>
            {Object.entries(totalCosts).map(([platform, cost]) => (
              <tr key={platform}>
                <td>{platform}</td>
                <td>${cost}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default CloudPlatformCalculator;