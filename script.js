// --- SCROLL ANIMATION LOGIC ---
const html = document.documentElement;
const canvas = document.getElementById("hero-lightpass");
const context = canvas.getContext("2d");

const frameCount = 240;
const currentFrame = index => (
  `frames/ezgif-frame-${index.toString().padStart(3, '0')}.jpg`
);

const preloadImages = () => {
  for (let i = 1; i <= frameCount; i++) {
    const img = new Image();
    img.src = currentFrame(i);
  }
};

const img = new Image();
img.src = currentFrame(1);
canvas.width = 1920;
canvas.height = 1080;
img.onload = function() {
  context.drawImage(img, 0, 0);
};

const updateImage = index => {
  img.src = currentFrame(index);
  context.drawImage(img, 0, 0);
}

window.addEventListener('scroll', () => {  
  const scrollTop = html.scrollTop;
  const maxScrollTop = html.scrollHeight - window.innerHeight;
  const scrollFraction = scrollTop / maxScrollTop;
  const frameIndex = Math.min(
    frameCount - 1,
    Math.ceil(scrollFraction * frameCount)
  );
  
  requestAnimationFrame(() => updateImage(frameIndex + 1));
});

preloadImages();

// --- CHATBOT LOGIC ---
const resumeData = `
Context: You are the AI assistant for Seshu Ganesh B.
Details: 
- Education: B.E. ECE at Government College of Engineering, Tirunelveli. CGPA 8.7.
- Projects: Sleep Alert Glasses (1st Prize), Automatic Plant Watering System (Keil), Vehicle Number Plate Detection (OpenCV).
- Skills: C, Python, Microcontrollers, Power BI.
- Goal: Seeking automotive R&D internships.
Strict Rule: Answer ONLY using these details. If asked something else, say "I can only answer questions regarding Seshu's professional background."
`;

async function sendMessage() {
    const inputField = document.getElementById('user-input');
    const history = document.getElementById('chat-history');
    const userMsg = inputField.value;

    if(!userMsg) return;

    history.innerHTML += `<div><b>You:</b> ${userMsg}</div>`;
    inputField.value = '';

    // Mock API Call for Gemini-2.5-Flash
    // Replace URL and Key with your actual endpoint
    try {
        /* const response = await fetch('YOUR_GEMINI_API_ENDPOINT', {
            method: 'POST',
            body: JSON.stringify({
                system_instruction: resumeData,
                prompt: userMsg
            })
        });
        */
        const botReply = "Seshu is an ECE student with a 8.7 CGPA, skilled in C and Embedded systems."; // Placeholder
        history.innerHTML += `<div><b>AI:</b> ${botReply}</div>`;
        history.scrollTop = history.scrollHeight;
    } catch (e) {
        history.innerHTML += `<div><b>Error:</b> Could not connect to AI.</div>`;
    }
}
