import React from 'react';
import ReactDOM from 'react-dom/client';
import App from './App';
import './styles.css'; // Importe o arquivo CSS global

const rootElement = document.getElementById('root');

if (rootElement) {
    const root = ReactDOM.createRoot(rootElement);
    root.render(
        <App />
    );
} else {
    console.error("Elemento 'root' não encontrado");
}