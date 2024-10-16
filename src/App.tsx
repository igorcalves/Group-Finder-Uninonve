import React from 'react';
import { GlobalProvider, useGlobalContext } from './context';
import Home from './pages/home';
import Login from './pages/login';
import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
            <ToastContainer
                position="top-left"
                autoClose={5000}
                hideProgressBar={false}
                newestOnTop={false}
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover
            />
        </GlobalProvider>
    );
}

export default App;
