import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import './index.css';
import App from './App.jsx';
import { BrowserRouter } from 'react-router-dom';
import ShopContextProvider from './contexts/ShopContexts.jsx';

// ✅ Add this global error logger for debugging
window.onerror = function (msg, url, lineNo, columnNo, error) {
  console.log("🌐 GLOBAL ERROR CAUGHT:");
  console.log({ msg, url, lineNo, columnNo, error });
};

createRoot(document.getElementById('root')).render(
  <StrictMode>
    <BrowserRouter>
      <ShopContextProvider>
        <App />
      </ShopContextProvider>
    </BrowserRouter>
  </StrictMode>
);
