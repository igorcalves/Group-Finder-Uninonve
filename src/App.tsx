import React from 'react';
import { GlobalProvider, useGlobalContext } from './context';
import Home from './pages/home';
import Login from './pages/login';

const AppContent: React.FC = () => {
    const { currentPage } = useGlobalContext();

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return <Home />;
            case 'login':
                return <Home />;
            default:
                return <Home />;
        }
    };

    return <div>{renderPage()}</div>;
};

function App() {
    return (
        <GlobalProvider>
            <AppContent />
        </GlobalProvider>
    );
}

export default App;
