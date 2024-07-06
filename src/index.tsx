import ReactDOM from "react-dom/client";
import "./index.css";
import "./tailwind.css";
import App from "./App";

const rootElement: HTMLElement | null = document.getElementById("root");
if (rootElement !== null) {
  const root = ReactDOM.createRoot(rootElement);

  root.render(<App />);
} else {
  console.error("No root element found in index.html");
}
