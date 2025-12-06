import React, { useEffect, useRef, useState } from "react";
import { createBoxModelVisualization, getStructuredCSSHtml, handleHideShowBtn, isInOverlay } from "../utils/helperFunctions.js";
import Assets from "./Assets.js";
import Palette from "./Palette.js";
import Typography from "./Typography.js";
import Manipulate from "./Manipulate.js";
import ColorPickerComponent from "./ColorPicker.js";

const Inspector = () => {
  const [popupOnRight , setPopupOnRight] = useState(true);
  const [hidePopup , setHidePopup] = useState(false);
  const [highlightedElementOpts, setHighlightedElementOpts] = useState({});
  const [highlightBoxOpts, setHighlightBoxOpts] = useState({});
  const [tabOpen, setTabOpen] = useState({
    assets: false,
    palette: false,
    typography: false,
    manipulate: false,
    colorPicker: false
  });

  const highlightedElementBoxRef = useRef(null);
  const highlightBoxRef = useRef(null);
  const overlayRef = useRef(null);
  const canvasRef = useRef(null);
  const highlightBoxOptsRef = useRef(highlightBoxOpts);
  const clickedElementRef = useRef(null);
  const hidePopupRef = useRef(hidePopup);

  useEffect(() => {
    highlightBoxOptsRef.current = highlightBoxOpts;
  }, [highlightBoxOpts]);

  useEffect(() => {
    hidePopupRef.current = hidePopup;
  }, [hidePopup]);

  useEffect(() => {
    const highlightedElementBox = highlightedElementBoxRef.current;
    const highlightBox = highlightBoxRef.current;
    const overlay = overlayRef.current;
    const canvas = canvasRef.current;

    const onMouseMove = (e) => {
      if (isInOverlay(e.target)) {
        highlightBox.style.display = "none";
        return;
      }

      const el = document.elementFromPoint(e.clientX, e.clientY);
      if (
        !el ||
        el.className === 'element-highlight-box' || 
        el.className === 'element-size-label' || 
        el.className === 'element-tag-class-label' ||
        el.className === 'element-highlighted-element-box' ||
        el.className === 'element-highlighted-size-label' ||
        el.className === 'element-highlighted-tag-class-label' ||
        overlay.contains(el)
      ) return;

      const rect = el.getBoundingClientRect();
      highlightBox.style.width = rect.width + 'px';
      highlightBox.style.height = rect.height + 'px';
      highlightBox.style.top = rect.top + window.scrollY + 'px';
      highlightBox.style.left = rect.left + window.scrollX + 'px';
      highlightBox.style.display = 'flex';

      const sizeLabelCandidate = `${Math.round(rect.width)} x ${Math.round(rect.height)}`;
      const tagClassAndIdLabelCandidate = `Tag: ${el.tagName}, ID: ${el.id}, Classes: ${el.className}`;
      if (sizeLabelCandidate !== highlightBoxOptsRef.current.sizeLabel || tagClassAndIdLabelCandidate !== highlightBoxOptsRef.current.tagClassAndIdLabel) {
        setHighlightBoxOpts({ 
          sizeLabel: sizeLabelCandidate,
          tagClassAndIdLabel: tagClassAndIdLabelCandidate
        });
      }

    };

    const onClick = (e) => {
      if (isInOverlay(e.target)) return;
      clickedElementRef.current = e.target;

      e.preventDefault();
      e.stopPropagation();

      const el = e.target;
      const elForRect = document.elementFromPoint(e.clientX, e.clientY);
      const rect = elForRect.getBoundingClientRect();

      highlightedElementBox.style.width = rect.width + 'px';
      highlightedElementBox.style.height = rect.height + 'px';
      highlightedElementBox.style.top = rect.top + window.scrollY + 'px';
      highlightedElementBox.style.left = rect.left + window.scrollX + 'px';
      highlightedElementBox.style.display = 'flex';

      setHighlightedElementOpts({ 
        sizeLabel: `${Math.round(rect.width)} x ${Math.round(rect.height)}`,
        tagClassAndIdLabel: `Tag: ${el.tagName}, ID: ${el.id}, Classes: ${el.className}`
      });

      createBoxModelVisualization(el, canvas);
      if (!hidePopupRef.current) {
        overlay.style.display = "block";
      }
    };

    window.addEventListener("mousemove", onMouseMove, true);
    window.addEventListener("click", onClick, true);

    return () => {
      window.removeEventListener("mousemove", onMouseMove, true);
      window.removeEventListener("click", onClick, true);
    };
  }, []);

  const populateAllCssStyles = () => {
    const sections = getStructuredCSSHtml();
    const computed = window.getComputedStyle(clickedElementRef.current);

    return Object.entries(sections).map(([section, props]) => {
      return (<div className="section-box" key={section}>
        <h3>{section}</h3>
        {props.map(prop => {
          const value = computed.getPropertyValue(prop);
          if (value && value !== "initial" && value !== "none" && value !== "auto") {
            return <React.Fragment key={prop}><span data-full={value}>{prop}: {value};</span><br /></React.Fragment>;
          }
        })}
      </div>);
    });
  };

  const getTagIdAndClasses = () => {
    const tag = clickedElementRef.current.tagName;
    const id = clickedElementRef.current.id ? `#${clickedElementRef.current.id}` : "";
    const classes = clickedElementRef.current.className ? `.${String(clickedElementRef.current.className).split(" ").join(".")}` : "";

    return (
      <h2 style={{overflowWrap: "break-word"}}>
        <span>Tag: {tag}</span>
        <span>ID: {id}</span>
        <span>Classes: {classes}</span>
      </h2>
    );
  };

  return (
    <>
      <div className="element-highlighted-element-box" ref={highlightedElementBoxRef}>
        <div className="element-highlighted-size-label">{highlightedElementOpts.sizeLabel}</div>
        <div className="element-highlighted-tag-class-label">{highlightedElementOpts.tagClassAndIdLabel}</div>
      </div>

      <div className="element-highlight-box" ref={highlightBoxRef}>
        <div className="element-size-label">{highlightBoxOpts.sizeLabel}</div>
        <div className="element-tag-class-label">{highlightBoxOpts.tagClassAndIdLabel}</div>
      </div>
      
      <div className={`element-info-overlay ${popupOnRight ? "popup-right" : "popup-left"}`} ref={overlayRef}>
        <canvas width="250" height="250" ref={canvasRef}/>
        <div style={{fontSize: "10px", marginTop: "4px", display: "flex", gap: "10px"}}>
          <div><span style={{display:"inline-block",width:"12px",height:"12px",background:"rgba(255,200,200,0.5)",marginRight:"4px"}}></span> Margin</div>
          <div><span style={{display:"inline-block",width:"12px",height:"12px",background:"rgba(255,150,50,0.5)",marginRight:"4px"}}></span> Border</div>
          <div><span style={{display:"inline-block",width:"12px",height:"12px",background:"rgba(100,150,255,0.5)",marginRight:"4px"}}></span> Padding</div>
          <div><span style={{display:"inline-block",width:"12px",height:"12px",background:"rgba(150,255,150,0.5)",marginRight:"4px"}}></span> Content</div>
        </div>
        <div className="element-box">
          <button className="popup-hide-btn" onClick={() => handleHideShowBtn(true, () => overlayRef.current.style.display = "none", setHidePopup)}>Hide</button>
          <button className="popup-switch-btn" onClick={() => setPopupOnRight(!popupOnRight)}>Switch</button>
          <button className="popup-assets-btn" onClick={() => setTabOpen(state => ({...state, assets: true}))}>Assets</button>
          <button className="popup-palette-btn" onClick={() => setTabOpen(state => ({...state, palette: true}))}>Palette</button>
          <button className="popup-typography-btn" onClick={() => setTabOpen(state => ({...state, typography: true}))}>Typography</button>
          <button className="popup-manipulate-btn" onClick={() => setTabOpen(state => ({...state, manipulate: true}))}>Manipulate</button>
          <button className="popup-color-picker-btn" onClick={() => setTabOpen(state => ({...state, colorPicker: true}))}>Color Picker</button>
          {clickedElementRef.current ? getTagIdAndClasses() : null}
          <pre>{clickedElementRef.current ? populateAllCssStyles() : null}</pre>
        </div>
      </div>

      {tabOpen.assets 
        ? <Assets setTabOpen={setTabOpen} popupOnRight={popupOnRight} /> 
        : null
      }
      {tabOpen.palette 
        ? <Palette setTabOpen={setTabOpen} popupOnRight={popupOnRight} /> 
        : null
      }
      {tabOpen.typography 
        ? <Typography setTabOpen={setTabOpen} popupOnRight={popupOnRight} /> 
        : null
      }
      {tabOpen.manipulate 
        ? <Manipulate setTabOpen={setTabOpen} popupOnRight={popupOnRight} clickedElement={clickedElementRef.current} /> 
        : null
      }
      {tabOpen.colorPicker 
        ? <ColorPickerComponent setTabOpen={setTabOpen} popupOnRight={popupOnRight} /> 
        : null
      }
      {hidePopup ?
        <div className={`element-hidden-overlay ${popupOnRight ? "popup-right" : "popup-left"}`}>
          <button 
            className="popup-hide-btn"
            onClick={() => handleHideShowBtn(false, () => overlayRef.current.style.display = "block", setHidePopup)}
          >Show</button>
        </div>
        : null}
    </>
  );
};

export default Inspector;