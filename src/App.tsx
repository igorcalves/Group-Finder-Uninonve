import React from 'react';
import { GlobalProvider, useGlobalContext } from './context';
import Home from './pages/home';
import Login from './pages/login';

const login = () => {
    return <Login />;
};

const home = () => {
    return <Home />;
};

const AppContent: React.FC = () => {
    const { currentPage } = useGlobalContext();

    const renderPage = () => {
        switch (currentPage) {
            case 'home':
                return home();
            case 'login':
                return login();
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
