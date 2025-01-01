import React from 'react';
import ReactDOM from 'react-dom/client';  // Asegúrate de importar desde 'react-dom/client'
import './index.css';
import { BrowserRouter } from 'react-router-dom';
import App from './App';
import 'bootstrap/dist/css/bootstrap.min.css';

const root = ReactDOM.createRoot(document.getElementById('root'));

root.render(
  <BrowserRouter>  {/* Asegúrate de envolver App con BrowserRouter */}
    <App />
  </BrowserRouter>
);
