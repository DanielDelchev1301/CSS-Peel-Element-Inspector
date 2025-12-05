import React, { useEffect, useState } from "react";
import { PROPERTIES } from "../utils/helperFunctions.js";

const Manipulate = ({setTabOpen, popupOnRight, clickedElement}) => {
  const [elementValues, setElementValues] = useState({});

  useEffect(() => {
    if (clickedElement) {
      const styles = {};
      Object.values(PROPERTIES).forEach(property => {
        const computedStyle = window.getComputedStyle(clickedElement);
        styles[property] = computedStyle.getPropertyValue(property);
      });
      setElementValues(styles);
    }
  }, [clickedElement]);

  const handleChange = (property, value) => {
    setElementValues(state => ({...state, [property]: value}));
    clickedElement.style[property] = value;
  };

  return (
    <div id="element-manipulate-overlay" className={popupOnRight ? "popup-right" : "popup-left"}>
      <button id="close-manipulate-btn" onClick={() => setTabOpen(state => ({...state, manipulate: false}))}>Close</button>
      <h3 style={{color: "#676767"}}>Manipulate element</h3>

      <div id="manipulate-main-flex-container">
        {Object.values(PROPERTIES).map((property, index) => (
          <div key={index} className="label-value-container">
            <label htmlFor={property}>{property}</label>
            <input type="text" id={property} value={elementValues[property] || ""} onChange={(e) => handleChange(property, e.target.value)} />
          </div>
        ))}
      </div>
    </div>
  );
};

export default Manipulate;