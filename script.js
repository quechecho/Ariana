"use strict";

const titleElement = document.querySelector(".title");
const buttonsContainer = document.querySelector(".buttons");
const yesButton = document.querySelector(".btn--yes");
const noButton = document.querySelector(".btn--no");
const catImg = document.querySelector(".cat-img");

const MAX_IMAGES = 6;

let play = true;
let noCount = 0;

yesButton.addEventListener("click", handleYesClick);

noButton.addEventListener("click", function () {
  if (play) {
    noCount++;
    const imageIndex = Math.min(noCount, MAX_IMAGES);
    changeImage(imageIndex);
    resizeYesButton();
    updateNoButtonText();
    if (noCount === MAX_IMAGES) {
      play = false;
    }
  }
});

function handleYesClick() {
  titleElement.innerHTML = "YO TAMBIEN TE AMO #JUNTOS X SIEMPRE 🥰";
  buttonsContainer.classList.add("hidden");
  changeImage("yes");
  launchCelebration();
}

function launchCelebration() {
  const duration = 5000;
  const end = Date.now() + duration;

  (function frame() {
    launchConfetti();
    if (Date.now() < end) {
      requestAnimationFrame(frame);
    }
  })();

  for (let i = 0; i < 35; i++) {
    setTimeout(() => createFloatingHeart(), i * 140);
  }
}

function launchConfetti() {
  const colors = ["#f53699","#ff6b9d","#ff4757","#ffa502","#ff6348","#eccc68","#a29bfe","#fd79a8"];
  for (let i = 0; i < 3; i++) {
    const el = document.createElement("div");
    const size = Math.random() * 10 + 6;
    const color = colors[Math.floor(Math.random() * colors.length)];
    const startX = Math.random() * window.innerWidth;
    const drift = (Math.random() - 0.5) * 200;
    const dur = Math.random() * 2 + 2;
    const isRect = Math.random() > 0.5;

    el.style.cssText = `position:fixed;top:-20px;left:${startX}px;width:${isRect?size:size*0.6}px;height:${isRect?size*0.4:size}px;background:${color};border-radius:${isRect?"2px":"50%"};transform:rotate(${Math.random()*360}deg);animation:confetti-fall ${dur}s ease-in forwards;--drift:${drift}px;z-index:9999;pointer-events:none;`;
    document.body.appendChild(el);
    el.addEventListener("animationend", () => el.remove());
  }
}

function createFloatingHeart() {
  const el = document.createElement("div");
  const emojis = ["❤️","💖","💗","💕","💓","🩷"];
  el.innerHTML = emojis[Math.floor(Math.random() * emojis.length)];
  const size = Math.random() * 30 + 20;
  const dur = Math.random() * 3 + 3;
  const sway = (Math.random() - 0.5) * 120;
  const startX = Math.random() * window.innerWidth;

  el.style.cssText = `position:fixed;bottom:-60px;left:${startX}px;font-size:${size}px;animation:heart-rise ${dur}s ease-out forwards;--sway:${sway}px;z-index:9999;pointer-events:none;user-select:none;`;
  document.body.appendChild(el);
  el.addEventListener("animationend", () => el.remove());
}

function resizeYesButton() {
  const computedStyle = window.getComputedStyle(yesButton);
  const fontSize = parseFloat(computedStyle.getPropertyValue("font-size"));
  yesButton.style.fontSize = `${fontSize * 1.6}px`;
}

function generateMessage(noCount) {
  const messages = [
    "No",
    "(No)¡¿Esta seguro?",
    "(No)Ya no me amas entonces",
    "(No)listo pues, dejame entonces :(",
    "(NO)¿ENSERIO MOISES DAVID??",
    "(No)PORQUE SIGUUES DICIENDO QUE NOOOO??",
    "YA DI QUE SI :/",
  ];
  return messages[Math.min(noCount, messages.length - 1)];
}

function changeImage(image) {
  catImg.src = `img/cat-${image}.jpg`;
}

function updateNoButtonText() {
  noButton.innerHTML = generateMessage(noCount);
}
