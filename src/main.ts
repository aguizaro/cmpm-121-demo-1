import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pizza Party";
document.title = gameName;

const header: HTMLHeadElement = document.createElement("h1");
header.innerHTML = gameName;

const button: HTMLButtonElement = document.createElement("button");
button.textContent = "🍕";

let count: number = 0;
const countDisplay: HTMLDivElement = document.createElement("div");
countDisplay.innerText = `You have eaten ${count} pizzas!`;

button.addEventListener("click", () => {
  count++;
  countDisplay.innerText = `You have eaten ${count} pizzas!`;
});

app.append(header, button, countDisplay);
