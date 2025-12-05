import React, { useEffect, useState } from "react";
import { handleClickColor } from "../utils/helperFunctions.js";

const Palette = ({setTabOpen, popupOnRight}) => {
  const [paletteColors, setPaletteColors] = useState([]);

  useEffect(() => {
    const colors = new Set();

    const isColor = (value) => {
      return value && value !== "transparent" && value !== "rgba(0, 0, 0, 0)";
    };

    document.querySelectorAll("*").forEach(el => {
      const styles = window.getComputedStyle(el);

      const colorProps = [
        "color",
        "backgroundColor",
        "borderColor",
        "outlineColor"
      ];

      colorProps.forEach(prop => {
        const val = styles[prop];
        if (isColor(val)) colors.add(val);
      });

      ["Top", "Right", "Bottom", "Left"].forEach(side => {
        const borderColor = styles[`border${side}Color`];
        if (isColor(borderColor)) colors.add(borderColor);
      });
    });

    setPaletteColors(Array.from(colors));
  }, []);

  return (
    <div id="element-palette-overlay" className={popupOnRight ? "popup-right" : "popup-left"}>
      <button id="close-palette-btn" onClick={() => setTabOpen(state => ({...state, palette: false}))}>Close</button>
      <h3 style={{color: "#676767"}}>Color Palette</h3>

      <div id="palette-main-flex-container">
        {paletteColors.length 
          ? paletteColors.map((color, index) => (
            <div
              id="palette-container-color-box"
              key={index} 
              style={{backgroundColor: color, border: `1px solid ${color}`}}
              onClick={e => handleClickColor(color, e)}
            >
              <span>{color}</span>
            </div>
          ))
          : <p style={{color: "#676767"}}>No colors found on this page.</p>
        }
      </div>
    </div>
  );
};

export default Palette;