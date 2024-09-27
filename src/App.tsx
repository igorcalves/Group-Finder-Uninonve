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
                return <Login />;
            default:
                return <Home />;
        }
    };

    return <div className="all">{renderPage()}</div>;
};

function App() {
    return (
        <GlobalProvider>
            <AppContent />
        </GlobalProvider>
    );
}

export default App;
