/** @type {HTMLCanvasElement} */
const form = document.querySelector("form");
const angle = document.getElementById("angle");
const step = document.getElementById("step");
const scale = document.getElementById("scale");
const limit = document.getElementById("limit");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth / 1.2;
canvas.height = window.innerHeight;

ctx.globalCompositeOperation = "destination-over";

let hue = Math.random() * 360;
let number = 0;

function drawFlower(flowerAngle, flowerScale, flowerStep) {
  let angle = number * flowerAngle;
  let radius = flowerScale * Math.sqrt(number);
  let positionX = radius * Math.sin(angle) + canvas.width / 2;
  let positionY = radius * Math.cos(angle) + canvas.height / 2;

  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(positionX, positionY, number, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();

  number += flowerStep;
  hue += 0.5;
}

function animate() {
  const flowerAngle = parseFloat(angle.value);
  const flowerScale = parseInt(scale.value);
  const flowerStep = parseInt(step.value);
  drawFlower(flowerAngle, flowerScale, flowerStep);
  if (number > limit.value) return;
  requestAnimationFrame(animate);
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  number = 0;
  animate();
});
