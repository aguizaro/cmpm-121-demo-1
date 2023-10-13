import "./style.css";

class Item {
  text: string;
  cost: number;
  growthRate: number;
  button: HTMLButtonElement;
  count: number; //number of times this item is purchased
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
      ` Cost: ${this.cost.toFixed(2)}p - - Rate: +${this.growthRate}pps`;
    this.count = 0;
    this.displayCount = displayCount;
    this.displayCount.innerText = `Count: ${this.count}`;
    this.makeClickable();
  }

  purchase() {
    this.count++; //number this items purchased
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
  availableItems.forEach((element) => {
    element.button.disabled = count < element.cost;
    element.displayCount.innerText = `Count: ${element.count}`;
  });
  countDisplay.innerText = `You have delivered ${Math.floor(count)} pizzas!`;
  rateDisplay.innerText = `Current Rate: ${totalGrowthRate.toFixed(1)} pps`;
}

// Global vars
let totalGrowthRate = 0;
let startTime: number | undefined;
let animationActive = false;
const costGrowthRate = 1.15;

// Top level
const app: HTMLDivElement = document.querySelector("#app")!;
const gameName = "Pizza Party";
document.title = gameName;

// Game Title
const header: HTMLHeadElement = document.createElement("h1");
header.innerHTML = gameName;
// Description
const descript: HTMLHeadElement = document.createElement("h2");
descript.innerHTML = "Yeah sure you can pay me in pizza!";
descript.classList.add("description");

// Create pizza button
const pizzaButton: HTMLButtonElement = document.createElement("button");
pizzaButton.textContent = "🍕";
pizzaButton.classList.add("pizza-button");

// List of Items / items in this game
const availableItems: Item[] = [
  // Create employee Item
  new Item(
    "🛵 Hire a new employee 🧑🏽‍🍳 - - ",
    10,
    0.1,
    document.createElement("button"),
    document.createElement("div"),
  ),
  // Create oven Item
  new Item(
    "🆕 Install new Industrial Oven ♨️ - - ",
    100,
    2,
    document.createElement("button"),
    document.createElement("div"),
  ),
  // Create chain Item
  new Item(
    " 🛖 Open new pizza location 🏭 - - ",
    1000,
    50,
    document.createElement("button"),
    document.createElement("div"),
  ),
  new Item(
    " 🤖 Build super pizza robot chef 👩🏽‍🍳 - - ",
    10000,
    100,
    document.createElement("button"),
    document.createElement("div"),
  ),
  new Item(
    " 🚁 Buy helicopter for faster delivery 👨🏾‍✈️ - - ",
    100000,
    500,
    document.createElement("button"),
    document.createElement("div"),
  ),
];

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
app.append(header, descript, countDisplay, rateDisplay, pizzaButton);
// Add all items / upgrades to the app
availableItems.forEach((element) => {
  app.append(element.button, element.displayCount);
});
