import React, { useState } from 'react';
import './styles.css';

import sapiens from '../../assets/images/sapiens.svg';
import { useGlobalContext } from '../../context';
import LoginEnter from '../../components/loginEnter';
import FortgotPassword from '../../components/forgotPassword';
import SignUp from '../../components/signUp';
const Login: React.FC = () => {
    const { setCurrentPage } = useGlobalContext();
    const [currentSate, setCurrentSate] = useState('login');

    const switchState = () => {
        switch (currentSate) {
            case 'forgot-password':
                return <FortgotPassword setCurrentSate={setCurrentSate} />;
            case 'signUp':
                return <SignUp setCurrentSate={setCurrentSate} />;
            default:
                return (
                    <LoginEnter
                        setCurrentSate={setCurrentSate}
                        setCurrentPage={setCurrentPage}
                    />
                );
        }
    };

    return (
        <div className="login-container">
            <img
                src={sapiens}
                className="sapiens-image"
                alt="Sapiens background"
            ></img>

            <div className="container-right">
                <div className="components-container">{switchState()}</div>
            </div>
        </div>
    );
};

export default Login;
