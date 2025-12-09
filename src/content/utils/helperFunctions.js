export const isInOverlay = (el) => !!el.closest?.("#element-inspector-extension-container-shadow-host, .element-info-overlay, .element-hidden-overlay, .element-assets-overlay, .element-palette-overlay, .element-typography-overlay, .element-manipulate-overlay, .element-color-picker-overlay, .element-highlighted-element-box, .element-design-overlay");

export const PROPERTIES = {
  display: "display",
  position: "position",
  top: "top",
  bottom: "bottom",
  left: "left",
  right: "right",
  color: "color", 
  backgroundColor: "backgroundColor", 
  fontSize: "fontSize", 
  padding: "padding", 
  margin: "margin", 
  border: "border",
  width: "width",
  height: "height",
  opacity: "opacity",
  borderRadius: "borderRadius",
  boxShadow: "boxShadow",
};

export const getStructuredCSSHtml = () => {
  const sections = {
    "Font & Text": [
      "font", "font-family", "font-size", "font-weight", "line-height",
      "letter-spacing", "text-align", "text-decoration", "text-transform",
      "white-space", "word-spacing"
    ],
    "Color & Background": [
      "color", "background", "background-color", "background-image",
      "background-size", "background-position", "background-repeat", "opacity"
    ],
    "Box": [
      "width", "height", "min-width", "min-height", "max-width", "max-height",
      "padding", "padding-top", "padding-right", "padding-bottom", "padding-left",
      "margin", "margin-top", "margin-right", "margin-bottom", "margin-left",
      "border", "border-width", "border-style", "border-color", "border-radius",
      "box-sizing"
    ],
    "Positioning": [
      "position", "top", "right", "bottom", "left", "z-index", "display",
      "flex", "flex-direction", "justify-content", "align-items", "align-self"
    ],
    "Effects": [
      "box-shadow", "text-shadow", "filter", "transform", "transition"
    ]
  };

  return sections;
};

export const createBoxModelVisualization = (boxModelData, canvas) => {
  const canvasSize = 250;
  const ctx = canvas.getContext('2d');

  const style = window.getComputedStyle(boxModelData);

  const width = parseFloat(style.width);
  const height = parseFloat(style.height);

  const marginTop = parseFloat(style.marginTop);
  const marginRight = parseFloat(style.marginRight);
  const marginBottom = parseFloat(style.marginBottom);
  const marginLeft = parseFloat(style.marginLeft);

  const paddingTop = parseFloat(style.paddingTop);
  const paddingRight = parseFloat(style.paddingRight);
  const paddingBottom = parseFloat(style.paddingBottom);
  const paddingLeft = parseFloat(style.paddingLeft);

  const borderTop = parseFloat(style.borderTopWidth);
  const borderRight = parseFloat(style.borderRightWidth);
  const borderBottom = parseFloat(style.borderBottomWidth);
  const borderLeft = parseFloat(style.borderLeftWidth);

  const layerThickness = 20;

  let x = 0;
  let y = 0;
  let size = canvasSize;

  // Margin
  ctx.fillStyle = 'rgb(255, 220, 220)';
  ctx.fillRect(x, y, size, size);

  // Border
  x += layerThickness;
  y += layerThickness;
  size -= layerThickness * 2;
  ctx.fillStyle = 'rgb(253, 170, 70)';
  ctx.fillRect(x, y, size, size);

  // Padding
  x += layerThickness;
  y += layerThickness;
  size -= layerThickness * 2;
  ctx.fillStyle = 'rgb(100,170,255)';
  ctx.fillRect(x, y, size, size);

  // Content
  x += layerThickness;
  y += layerThickness;
  size -= layerThickness * 2;
  ctx.fillStyle = 'rgb(170,255,170)';
  ctx.fillRect(x, y, size, size);

  // TEXT
  ctx.fillStyle = "#272727ff";
  ctx.font = "12px Arial";
  ctx.textAlign = "center";

  const drawLabel = (value, defaultSymbol, posX, posY, rotate = false) => {
    const text = value > 0 ? `${value}px` : defaultSymbol;
    ctx.save();
    ctx.translate(posX, posY);
    if (rotate) ctx.rotate(-Math.PI / 2);
    ctx.fillText(text, 0, 0);
    ctx.restore();
  };

  // Margin labels
  drawLabel(marginTop, "-", canvasSize / 2, 12);
  drawLabel(marginBottom, "-", canvasSize / 2, canvasSize - 4);
  drawLabel(marginLeft, "-", 12, canvasSize / 2, true);
  drawLabel(marginRight, "-", canvasSize - 12, canvasSize / 2, true);

  // Border labels
  drawLabel(borderTop, "-", canvasSize / 2, layerThickness + 12);
  drawLabel(borderBottom, "-", canvasSize / 2, canvasSize - layerThickness - 4);
  drawLabel(borderLeft, "-", layerThickness + 12, canvasSize / 2, true);
  drawLabel(borderRight, "-", canvasSize - layerThickness - 12, canvasSize / 2, true);

  // Padding labels
  drawLabel(paddingTop, "-", canvasSize / 2, layerThickness * 2 + 12);
  drawLabel(paddingBottom, "-", canvasSize / 2, canvasSize - layerThickness * 2 - 4);
  drawLabel(paddingLeft, "-", layerThickness * 2 + 12, canvasSize / 2, true);
  drawLabel(paddingRight, "-", canvasSize - layerThickness * 2 - 12, canvasSize / 2, true);

  // Content labels
  drawLabel(width, "-", canvasSize / 2, canvasSize / 2);
  drawLabel(height, "-", canvasSize / 2 + 40, canvasSize / 2, true);
};

export const applyClickedEffect = (e) => {
  const el = e.currentTarget;
  el.classList.add('clicked');
  setTimeout(() => el.classList.remove('clicked'), 150);
};

export const handleClickColor = (color, e) => {
  navigator.clipboard.writeText(color);
  applyClickedEffect(e);
};

export const handleHideShowBtn = (bool, callback, setHidePopup) => {
  setHidePopup(bool);
  if (callback) callback();
};

export const getScrollableParent = (el) => {
  let parent = el.parentElement;

  while (parent) {
    const style = window.getComputedStyle(parent);

    if (
      (style.overflowY === "auto" || style.overflowY === "scroll") ||
      (style.overflowX === "auto" || style.overflowX === "scroll")
    ) {
      return parent;
    }

    parent = parent.parentElement;
  }

  return window;
};

export const updateClickedHighlight = (clickedElementRef, highlightedElementBoxRef) => {
  if (!clickedElementRef.current) return;
  const rect = clickedElementRef.current.getBoundingClientRect();

  const box = highlightedElementBoxRef.current;
  box.style.width = rect.width + "px";
  box.style.height = rect.height + "px";
  box.style.top = rect.top + "px";
  box.style.left = rect.left + "px";
  box.style.display = "flex";
};

export const allowDrop = (e) => {
  e.preventDefault();
};

export const handleDrop = (e, clickedElementRef) => {
  e.preventDefault();

  const file = e.dataTransfer.files?.[0];
  if (!file) return;

  if (!file.type.startsWith("image/")) return;

  const reader = new FileReader();
  reader.onload = (ev) => {
    clickedElementRef.current.src = ev.target.result;
  };
  reader.readAsDataURL(file);
};