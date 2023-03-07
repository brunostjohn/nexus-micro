const { createCanvas } = require("@napi-rs/canvas");
const fs = require("fs");
const path = require("path");

let config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json")));

const width = 640;
const height = 48;

function addZero(i) {
  if (i < 10) {
    i = "0" + i;
  }
  return i;
}

const canvas = createCanvas(width, height);
const context = canvas.getContext("2d");

function renderFrame() {
  context.clearRect(0, 0, 640, 48);
  context.fillStyle = config.backgroundColour;
  context.fillRect(0, 0, width, height);
  const today = new Date();
  const time =
    addZero(today.getHours()) +
    ":" +
    addZero(today.getMinutes()) +
    ":" +
    addZero(today.getSeconds());
  context.font = "bold 10pt Menlo";
  context.textAlign = "center";
  context.fillStyle = config.textColour;
  context.textBaseline = "middle";
  context.fillText(time, 320, 24);
  return canvas.toBuffer("image/bmp", 100);
}

function renderPreview() {
  reloadConfig();
  return renderFrame();
}

function reloadConfig() {
  config = JSON.parse(fs.readFileSync(path.join(__dirname, "config.json")));
}

module.exports = {
  renderFrame,
  renderPreview,
  info: {
    title: "Clock",
    description: "Displays the current time.",
    preview: renderPreview(),
    hasConfig: true,
    controllableParameters: {
      backgroundColour: {
        type: "colour",
        title: "Background Colour",
        defaultValue: "#1862d9",
      },
      textColour: {
        type: "colour",
        title: "Text Colour",
        defaultValue: "#d318d9",
      },
    },
  },
};
