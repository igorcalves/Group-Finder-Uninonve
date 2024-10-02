import React, { Dispatch, SetStateAction } from 'react';
import './styles.css';
import PrimaryInput from '../../input';
import PrimaryButton from '../../button/primaryButton';
import Close from '@mui/icons-material/Close';
import { User } from '../../../domain/user';

interface AddMemberModalProps {
    setShowModal: (show: boolean) => void;
    members: User[];
    setMembers: Dispatch<SetStateAction<User[]>>;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
    setShowModal,
    members,
    setMembers,
}) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const addNewMember = () => {
        const user: User = {
            name,
            email,
            phone,
        };

        setMembers([...members, user]);
        setShowModal(false);
    };

    return (
        <div className="background-modal">
            <div className="add-modal-container">
                <div className="modal-header">
                    <h1>Adicionar Integrante</h1>
                    <Close
                        className="close-icon"
                        onClick={() => setShowModal(false)}
                    />
                </div>
                <div className="modal-body">
                    <PrimaryInput
                        label="Nome"
                        placeholder="Digite seu nome"
                        setContent={setName}
                    />

                    <PrimaryInput
                        label="Email"
                        placeholder="Digite seu email"
                        setContent={setEmail}
                    />
                    <PrimaryInput
                        label="Telefone"
                        placeholder="Digite seu telefone"
                        setContent={setPhone}
                    />
                    <div className="button-container">
                        <PrimaryButton
                            disabled={
                                name === '' || email === '' || phone === ''
                            }
                            onClick={addNewMember}
                            widthP="300px"
                            colorP="#006d9b"
                        >
                            Adicionar
                        </PrimaryButton>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default AddMemberModal;
