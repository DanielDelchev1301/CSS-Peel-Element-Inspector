import React, { useState } from "react";
import { SketchPicker } from "react-color";
import { handleClickColor } from "../utils/helperFunctions.js";

const ColorPickerComponent = ({setTabOpen, popupOnRight}) => {
  const [color, setColor] = useState({ hex: "#ffffff"});

  const handlePickFromPage = async () => {
    if ("EyeDropper" in window) {
      try {
        const eyeDropper = new EyeDropper();
        const resultObj = await eyeDropper.open();
        setColor(state => ({ ...state, hex: resultObj.sRGBHex }));
      } catch (err) {
        console.warn("EyeDropper canceled", err);
      }
    } else {
      alert("Your browser does not support the EyeDropper API.");
    }
  };

  return (
    <div className={`element-color-picker-overlay ${popupOnRight ? "popup-right" : "popup-left"}`}>
      <button id="close-color-picker-btn" onClick={() => setTabOpen(state => ({...state, colorPicker: false}))}>Close</button>
      <h3 style={{color: "#676767"}}>Color Picker</h3>

      <button
        id="pick-from-page-btn"
        onClick={handlePickFromPage}
      >
        Pick from page
      </button>
      <SketchPicker color={color.hex} onChange={(color) => setColor(color)} />
      {color.rgb 
        ? <>
          <div 
            className="copy-color-picker-box"
            style={{backgroundColor: color.hex}}
            onClick={e => handleClickColor(color.hex, e)}
          >
            <span>{color.hex}</span>
          </div>
          <div 
            className="copy-color-picker-box" 
            style={{backgroundColor: color.hex}}
            onClick={e => handleClickColor(`rgba: (${color.rgb.r}, ${color.rgb.g}, ${color.rgb.b}, ${color.rgb.a})`, e)}
          >
            <span>rgba:&#40;{color.rgb.r}, {color.rgb.g}, {color.rgb.b}, {color.rgb.a}&#41;</span>
          </div>
        </>
        : null
      }
    </div>
  );
};

export default ColorPickerComponent;