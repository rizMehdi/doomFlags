import React, { useState } from "react";
import ReactDOM from "react-dom/client";
import "./index.css";
import { Slider, IconButton } from "@mui/material";
import DownloadIcon from "@mui/icons-material/Download";
import SettingsIcon from "@mui/icons-material/Settings";
import { toPng } from "html-to-image";
import { ColorPicker } from "@douyinfe/semi-ui";

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
    toPng(flagElement, { quality: 1, pixelRatio: 2 }).then((dataUrl) => {
      const link = document.createElement("a");
      link.download = `${country}-flag-${waterLevel}m.png`;
      link.href = dataUrl;
      link.click();
    });
  };

  const percentSubmerged = Math.min(countryData[country] * waterLevel, 100);

  return (
    <div className="mdl-card mdl-cell mdl-cell--6-col mdl-cell--4-col-tablet mdl-shadow--2dp" style={{ borderRadius: '10px' }}>
      <figure className="mdl-card__media">
        <img src={flagUrl} alt={`${country} flag`} onLoad={handleImageLoad} className="flag-image" />
        <div className="blue-stripe" style={{ height: `${percentSubmerged}%`, backgroundColor: blueShade }}></div>
      </figure>
      <div className="mdl-card__title">
        <h2 className="mdl-card__title-text">{country}</h2>
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

  return (
    <div className="mdl-layout mdl-js-layout mdl-color--grey-100">
      <main className="mdl-layout__content">
        <div className="mdl-grid">
          <div className="settings-icon">
            <IconButton onClick={() => setSettingsOpen(!settingsOpen)} aria-label="settings">
              <SettingsIcon />
            </IconButton>
          </div>
          {settingsOpen && (
            <div className="settings-tab">
              <ColorPicker alpha={true} onChange={(value) => setBlueShade(value.hex)} />
              <button onClick={() => setBlueShade("#6699CC")} className="mdl-button mdl-button--colored">Reset Color</button>
            </div>
          )}
          <h1 className="mdl-card__title-text">Future Flags of Submerged Nations</h1>
          <p>Adjust the slider to simulate rising sea levels.</p>
          <Slider min={0} max={14} step={0.1} value={waterLevel} onChange={(e, newValue) => setWaterLevel(newValue)} />
          <div className="mdl-grid">
            {Object.keys(countryData).map((country) => (
              <Flag key={country} country={country} waterLevel={waterLevel} blueShade={blueShade} />
            ))}
          </div>
        </div>
      </main>
    </div>
  );
}

const rootElement = document.getElementById("root");
if (rootElement) {
  const root = ReactDOM.createRoot(rootElement);
  root.render(<App />);
}