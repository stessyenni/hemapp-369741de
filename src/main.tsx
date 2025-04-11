
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the root element safely
const rootElement = document.getElementById("root");

// Ensure the element exists before rendering
if (rootElement) {
  createRoot(rootElement).render(<App />);
} else {
  console.error("Root element not found. Cannot mount React application.");
}
