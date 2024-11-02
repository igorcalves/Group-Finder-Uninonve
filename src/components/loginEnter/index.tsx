import PrimaryButton from '../button/primaryButton';
import PrimaryInput from '../input';
import React from 'react';
import { login } from '../../services/firebase';
import PasswordInput from '../input/passwordInput.tsx';
import { isValidEmail, isValidPassword } from '../../utils/inputValidator';
import { BeatLoader } from 'react-spinners';

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
    const [loading, setLoading] = React.useState(false);
    const handleLongin = () => {
        setLoading(true);
        login(email, password, () => setCurrentPage('home'), setLoading);
    };

    return (
        <>
            <h1>Entrar</h1>
            <PrimaryInput
                placeholder="Digite seu email"
                setContent={setEmail}
                hasError={!isValidEmail(email)}
                label="Email"
            />
            <PasswordInput
                placeholder="Digite sua senha"
                setContent={setPassword}
                hasError={!isValidPassword(password)}
                label="Senha"
            />
            <div className="create-count-container">
                <p
                    className="forgot-password"
                    onClick={() => setCurrentSate('forgot-password')}
                >
                    Esqueci minha senha
                </p>
            </div>
            <div className="btn-container ">
                <div className="btn-container">
                    <PrimaryButton
                        widthP="315px"
                        onClick={handleLongin}
                        disabled={
                            email === '' ||
                            password === '' ||
                            !isValidEmail(email) ||
                            !isValidPassword(password)
                        }
                        colorText="#fff"
                    >
                        {loading ? (
                            <BeatLoader color="#fff" size={6} />
                        ) : (
                            'Entrar'
                        )}
                    </PrimaryButton>
                    <PrimaryButton
                        widthP="315px"
                        onClick={() => setCurrentPage('groups')}
                        colorText="#fff"
                        colorP="#006d9b"
                    >
                        Ver grupos
                    </PrimaryButton>
                </div>
                <div className="forgot-count-container">
                    <p>
                        Não possui uma conta?{' '}
                        <strong
                            onClick={() => setCurrentSate('signUp')}
                            style={{
                                cursor: 'pointer',
                            }}
                        >
                            Cadastre-se
                        </strong>
                    </p>{' '}
                </div>
            </div>
        </>
    );
};

export default LoginEnter;
