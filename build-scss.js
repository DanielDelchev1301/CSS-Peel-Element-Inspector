const sass = require("sass");
const fs = require("fs");

const result = sass.compile("src/content/styles/main.scss", { style: "expanded" });
fs.mkdirSync("dist/styles", { recursive: true });
fs.writeFileSync("dist/styles/main.css", result.css);
console.log("SCSS compiled to dist/styles/main.css");