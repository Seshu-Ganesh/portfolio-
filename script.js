const canvas = document.getElementById("animationCanvas");
const context = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

const frameCount = 240;
const currentFrame = (index) => 
  `frames/ezgif-frame-${String(index).padStart(3, '0')}.jpg`;

const images = [];
let animationFrame = 0;

// Preload images
for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
    images.push(img);
}

// Draw first frame when loaded
images[0].onload = function () {
    context.drawImage(images[0], 0, 0, canvas.width, canvas.height);
};

window.addEventListener("scroll", () => {
    const scrollTop = document.documentElement.scrollTop;
    const maxScrollTop = document.documentElement.scrollHeight - window.innerHeight;
    const scrollFraction = scrollTop / maxScrollTop;

    const frameIndex = Math.min(
        frameCount - 1,
        Math.floor(scrollFraction * frameCount)
    );

    if (frameIndex !== animationFrame) {
        animationFrame = frameIndex;
        context.drawImage(images[frameIndex], 0, 0, canvas.width, canvas.height);
    }
});
