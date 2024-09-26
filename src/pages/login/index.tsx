import React from 'react';
import './styles.css';
import PrimaryInput from '../../components/input';
import PrimaryButton from '../../components/button/primaryButton';
import sapiens from '../../assets/images/sapiens.png';
import { useGlobalContext } from '../../context';
const Login: React.FC = () => {
    const { setCurrentPage } = useGlobalContext();
    return (
        <div className="login-container">
            <img
                src={sapiens}
                className="sapiens-image"
                alt="Sapiens background"
            ></img>

            <div className="container-login">
                <div className="components-container">
                    <div className="container-right">
                        <h1>Entrar</h1>
                        <PrimaryInput
                            placeholder="Email"
                            setContent={() => {}}
                        />
                        <PrimaryInput
                            placeholder="Senha"
                            setContent={() => {}}
                        />
                        <div className="btn-container ">
                            <PrimaryButton
                                widthP="290px"
                                onClick={() => setCurrentPage('home')}
                            >
                                Entrar
                            </PrimaryButton>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
