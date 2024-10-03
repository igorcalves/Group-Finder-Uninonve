import PrimaryButton from '../button/primaryButton';
import PrimaryInput from '../input';
import React from 'react';
import { register, resetPassword, login } from '../../services/firebase';
interface LoginEnterProps {
    setCurrentPage: (page: string) => void;
    setCurrentSate: (state: string) => void;
}

const LoginEnter: React.FC<LoginEnterProps> = ({
    setCurrentPage,
    setCurrentSate,
}) => {
    const [email, setEmail] = React.useState('');
    const [password, setPassword] = React.useState('');
    return (
        <>
            <h1>Entrar</h1>
            <PrimaryInput
                placeholder="Digite seu email"
                setContent={setEmail}
                widthP="290px"
                label="Email"
            />
            <PrimaryInput
                placeholder="Digite sua senha"
                setContent={setPassword}
                widthP="290px"
                label="Senha"
            />
            <div className="create-count-container">
                <a onClick={() => setPassword('igor193@live.com')}>
                    Esqueci minha senha
                </a>
            </div>
            <div className="btn-container ">
                <PrimaryButton
                    widthP="315px"
                    onClick={() =>
                        // login(email, password, () => setCurrentPage('home'))
                        localStorage.setItem('loggedIn', 'true')
                    }
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
