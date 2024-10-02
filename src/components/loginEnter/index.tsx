import PrimaryButton from '../button/primaryButton';
import PrimaryInput from '../input';
import React from 'react';
interface LoginEnterProps {
    setCurrentPage: (page: string) => void;
    setCurrentSate: (state: string) => void;
}

const LoginEnter: React.FC<LoginEnterProps> = ({
    setCurrentPage,
    setCurrentSate,
}) => {
    return (
        <>
            <h1>Entrar</h1>
            <PrimaryInput
                placeholder="Digite seu email"
                setContent={() => {}}
                widthP="290px"
                label="Email"
            />
            <PrimaryInput
                placeholder="Digite sua senha"
                setContent={() => {}}
                widthP="290px"
                label="Senha"
            />
            <div className="create-count-container">
                <a onClick={() => setCurrentSate('forgot-password')}>
                    Esqueci minha senha
                </a>
            </div>
            <div className="btn-container ">
                <PrimaryButton
                    widthP="315px"
                    onClick={() => setCurrentPage('home')}
                >
                    Entrar
                </PrimaryButton>
                <div className="forgot-count-container">
                    <p>
                        Não possui uma conta?{' '}
                        <a onClick={() => setCurrentSate('signUp')}>
                            Cadastre-se
                        </a>{' '}
                    </p>
                </div>
            </div>
        </>
    );
};

export default LoginEnter;
