import "./style.css";

const app: HTMLDivElement = document.querySelector("#app")!;

const gameName = "Pizza Party";

document.title = gameName;

const header = document.createElement("h1");
header.innerHTML = gameName;

const button = document.createElement("button");
button.textContent = "🍕";

app.append(header, button);
