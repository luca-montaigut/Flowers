/** @type {HTMLCanvasElement} */
const form = document.querySelector("form");
const canvas = document.getElementById("canvas1");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth / 1.2;
canvas.height = window.innerHeight;

ctx.globalCompositeOperation = "destination-over";

function drawFlower(number, hue, angle, scale) {
  let radius = scale * Math.sqrt(number);
  let positionX = radius * Math.sin(angle * number) + canvas.width / 2;
  let positionY = radius * Math.cos(angle * number) + canvas.height / 2;

  ctx.fillStyle = `hsl(${hue}, 100%, 50%)`;
  ctx.strokeStyle = "black";
  ctx.lineWidth = 5;
  ctx.beginPath();
  ctx.arc(positionX, positionY, number, 0, Math.PI * 2);
  ctx.closePath();
  ctx.fill();
  ctx.stroke();
}

// requestID has to be global for stop the animation
let requestID;
function runAnimation(angle, step, scale, limit) {
  ctx.clearRect(0, 0, canvas.width, canvas.height);
  let hue = Math.random() * 360;
  let number = 0;
  if (requestID) cancelAnimationFrame(requestID);
  function animate() {
    drawFlower(number, hue, angle, scale);
    number += step;
    hue += 0.5;
    if (number > limit) return;
    requestID = requestAnimationFrame(animate);
  }
  animate();
}

form.addEventListener("submit", (e) => {
  e.preventDefault();
  const [angle, step, scale, limit] = e.target.elements;
  const values = [angle, step, scale, limit].map((el) => parseFloat(el.value));
  runAnimation(...values);
});

// Easter egg
const toastBox = document.getElementById("toast-box");
const lazyrabbit = document.getElementById("lazyrabbit");

function setRandomFlower() {
  const [angle, step, scale, limit] = form.elements;
  angle.value = (Math.random() * (0.1 - 10) + 10).toFixed(1);
  step.value = Math.floor(Math.random() * 10) + 1;
  scale.value = Math.floor(Math.random() * (15 - 5)) + 5;
  limit.value = Math.floor(Math.random() * (350 - 150)) + 150;
  const values = [angle, step, scale, limit].map((el) => parseFloat(el.value));
  runAnimation(...values);
}

const toast = {
  timer: null,

  show: function (message) {
    toastBox.innerText = message;
    toastBox.classList.remove("hidden");

    if (toast.timer != null) {
      clearTimeout(toast.timer);
      toast.timer = null;
    }

    toast.timer = setTimeout(toast.hide, 1500);
  },

  hide: function () {
    toastBox.classList.add("hidden");
    clearTimeout(toast.timer);
    toast.timer = null;
  },
};

lazyrabbit.addEventListener(
  "click",
  () => {
    toast.show("Random Mode unlocked!");
    const draw = document.getElementsByName("draw")[0];
    setTimeout(() => {
      draw.insertAdjacentHTML(
        "afterend",
        "<hr><input type='button' value='Random Mode' name='random'>"
      );
      const random = document.getElementsByName("random")[0];
      random.addEventListener("click", setRandomFlower);
      lazyrabbit.classList.add("hidden");
    }, 1500);
  },
  { once: true }
);
