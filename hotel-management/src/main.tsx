import { StrictMode } from 'react';
import { createRoot } from 'react-dom/client';
import App from './router/App';
import React from 'react';

createRoot(document.getElementById('root')!).render(
  <StrictMode>
    <App />
  </StrictMode>,
);
