import React, { useState, useEffect } from 'react';
import PrimaryInput from '../input';
import './styles.css';
import PrimaryButton from '../button/primaryButton';
import PasswordInput from '../input/passwordInput.tsx';
import { Register } from '../../domain/register';
import { createAccount } from '../../services/firebase';
import { toast } from 'react-toastify';
import { isValidEmail, isValidPassword } from '../../utils/inputValidator';
import { BeatLoader } from 'react-spinners';

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
    const [loading, setLoading] = useState(false);

    function handleSummit() {
        setLoading(true);
        if (password === passwordConfirm) {
            createAccount(
                {
                    name,
                    email,
                    phone,
                    keyword,
                    password,
                } as Register,
                () => setCurrentSate('login-enter'),
                setLoading
            );
        } else {
            toast.error('As senhas não são iguais');
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
                hasError={!isValidEmail(email)}
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
                hasError={!isValidPassword(password)}
                label="Senha"
            />
            <PasswordInput
                placeholder="Confirme sua senha"
                setContent={setPasswordConfirm}
                label="Confirme a Senha"
                hasError={
                    password !== passwordConfirm || !isValidPassword(password)
                }
                errorMessage={
                    password !== passwordConfirm
                        ? 'As senhas não são iguais'
                        : 'Campo inválido: a senha deverá ter pelo menos 6 caracteres'
                }
            />
            <PrimaryButton
                widthP="290px"
                onClick={() => setCurrentSate('login-enter')}
            >
                Cancelar
            </PrimaryButton>
            <PrimaryButton
                widthP="290px"
                onClick={handleSummit}
                disabled={
                    name === '' ||
                    email === '' ||
                    phone === '' ||
                    keyword === '' ||
                    password === '' ||
                    passwordConfirm === '' ||
                    !isValidEmail(email) ||
                    !isValidPassword(password) ||
                    password !== passwordConfirm
                }
            >
                {loading ? <BeatLoader color="#fff" size={6} /> : 'Cadastrar'}
            </PrimaryButton>
        </div>
    );
};

export default SignUp;
