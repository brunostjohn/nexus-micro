// this is an experiment please dont expect it to function correctly
const path = require("path");
const { Worker } = require("worker_threads");
const fs = require("fs");

console.log("Attempting to start rendering...");

let worker = new Worker(path.join(__dirname, "libraries", "renderer.js"), {
  workerData: {
    renderPath: path.join(__dirname, "theme", "theme.js"),
    fps: 25,
  },
});
worker.postMessage("start");
