import "./style.css";

let totalGrowthRate: number = 0;
let startTime: number | undefined;
let animationActive = false;

// Increase count every frame. Count increases `growthRate` units per seond
function updateCount(currentTime: number) {
  if (!startTime) {
    startTime = currentTime;
  }
  const elapsed: number = currentTime - startTime; // time elapsed since last frame in ms
  startTime = currentTime; // capture start of next frame
  count += (elapsed / 1000) * totalGrowthRate; // (seconds * rate)
  updateDisplays();
  requestAnimationFrame(updateCount);
}

// enable or disable buttons if enough credits
// update counts/stats on display
function updateDisplays() {
  upgrades.forEach((element) => {
    element.button.disabled = count < element.cost;
    element.displayElement.innerText = `Count: ${element.count}`;
  });
  countDisplay.innerText = `You have delivered ${Math.floor(count)} pizzas!`;
  rateDisplay.innerText = `Current Rate: ${totalGrowthRate.toFixed(1)} pps`;
}

class Upgrade {
  cost: number;
  growthRate: number;
  button: HTMLButtonElement;
  count: number; //number of times this upgrade is purchased
  displayElement: HTMLDivElement;

  constructor(
    text: string,
    cost: number,
    growthRate: number,
    button: HTMLButtonElement,
    displayElement: HTMLDivElement,
  ) {
    this.cost = cost;
    this.growthRate = growthRate;
    this.button = button;
    this.button.disabled = true;
    this.button.innerText = text;
    this.count = 0;
    this.displayElement = displayElement;
    this.displayElement.innerText = `Count: ${this.count}`;
    this.makeClickable();
  }

  purchase() {
    count -= this.cost;
    totalGrowthRate += this.growthRate;
  }

  makeClickable() {
    this.button.addEventListener("click", () => {
      count -= this.cost;
      totalGrowthRate += this.growthRate;
      this.count++;
      updateDisplays();

      if (!animationActive) {
        requestAnimationFrame(updateCount);
        animationActive = true;
      }
    });
  }
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
pizzaButton.classList.add("pizza-button");

// Create employee upgrade
const employee: Upgrade = new Upgrade(
  "🛵 Hire a new employee 🧑🏽‍🍳. Cost: 10p | Rate: +0.1 pps",
  10,
  0.1,
  document.createElement("button"),
  document.createElement("div"),
);
// Create oven upgrade
const oven: Upgrade = new Upgrade(
  "🆕 Install new Industrial Oven ♨️. Cost: 100p | Rate: +2.0 pps",
  100,
  2,
  document.createElement("button"),
  document.createElement("div"),
);
// Create chain upgrade
const chain: Upgrade = new Upgrade(
  " 🛖 Open new pizza location 🏭. Cost: 1000p | Rate: +50.0 pps",
  1000,
  50,
  document.createElement("button"),
  document.createElement("div"),
);

const upgrades: Upgrade[] = [employee, oven, chain];

// Display Stats
let count: number = 0; //Count of pizza's delivered
const countDisplay: HTMLDivElement = document.createElement("div");
countDisplay.classList.add("pizza-count");
countDisplay.innerText = `You have delivered ${count} pizzas!`;
const rateDisplay: HTMLDivElement = document.createElement("div");
rateDisplay.innerText = `Current Rate: ${totalGrowthRate.toFixed(1)} pps`;

//runs every time the pizza button is clicked
pizzaButton.addEventListener("click", () => {
  count++;
  countDisplay.innerText = `You have delivered ${Math.floor(count)} pizzas!`;
  updateDisplays();
});

// Add elements to app
app.append(header, countDisplay, rateDisplay, pizzaButton);
upgrades.forEach((element) => {
  app.append(element.button, element.displayElement);
});
