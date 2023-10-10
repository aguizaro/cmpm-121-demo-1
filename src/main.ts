import "./style.css";

const growthRate: number = 1;

// Increase count by 1 if clcked or auto increase and update display with correct count
function updateCount(currentTime: number) {
  if (!startTime) {
    startTime = currentTime;
  }
  const elapsed: number = currentTime! - startTime!; // ms
  count = (elapsed / 1000) * growthRate + clicks; // (seconds * rate) + clicks

  countDisplay.innerText = `You have eaten ${Math.floor(count)} pizzas!`;
  requestAnimationFrame(updateCount);
}

// Top level
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Pizza Party";
document.title = gameName;

// Game Title
const header: HTMLHeadElement = document.createElement("h1");
header.innerHTML = gameName;

// Create Button
const button: HTMLButtonElement = document.createElement("button");
button.textContent = "🍕";

// Count Display
let count: number = 0;
const countDisplay: HTMLDivElement = document.createElement("div");
countDisplay.innerText = `You have eaten ${count} pizzas!`;

// count + 1 whenever button is clicked
let clicks: number = 0;
button.addEventListener("click", () => {
  clicks++;
  updateCount(performance.now());
});

// Add elements to app
app.append(header, button, countDisplay);

// start time and animation
let startTime: number | undefined;
requestAnimationFrame(updateCount);
