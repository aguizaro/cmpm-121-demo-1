import "./style.css";

let totalGrowthRate = 0;
let startTime: number | undefined;
let animationActive = false;
const costGrowthRate = 1.15;

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
    element.displayCount.innerText = `Count: ${element.count}`;
  });
  countDisplay.innerText = `You have delivered ${Math.floor(count)} pizzas!`;
  rateDisplay.innerText = `Current Rate: ${totalGrowthRate.toFixed(1)} pps`;
}

class Upgrade {
  text: string;
  cost: number;
  growthRate: number;
  button: HTMLButtonElement;
  count: number; //number of times this upgrade is purchased
  displayCount: HTMLDivElement;

  constructor(
    text: string,
    cost: number,
    growthRate: number,
    button: HTMLButtonElement,
    displayCount: HTMLDivElement,
  ) {
    this.text = text;
    this.cost = cost;
    this.growthRate = growthRate;
    this.button = button;
    this.button.disabled = true;
    this.button.innerText =
      this.text +
      ` Cost: ${this.cost.toFixed(2)}p | Rate: +${this.growthRate}pps`;
    this.count = 0;
    this.displayCount = displayCount;
    this.displayCount.innerText = `Count: ${this.count}`;
    this.makeClickable();
  }

  purchase() {
    this.count++; //number of this purchased
    count -= this.cost; //count of pizzas
    this.cost *= costGrowthRate;
    this.button.innerText =
      this.text +
      ` Cost: ${this.cost.toFixed(2)}p | Rate: +${this.growthRate}pps`;
    totalGrowthRate += this.growthRate;
  }

  makeClickable() {
    this.button.addEventListener("click", () => {
      this.purchase();
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
  "🛵 Hire a new employee 🧑🏽‍🍳.",
  10,
  0.1,
  document.createElement("button"),
  document.createElement("div"),
);
// Create oven upgrade
const oven: Upgrade = new Upgrade(
  "🆕 Install new Industrial Oven ♨️.",
  100,
  2,
  document.createElement("button"),
  document.createElement("div"),
);
// Create chain upgrade
const chain: Upgrade = new Upgrade(
  " 🛖 Open new pizza location 🏭.",
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
  app.append(element.button, element.displayCount);
});
