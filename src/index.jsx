import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Slider, IconButton, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import { toPng } from 'html-to-image';

// Mock data: Percentage submerged per meter of sea-level rise
const countryData = {
  NL: 6.2, // Netherlands
  BD: 5.4, // Bangladesh
  GB: 1.8, // United Kingdom
  US: 2.3, // USA
  IN: 2.5, // India
  PK: 3.5, // Pakistan
};

const Flag = ({ country, waterLevel, blueShade }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 200 }); // Fixed height
  const flagUrl = `https://flagcdn.com/w320/${country.toLowerCase()}.png`;

  const handleImageLoad = (e) => {
    const aspectRatio = e.target.naturalWidth / e.target.naturalHeight;
    setDimensions({
      width: 200 * aspectRatio, // Adjust width based on aspect ratio
      height: 200, // Fixed height
    });
  };

  const handleDownload = () => {
    const flagElement = document.getElementById(`flag-content-${country}`);
    toPng(flagElement, { quality: 1, pixelRatio: 2 }) // Increase pixelRatio for higher resolution
      .then((dataUrl) => {
        const link = document.createElement("a");
        link.download = `${country}-flag-${waterLevel}m.png`;
        link.href = dataUrl;
        link.click();
      })
      .catch((error) => {
        console.error('oops, something went wrong!', error);
      });
  };

  const percentSubmerged = Math.min(countryData[country] * waterLevel, 100);

  return (
    <div className="flag-container" style={{ width: dimensions.width + 20, height: dimensions.height }}>
      <div id={`flag-content-${country}`} className="flag-content" style={{ width: dimensions.width, height: dimensions.height }}>
        <img src={flagUrl} alt={`${country} flag`} onLoad={handleImageLoad} style={{ width: '100%', height: '100%' }} />
        <div className="blue-stripe" style={{ height: `${percentSubmerged}%`, backgroundColor: blueShade }}></div>
      </div>
      <div className="download-section">
        <IconButton onClick={handleDownload} aria-label="download">
          <DownloadIcon />
        </IconButton>
        <span className="country-code">{country}</span>
      </div>
    </div>
  );
};

function App() {
  const [waterLevel, setWaterLevel] = useState(0);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [blueShade, setBlueShade] = useState("#6699CC");

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleBlueShadeChange = (event) => {
    setBlueShade(event.target.value);
  };

  return (
    <div className="app">
      <div className="settings-icon">
        <IconButton onClick={handleSettingsToggle} aria-label="settings">
          <SettingsIcon />
        </IconButton>
      </div>
      {settingsOpen && (
        <div className="settings-tab">
          <FormControl fullWidth>
            <InputLabel id="blue-shade-label">Blue Shade</InputLabel>
            <Select
              labelId="blue-shade-label"
              value={blueShade}
              label="Blue Shade"
              onChange={handleBlueShadeChange}
            >
              <MenuItem value="#6699CC">Light Blue</MenuItem>
              <MenuItem value="#336699">Medium Blue</MenuItem>
              <MenuItem value="#003366">Dark Blue</MenuItem>
            </Select>
          </FormControl>
        </div>
      )}
      <h1>Future Flags of Partially Submerged Nations</h1>
      Move the slider to see the impact of sea-level rise on flags. The blue stripe represents the percentage of the country submerged under water due to melting ice caps.
      <Slider
        min={0}
        max={10}
        step={0.1}
        value={waterLevel}
        onChange={(e, newValue) => setWaterLevel(newValue)}
        aria-label="Water Level Slider"
      />
      {/* Rendering multiple flags */}
      <div className="flags-container">
        {Object.keys(countryData).map((country) => (
          <Flag key={country} country={country} waterLevel={waterLevel} blueShade={blueShade} />
        ))}
      </div>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
} else {
  console.error("Root element not found");
}
  
// import React, { useState } from "react";
// import ReactDOM from "react-dom/client";
// import "./index.css";
// import { Slider, IconButton, MenuItem, Select, FormControl, InputLabel } from "@mui/material";
// import DownloadIcon from '@mui/icons-material/Download';
// import SettingsIcon from '@mui/icons-material/Settings';
// import { toPng } from 'html-to-image';

// // Mock data: Percentage submerged per meter of sea-level rise
// const countryData = {
//   NL: 6.2, // Netherlands
//   BD: 5.4, // Bangladesh
//   GB: 1.8, // United Kingdom
//   US: 2.3, // USA
//   IN: 2.5, // India
//   PK: 3.5, // Pakistan
// };

// const Flag = ({ country, waterLevel, blueShade }) => {
//   const [dimensions, setDimensions] = useState({ width: 0, height: 200 }); // Fixed height
//   const flagUrl = `https://flagcdn.com/w320/${country.toLowerCase()}.png`;

//   const handleImageLoad = (e) => {
//     const aspectRatio = e.target.naturalWidth / e.target.naturalHeight;
//     setDimensions({
//       width: 200 * aspectRatio, // Adjust width based on aspect ratio
//       height: 200, // Fixed height
//     });
//   };

//   const handleDownload = () => {
//     const flagElement = document.getElementById(`flag-content-${country}`);
//     toPng(flagElement)
//       .then((dataUrl) => {
//         const link = document.createElement("a");
//         link.download = `${country}-flag-${waterLevel}m.png`;
//         link.href = dataUrl;
//         link.click();
//       })
//       .catch((error) => {
//         console.error('oops, something went wrong!', error);
//       });
//   };

//   const percentSubmerged = Math.min(countryData[country] * waterLevel, 100);

//   return (
//     <div className="flag-container" style={{ width: dimensions.width + 20, height: dimensions.height }}>
//       <div id={`flag-content-${country}`} className="flag-content" style={{ width: dimensions.width, height: dimensions.height }}>
//         <img src={flagUrl} alt={`${country} flag`} onLoad={handleImageLoad} style={{ width: '100%', height: '100%' }} />
//         <div className="blue-stripe" style={{ height: `${percentSubmerged}%`, backgroundColor: blueShade }}></div>
//       </div>
//       <div className="download-section">
//         <IconButton onClick={handleDownload} aria-label="download">
//           <DownloadIcon />
//         </IconButton>
//         <span className="country-code">{country}</span>
//       </div>
//     </div>
//   );
// };

// function App() {
//   const [waterLevel, setWaterLevel] = useState(0);
//   const [settingsOpen, setSettingsOpen] = useState(false);
//   const [blueShade, setBlueShade] = useState("#6699CC");

//   const handleSettingsToggle = () => {
//     setSettingsOpen(!settingsOpen);
//   };

//   const handleBlueShadeChange = (event) => {
//     setBlueShade(event.target.value);
//   };

//   return (
//     <div className="app">
//       <div className="settings-icon">
//         <IconButton onClick={handleSettingsToggle} aria-label="settings">
//           <SettingsIcon />
//         </IconButton>
//       </div>
//       {settingsOpen && (
//         <div className="settings-tab">
//           <FormControl fullWidth>
//             <InputLabel id="blue-shade-label">Blue Shade</InputLabel>
//             <Select
//               labelId="blue-shade-label"
//               value={blueShade}
//               label="Blue Shade"
//               onChange={handleBlueShadeChange}
//             >
//               <MenuItem value="#6699CC">Light Blue</MenuItem>
//               <MenuItem value="#336699">Medium Blue</MenuItem>
//               <MenuItem value="#003366">Dark Blue</MenuItem>
//             </Select>
//           </FormControl>
//         </div>
//       )}
//       <h1>Future Flags of Partially Submerged Nations</h1>
//       Move the slider to see the impact of sea-level rise on flags. The blue stripe represents the percentage of the country submerged under water due to melting ice caps.
//       <Slider
//         min={0}
//         max={10}
//         step={0.1}
//         value={waterLevel}
//         onChange={(e, newValue) => setWaterLevel(newValue)}
//         aria-label="Water Level Slider"
//       />
//       {/* Rendering multiple flags */}
//       <div className="flags-container">
//         {Object.keys(countryData).map((country) => (
//           <Flag key={country} country={country} waterLevel={waterLevel} blueShade={blueShade} />
//         ))}
//       </div>
//     </div>
//   );
// }

// const rootElement = document.getElementById("root");
// if (rootElement) {
//   const root = ReactDOM.createRoot(rootElement);
//   root.render(<App />);
// } else {
//   console.error("Root element not found");
// }
