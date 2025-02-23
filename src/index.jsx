import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Slider, IconButton } from "@mui/material";
import DownloadIcon from '@mui/icons-material/Download';
import SettingsIcon from '@mui/icons-material/Settings';
import { toPng } from 'html-to-image';
// import { HexColorPicker } from "react-colorful";  // Commented out
import { ColorPicker } from '@douyinfe/semi-ui';  // New import

const countryData = {
  NL: 6.2,
  BD: 5.4,
  GB: 1.8,
  US: 2.3,
  IN: 2.5,
  PK: 3.5,
};

const Flag = ({ country, waterLevel, blueShade }) => {
  const [dimensions, setDimensions] = useState({ width: 0, height: 200 });
  const flagUrl = `https://flagcdn.com/w1280/${country.toLowerCase()}.png`;

  const handleImageLoad = (e) => {
    const aspectRatio = e.target.naturalWidth / e.target.naturalHeight;
    setDimensions({
      width: 200 * aspectRatio,
      height: 200,
    });
  };

  const handleDownload = () => {
    const flagElement = document.getElementById(`flag-content-${country}`);
    toPng(flagElement, { quality: 1, pixelRatio: 2 })
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
    <div className="mdl-card mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--2dp">
      <figure className="mdl-card__media">
        <img src={flagUrl} alt={`${country} flag`} onLoad={handleImageLoad} className="flag-image" />
        <div className="blue-stripe" style={{ height: `${percentSubmerged}%`, backgroundColor: blueShade }}></div>
      </figure>
      <div className="mdl-card__title">
        <h1 className="mdl-card__title-text">{country}</h1>
      </div>
      <div className="mdl-card__actions mdl-card--border">
        <IconButton onClick={handleDownload} aria-label="download" className="mdl-button mdl-button--icon mdl-button--colored">
          <DownloadIcon />
        </IconButton>
      </div>
    </div>
  );
};

function App() {
  const [waterLevel, setWaterLevel] = useState(2);
  const [settingsOpen, setSettingsOpen] = useState(false);
  const [blueShade, setBlueShade] = useState("#6699CC");
  const [customBlueShade, setCustomBlueShade] = useState("#6699CC");

  const handleSettingsToggle = () => {
    setSettingsOpen(!settingsOpen);
  };

  const handleCustomBlueShadeChange = (color) => {
    setCustomBlueShade(color);
    setBlueShade(color);
  };

  const handleResetColor = () => {
    setCustomBlueShade("#6699CC");
    setBlueShade("#6699CC");
  };

  const marks = [
    { value: 0, label: '0m' },
    { value: 2, label: '2m' },
    { value: 4, label: '4m' },
    { value: 6, label: '6m' },
    { value: 8, label: '8m' },
    { value: 10, label: '10m' },
    { value: 12, label: '12m' },
    { value: 14, label: '14m' },
  ];

  return (
    <div className="mdl-layout mdl-js-layout mdl-color--grey-100">
      <main className="mdl-layout__content">
        <div className="settings-icon">
          <IconButton onClick={handleSettingsToggle} aria-label="settings">
            <SettingsIcon />
          </IconButton>
        </div>
        {settingsOpen && (
          <div className="settings-tab">
            <div style={{ marginTop: '10px', display: 'flex', justifyContent: 'center', flexDirection: 'column', alignItems: 'center' }}>
              {/* <HexColorPicker
                color={customBlueShade}
                onChange={handleCustomBlueShadeChange}
              /> */}
              <ColorPicker alpha={true} onChange={value => { setCustomBlueShade(value.hex); setBlueShade(value.hex); }} />
              <button onClick={handleResetColor} style={{ marginTop: '10px' }}>Reset Color</button>
            </div>
          </div>
        )}
        <h1>Future Flags of The Submerged Nations</h1>
        <p> Move the slider to see the impact of sea-level rise on flags. The blue stripe represents the percentage of the country submerged under water due to melting ice caps</p>
        <div className="slider-container">
          <Slider
            min={0}
            max={14}
            step={0.1}
            value={waterLevel}
            onChange={(e, newValue) => setWaterLevel(newValue)}
            aria-label="Water Level Slider"
            marks={marks}
          />
        </div>
        <div className="mdl-grid">
          {Object.keys(countryData).map((country) => (
            <Flag key={country} country={country} waterLevel={waterLevel} blueShade={blueShade} />
          ))}
        </div>
      </main>
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