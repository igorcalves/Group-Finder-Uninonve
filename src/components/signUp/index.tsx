import React from 'react';
import PrimaryInput from '../input';
import './styles.css';
import PrimaryButton from '../button/primaryButton';
interface SignUpProps {
    setCurrentSate: (state: string) => void;
}

const SignUp: React.FC<SignUpProps> = ({ setCurrentSate }) => {
    return (
        <div className="sign-up-body">
            <PrimaryInput
                placeholder="Digite seu nome"
                setContent={() => {}}
                label="Nome"
            />
            <PrimaryInput
                placeholder="Digite seu email"
                setContent={() => {}}
                label="Email"
            />
            <PrimaryInput
                placeholder="Digite seu telefone"
                setContent={() => {}}
                label="Telefone"
            />
            <PrimaryInput
                placeholder="Digite sua palavra-chave"
                setContent={() => {}}
                label="Palavra-chave"
            />
            <PrimaryInput
                placeholder="Digite sua Senha"
                setContent={() => {}}
                label="Senha"
            />
            <PrimaryInput
                placeholder="Confirme sua senha"
                setContent={() => {}}
                label="Confirme sua senha"
            />
            <PrimaryButton
                widthP="290px"
                onClick={() => setCurrentSate('login-enter')}
            >
                Cancelar
            </PrimaryButton>
            <PrimaryButton
                widthP="290px"
                onClick={() => setCurrentSate('login-enter')}
            >
                Cadastrar
            </PrimaryButton>
        </div>
    );
};

export default SignUp;
