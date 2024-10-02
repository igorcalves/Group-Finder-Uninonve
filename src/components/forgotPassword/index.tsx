import React from 'react';
import PrimaryInput from '../input';
import PrimaryButton from '../button/primaryButton';
import './styles.css';
interface FortgotPasswordProps {
    setCurrentSate: (state: string) => void;
}

const FortgotPassword: React.FC<FortgotPasswordProps> = ({
    setCurrentSate,
}) => {
    return (
        <div className="forgot-password-container">
            <h1>Esqueci a senha</h1>
            <PrimaryInput
                placeholder="Email"
                setContent={() => {}}
                label="Email"
            />
            <div className="forgot-password-btn-container">
                <PrimaryButton
                    widthP="295px"
                    onClick={() => setCurrentSate('login-enter')}
                >
                    voltar
                </PrimaryButton>
                <PrimaryButton
                    widthP="295px"
                    onClick={() => setCurrentSate('login-enter')}
                >
                    Enviar
                </PrimaryButton>
            </div>
        </div>
    );
};

export default FortgotPassword;
