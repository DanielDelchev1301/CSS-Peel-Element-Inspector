# Design Comparator Browser Extension

A Chrome/Edge browser extension that helps front‑end developers and designers quickly inspect any element on a webpage and instantly visualize its CSS box model, styles, colors, typography and more.

Below is the full documentation of the extension, its features, keyboard shortcuts, and usage instructions.

---

## 🚀 Features

### 1. **Element Highlight on Hover**

When the cursor hovers over webpage elements, the extension draws a highlight box around the element.

**Purpose:** Helps identify layout differences between design and implementation.

Works correctly even with:

* Scrollable parents
* Deep nested DOM

---

### 2. **Element Selection Mode**

Click any element on the page to permanently highlight it.

**Selected Element Features:**

* Persistent highlight even while scrolling
* Display element info (tag, classes, dimensions)

---

### 3. **Assets Panel**

Extract all assets (images, SVGs) from the current page and allow users to download them directly.

---

### 4. **Palette Viewer**

Displays all unique colors found on the page. Users can click to copy colors to the clipboard.

---

### 5. **Typography Inspector**

Lists all unique fonts and typographic styles on the page. Users can copy any style for reuse.

---

### 6. **Element Manipulation UI**

For the currently selected element, users can adjust styles (size, color, spacing and more) via the extension UI, not just keyboard shortcuts.

---

### 6. **Color Picker Tool**

A live color picker that allows selecting a color from anywhere on the page and updating the UI preview in real-time.

---

### 7. **Drop-to-Replace (Image Swapping)**

When an image element is selected, you can drag & drop a new image **directly onto it**.

The selected `<img>` updates its `src` to the dropped file.

Great for quickly comparing updated asset designs.

---

### 8. **Upload & Overlay Design Mockup**

You can upload an image (PNG/JPEG) of a design mockup. The extension places it as a semi‑transparent overlay on top of the current webpage.

---

### 9. **Keyboard-Driven CSS Manipulation**

The extension allows adjusting CSS of the selected element using **keyboard shortcuts**.

This helps test spacing, sizing, colors, etc., without touching the code.


## 🎹 Keyboard Shortcuts

### **1. Font Size Adjustment**

```
Shift + F → Activate font-size mode
↑   Increase font size
↓   Decrease font size
```

### **2. Color Adjustment (HSL-based)**

The extension converts the element's current color into HSL so you can modify individual channels.

#### **Lightness Adjustment**

```
Shift + L → Activate Lightness mode (L)
↑   Increase lightness
↓   Decrease lightness
```

#### **Hue Adjustment**

```
Shift + H → Activate Hue mode (H)
↑   Rotate hue forward
↓   Rotate hue backward
```

#### **Saturation Adjustment**

```
Shift + S → Activate Saturation mode (S)
↑   Increase saturation
↓   Decrease saturation
```

### **3. Margin Adjustment**

```
Shift + M → Activate margin mode
↑   Increase margin
↓   Decrease margin
```

### **4. Border width Adjustment (if any border)**

```
Shift + B → Activate border width mode
↑   Increase border width
↓   Decrease border with
```

### **5. Padding Adjustment**

```
Shift + P → Activate padding mode
↑   Increase padding
↓   Decrease padding
```

### **6. Width Adjustment**

```
Shift + W → Activate width mode
↑   Increase width
↓   Decrease width
```

### **7. Height Adjustment**

```
Shift + E → Activate height mode
↑   Increase height
↓   Decrease height
```

---

## 🧠 Technical Overview

### Shadow DOM Usage

The extension injects a root React app inside a Shadow DOM to avoid CSS conflicts with the target website.

### Highlight Rendering

Each highlight box is rendered **inside the Shadow DOM**, but its position calculations use:

* `getBoundingClientRect()`
* Scroll offsets of every scrollable parent

### Scrollable Parent Detection

The extension automatically finds the closest scrollable parent using computed styles:

```js
overflow: auto;
overflow: scroll;
```

### Drag & Drop Zone

Implemented with native HTML drag events — no external libraries.

### Image Drop on Element

Each selected element (if **img**) receives a dynamically attached `ondrop` & `ondragover` listener.

---

## 📦 Installation

[CSS PEEK: Element Inspector](https://chromewebstore.google.com/detail/css-peek-element-inspecto/kfmdddceeniapmonignkaflhpidamhig)

---

## 🙌 Contributing

Pull requests are welcome.


