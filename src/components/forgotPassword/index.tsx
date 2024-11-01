import React, { useState } from 'react';
import PrimaryInput from '../input';
import PrimaryButton from '../button/primaryButton';
import './styles.css';
import { resetPassword } from '../../services/firebase';
import { isValidEmail } from '../../utils/inputValidator';

interface FortgotPasswordProps {
    setCurrentSate: (state: string) => void;
}

const FortgotPassword: React.FC<FortgotPasswordProps> = ({
    setCurrentSate,
}) => {
    const [email, setEmail] = useState('');
    function handleResetPassword() {
        resetPassword(email, () => setCurrentSate('login-enter'));
    }

    return (
        <div className="forgot-password-container">
            <h1>Esqueci a senha</h1>
            <PrimaryInput
                placeholder="Email"
                setContent={setEmail}
                hasError={!isValidEmail(email)}
                label="Email"
            />
            <div className="forgot-password-btn-container">
                <PrimaryButton
                    widthP="295px"
                    onClick={() => {
                        setCurrentSate('login-enter');
                    }}
                >
                    Cancelar
                </PrimaryButton>
                <PrimaryButton
                    widthP="295px"
                    onClick={handleResetPassword}
                    disabled={!isValidEmail(email) || email === ''}
                >
                    Enviar
                </PrimaryButton>
            </div>
        </div>
    );
};

export default FortgotPassword;
