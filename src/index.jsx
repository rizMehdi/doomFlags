import React from 'react';
import ReactDOM from 'react-dom/client';
import './index.css';
import App from './App';
import reportWebVitals from './reportWebVitals';

import { useState, useRef } from "react";
import Slider from '@mui/material/Slider';
import { Card, CardContent } from "@mui/material";
import { Button } from "@mui/material";
import html2canvas from "html2canvas";

// Mock data: Percentage of land submerged per meter of sea-level rise
const countryData = {
  "Netherlands": 6.2,
  "Bangladesh": 5.4,
  "United Kingdom": 1.8,
  "USA": 2.3,
  "India": 2.5,
};

const Flag = ({ country, waterLevel, refCallback }) => {
  const percentSubmerged = Math.min(countryData[country] * waterLevel, 100);
  return (
    <div ref={refCallback} className="relative w-40 h-24 border border-gray-300 overflow-hidden">
      {/* Base flag */}
      <div className="absolute inset-0 bg-gray-200 flex items-center justify-center">
        <span className="text-black font-bold text-sm">{country}</span>
      </div>
      {/* Blue stripe representing submerged percentage */}
      <div
        className="absolute bottom-0 bg-blue-500"
        style={{ height: `${percentSubmerged}%`, width: "100%" }}
      />
    </div>
  );
};

const SeaLevelApp = () => {
  const [waterLevel, setWaterLevel] = useState(0);
  const flagRefs = useRef({});

  const downloadFlag = async (country) => {
    const element = flagRefs.current[country];
    if (!element) return;
    const canvas = await html2canvas(element);
    const link = document.createElement("a");
    link.href = canvas.toDataURL("image/jpeg");
    link.download = `${country}_flag.jpg`;
    link.click();
  };

  return (
    <div className="p-6 max-w-lg mx-auto">
      <h1 className="text-xl font-bold mb-4">Sea Level Impact on Flags</h1>
      <Slider
        min={0}
        max={10}
        step={0.5}
        value={waterLevel} // Single value instead of array
        onChange={(event, newValue) => setWaterLevel(newValue)} // Corrected onChange
      />
      <p className="text-gray-700 text-sm mt-2">Water Level: {waterLevel} meters</p>
      <div className="grid grid-cols-2 gap-4 mt-4">
        {Object.keys(countryData).map((country) => (
          <Card key={country}>
            <CardContent className="flex flex-col items-center">
              <Flag
                country={country}
                waterLevel={waterLevel}
                refCallback={(el) => (flagRefs.current[country] = el)}
              />
              <Button className="mt-2" onClick={() => downloadFlag(country)}>
                Download
              </Button>
            </CardContent>
          </Card>
        ))}
      </div>
    </div>
  );
};

const root = ReactDOM.createRoot(document.getElementById('root'));
root.render(
  <React.StrictMode>
    <SeaLevelApp />
  </React.StrictMode>
);

reportWebVitals();