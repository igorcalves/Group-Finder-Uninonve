import React, { useState } from 'react';
import { User } from '../../../domain/user';
import './styles.css';
import CloseBtn from '@mui/icons-material/Close';
import TextFieldInput from '../../input/TextAreaInput';
import PrimaryButton from '../../button/primaryButton';
import PrimaryInput from '../../input';
import { BeatLoader } from 'react-spinners';
import { removeMember } from '../../../services/firebase';
import { Group } from '../../../domain/group';
import { useGlobalContext } from '../../../context';

interface PerfilUserModalProps {
    user: User;
    group: Group | undefined;
    onClose: () => void;
}

const PerfilUserModal: React.FC<PerfilUserModalProps> = ({
    user,
    onClose,
    group,
}) => {
    const [comment, setComment] = useState('');
    const [edit, setEdit] = useState(false);
    const [loading, setLoading] = useState(false);
    const { groups, setGroups } = useGlobalContext();

    const handleRemoveUser = async () => {
        setLoading(true);
        if (!group) return;
        group.members = group.members?.filter((m) => m.email !== user.email);

        await removeMember(group);

        const updatedGroups = groups.map((g) =>
            g.id === group.id ? { ...g, members: group.members } : g
        );

        setGroups(updatedGroups);
        setLoading(false);
        onClose();
    };

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
                            onClick={handleRemoveUser}
                        >
                            {!loading ? (
                                'Remover do grupo'
                            ) : (
                                <BeatLoader color="#fff" size={6} />
                            )}
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
