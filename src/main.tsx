import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
// Global styles first, so component styles can override them
import './styles/tokens.css';
import './styles/base.css';
import App from './App';

// Reveal styles hide content only when JS is running, so the page reads fine without it
document.documentElement.classList.add('js');

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>
);
