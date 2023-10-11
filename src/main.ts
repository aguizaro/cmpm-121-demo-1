import "./style.css";

let growthRate: number = 0;
const employeeRequires: number = 10;
let startTime: number | undefined;

// Increase count every frame. Count increases `growthRate` units per seond
function updateCount(currentTime: number) {
  if (!startTime) {
    startTime = currentTime;
  }
  const elapsed: number = currentTime! - startTime!; // time elapsed since last frame in ms
  startTime = performance.now(); // capture start of next frame
  count += (elapsed / 1000) * growthRate; // (seconds * rate)

  countDisplay.innerText = `You have delivered ${Math.floor(count)} pizzas!`;
  //disable button if not enough credits
  employeeButton.disabled = count < employeeRequires;

  requestAnimationFrame(updateCount);
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
// Create employee upgrade button
const employeeButton: HTMLButtonElement = document.createElement("button");
employeeButton.textContent = "Hire an employee 🛵";
employeeButton.disabled = true;

// Count Display
let count: number = 0;
const countDisplay: HTMLDivElement = document.createElement("div");
countDisplay.innerText = `You have delivered ${count} pizzas!`;

pizzaButton.addEventListener("click", () => {
  count++;
  countDisplay.innerText = `You have delivered ${Math.floor(count)} pizzas!`;
  //enable button if enough credits
  employeeButton.disabled = count < employeeRequires;
});

employeeButton.addEventListener("click", () => {
  count -= employeeRequires;
  growthRate++;
  if (growthRate === 1) {
    // start auto-count animaiton when button is clicked for the first time
    requestAnimationFrame(updateCount);
  }
});

// Add elements to app
app.append(header, pizzaButton, countDisplay, employeeButton);
