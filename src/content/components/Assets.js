import React, { useEffect, useState } from "react";
import { applyClickedEffect } from "../utils/helperFunctions";

const Assets = ({setTabOpen, popupOnRight}) => {
  const [images, setImages] = useState([]);

  useEffect(() => {
    const images = [...document.querySelectorAll("img")].map(img => img.src);
    const bgImages = [...document.querySelectorAll("*")]
      .map(el => getComputedStyle(el).backgroundImage)
      .filter(bg => bg && bg.startsWith("url("))
      .map(bg => bg.slice(5, -2));

    setImages([...new Set([...images, ...bgImages])]);
  }, []);

  const handleDownload = (src, e) => {
    applyClickedEffect(e);
    
    chrome.runtime.sendMessage(
      {
        type: "downloadAsset",
        url: src,
        filename: src.split("/").pop()
      },
      (response) => {
        if (response?.success) {
          console.log("Download triggered successfully");
        } else {
          console.log("Download failed");
        }
      }
    );
  };

  return (
    <div className={`element-assets-overlay ${popupOnRight ? "popup-right" : "popup-left"}`}>
      <button className="close-assets-btn" onClick={() => setTabOpen(state => ({...state, assets: false}))}>Close</button>
      <h3 style={{color: "#676767"}}>Asset Files</h3>

      <div className="assets-main-flex-container">
        {images.length 
          ? images.map((src, index) => (
            <div className="assets-main-flex-container-wrapper" key={index}>
              <img className="assets-main-flex-container-wrapper-img" src={src} alt="Download image" />
              <button
                className="assets-main-flex-container-wrapper-download-btn"
                onClick={(e) => handleDownload(src, e)}
              >Download</button>
            </div>
          ))
          : <p style={{color: "#676767"}}>No image assets found on this page.</p>
        }
      </div>
    </div>
  );
};

export default Assets;