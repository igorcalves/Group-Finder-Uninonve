import React, { useState, useEffect } from 'react';
import PrimaryInput from '../input';
import './styles.css';
import PrimaryButton from '../button/primaryButton';
import PasswordInput from '../input/passwordInput.tsx';
import { Register } from '../../domain/register';
import { Timestamp } from 'firebase/firestore';
import { createAccount } from '../../services/firebase';

interface SignUpProps {
    setCurrentSate: (state: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setCurrentSate }) => {
    const [name, setName] = useState('');
    const [email, setEmail] = useState('');
    const [phone, setPhone] = useState('');
    const [keyword, setKeyword] = useState('');
    const [password, setPassword] = useState('');
    const [passwordConfirm, setPasswordConfirm] = useState('');

    function handleSummit() {
        if (password === passwordConfirm) {
            createAccount(
                {
                    name,
                    email,
                    phone,
                    keyword,
                    password,
                } as Register,
                () => setCurrentSate('login-enter')
            );
        } else {
            alert('As senhas não coincidem');
        }
    }

    return (
        <div className="sign-up-body">
            <h1>Cadastro</h1>
            <PrimaryInput
                placeholder="Digite seu nome"
                setContent={setName}
                label="Nome"
            />
            <PrimaryInput
                placeholder="Digite seu email"
                setContent={setEmail}
                label="Email"
            />
            <PrimaryInput
                placeholder="Digite seu telefone"
                setContent={setPhone}
                label="Telefone"
            />
            <PrimaryInput
                placeholder="Digite sua palavra-chave"
                setContent={setKeyword}
                label="Palavra-chave"
            />
            <PasswordInput
                placeholder="Digite sua senha"
                setContent={setPassword}
                label="Senha"
            />
            <PasswordInput
                placeholder="Confirme sua senha"
                setContent={setPasswordConfirm}
                label="Confirme a Senha"
            />
            <PrimaryButton
                widthP="290px"
                onClick={() => setCurrentSate('login-enter')}
            >
                Cancelar
            </PrimaryButton>
            <PrimaryButton widthP="290px" onClick={handleSummit}>
                Cadastrar
            </PrimaryButton>
        </div>
    );
};

export default SignUp;
