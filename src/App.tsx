import { GlobalProvider } from './context';
import Home from './pages/Home';
import React from 'react';
function App() {
    return (
        <GlobalProvider>
            <Home />
        </GlobalProvider>
    );
}

export default App;
