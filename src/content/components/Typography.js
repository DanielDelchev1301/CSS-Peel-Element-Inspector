import React, { useEffect, useState } from "react";

const Typography = ({setTabOpen, popupOnRight}) => {
  const [typographyStyles, setTypographyStyles] = useState([]);

  useEffect(() => {
    const elements = document.querySelectorAll("*");
    const typography = new Map();

    elements.forEach(el => {
      const style = window.getComputedStyle(el);

      const key = JSON.stringify({
        fontFamily: style.fontFamily,
        fontSize: style.fontSize,
        fontWeight: style.fontWeight,
        letterSpacing: style.letterSpacing,
        textTransform: style.textTransform
      });

      if (!typography.has(key)) {
        typography.set(key, {
          fontFamily: style.fontFamily,
          fontSize: style.fontSize,
          fontWeight: style.fontWeight,
          letterSpacing: style.letterSpacing,
          textTransform: style.textTransform
        });
      }
    });

    setTypographyStyles(Array.from(typography.values()));
  }, []);

  const handleClickTypography = (typographyStyle, e) => {
    const style = `
      font-family: ${typographyStyle.fontFamily};
      font-size: ${typographyStyle.fontSize};
      font-weight: ${typographyStyle.fontWeight};
      letter-spacing: ${typographyStyle.letterSpacing};
      text-transform: ${typographyStyle.textTransform};
    `;
    navigator.clipboard.writeText(style);
    const el = e.currentTarget;
    el.classList.add('clicked');
    setTimeout(() => el.classList.remove('clicked'), 150);
  };

  return (
    <div id="element-typography-overlay" className={popupOnRight ? "popup-right" : "popup-left"}>
      <button id="close-typography-btn" onClick={() => setTabOpen(state => ({...state, typography: false}))}>Close</button>
      <h3 style={{color: "#676767"}}>Typography</h3>

      <div id="typography-main-flex-container">
        {typographyStyles.length 
          ? typographyStyles.map((style, index) => (
            <div 
              id="typography-box" 
              key={index}
              onClick={e => handleClickTypography(style, e)}  
            >
              <div className="typo-preview" style={{fontFamily: style.fontFamily, fontSize: style.fontSize, fontWeight: style.fontWeight, letterSpacing: style.letterSpacing, textTransform: style.textTransform}}>
                AaBbCc123
              </div>
              <div className="typo-info">
                <div><b>Font:</b> {style.fontFamily}</div>
                <div><b>Size:</b> {style.fontSize}</div>
                <div><b>Weight:</b> {style.fontWeight}</div>
                <div><b>Letter-spacing:</b> {style.letterSpacing}</div>
                <div><b>Transform:</b> {style.textTransform}</div>
              </div>
            </div>
          ))
          : <p style={{color: "#676767"}}>No typography found on this page.</p>
        }
      </div>
    </div>
  );
};

export default Typography;