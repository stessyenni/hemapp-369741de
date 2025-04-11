
import { createRoot } from 'react-dom/client'
import App from './App.tsx'
import './index.css'

// Get the root element safely
const rootElement = document.getElementById("root");

// Ensure the element exists before rendering
if (rootElement) {
  // Use a deferred rendering to reduce initial memory pressure
  setTimeout(() => {
    createRoot(rootElement).render(<App />);
  }, 0);
} else {
  console.error("Root element not found. Cannot mount React application.");
}
