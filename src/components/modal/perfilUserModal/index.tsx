import React, { useState } from 'react';

import { User } from '../../../domain/user';
import './styles.css';
import CloseBtn from '@mui/icons-material/Close';

import TextFieldInput from '../../input/TextAreaInput';
import PrimaryButton from '../../button/primaryButton';
import PrimaryInput from '../../input';
interface PerfilUserModalProps {
    user: User;
    onClose: () => void;
}

const PerfilUserModal: React.FC<PerfilUserModalProps> = ({ user, onClose }) => {
    const [comment, setComment] = useState('');
    const [edit, setEdit] = useState(false);
    return (
        <div className="background-modal">
            <div className="perfil-modal-container">
                <div className="close-modal-container">
                    <h2 className="perfil-modal-title">Perfil do usuário</h2>
                    <CloseBtn className="close-icon" onClick={onClose} />
                </div>

                <div className="perfil-modal-info">
                    {!edit ? (
                        <p>{user.name}</p>
                    ) : (
                        <PrimaryInput
                            label="Nome"
                            content={user.name}
                            setContent={(content) => {}}
                        />
                    )}
                    {!edit ? (
                        <p>{user.email}</p>
                    ) : (
                        <PrimaryInput
                            label="Email"
                            content={user.email}
                            setContent={(content) => {}}
                        />
                    )}
                    {!edit ? (
                        <p>{user.phone}</p>
                    ) : (
                        <PrimaryInput
                            label="Telefone"
                            content={user.phone}
                            setContent={(content) => {}}
                        />
                    )}
                </div>

                <TextFieldInput
                    label="Comentarios"
                    content={comment}
                    setContent={setComment}
                    disabled={!edit}
                />
                <div className="perfil-modal-buttons-container">
                    <PrimaryButton
                        colorText="white"
                        widthP="200px"
                        onClick={() => {
                            setEdit(!edit);
                        }}
                        colorP={!edit ? '#006d9b' : 'red'}
                    >
                        {!edit ? 'Editar' : 'Cancelar'}
                    </PrimaryButton>
                    {!edit ? (
                        <PrimaryButton
                            colorP="red"
                            colorText="white"
                            onClick={onClose}
                        >
                            Remover do grupo
                        </PrimaryButton>
                    ) : (
                        <PrimaryButton
                            colorText="white"
                            widthP="200px"
                            onClick={onClose}
                            colorP="#006d9b"
                        >
                            Salvar
                        </PrimaryButton>
                    )}
                </div>
            </div>
        </div>
    );
};

export default PerfilUserModal;
