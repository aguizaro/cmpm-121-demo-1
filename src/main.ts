import "./style.css";

/* Increase count by 1 and update display with correct count*/
function updateCount() {
  count++;
  countDisplay.innerText = `You have eaten ${count} pizzas!`;
}

const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Pizza Party";
document.title = gameName;

// Game Title
const header: HTMLHeadElement = document.createElement("h1");
header.innerHTML = gameName;

// Button
const button: HTMLButtonElement = document.createElement("button");
button.textContent = "🍕";

let count: number = 0;

// Count Display
const countDisplay: HTMLDivElement = document.createElement("div");
countDisplay.innerText = `You have eaten ${count} pizzas!`;

// Increase count every sec + whenever button is clicked
button.addEventListener("click", updateCount);
setInterval(updateCount, 1000);

// Add elements to app
app.append(header, button, countDisplay);
