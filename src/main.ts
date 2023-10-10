import "./style.css";

let growthRate: number = 0;
const employeeRequires: number = 10;

// Increase count by 1 if clcked or auto increase and update display with correct count
function updateCount(currentTime: number) {
  if (!startTime) {
    startTime = currentTime;
  }
  const elapsed: number = currentTime! - startTime!; // ms
  count = (elapsed / 1000) * growthRate + clicks; // (seconds * rate) + clicks

  countDisplay.innerText = `You have delivered ${Math.floor(count)} pizzas!`;
  requestAnimationFrame(updateCount);

  //disable button if not enough credits
  employeeButton.disabled = count < employeeRequires;
}

// Top level
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Pizza Party";
document.title = gameName;

// Game Title
const header: HTMLHeadElement = document.createElement("h1");
header.innerHTML = gameName;

// Create pizza button
const pizzaButton: HTMLButtonElement = document.createElement("button");
pizzaButton.textContent = "🍕";
// Create upgrade button
const employeeButton: HTMLButtonElement = document.createElement("button");
employeeButton.textContent = "Hire an employee 🛵";

// Count Display
let count: number = 0;
const countDisplay: HTMLDivElement = document.createElement("div");
countDisplay.innerText = `You have delivered ${count} pizzas!`;

// count + 1 whenever button is clicked
let clicks: number = 0;
pizzaButton.addEventListener("click", () => {
  clicks++;
  updateCount(performance.now());
});

employeeButton.addEventListener("click", () => {
  clicks -= employeeRequires;
  growthRate++;
  updateCount(performance.now());
});

// Add elements to app
app.append(header, pizzaButton, countDisplay, employeeButton);

// start time and animation
let startTime: number | undefined;
requestAnimationFrame(updateCount);
