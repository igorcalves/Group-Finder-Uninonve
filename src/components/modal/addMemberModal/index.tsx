import React, { Dispatch, SetStateAction } from 'react';
import './styles.css';
import PrimaryInput from '../../input';
import PrimaryButton from '../../button/primaryButton';
import Close from '@mui/icons-material/Close';
import { User } from '../../../domain/user';
import { Group } from '../../../domain/group';
import { addMember, addNewNotificationGroup } from '../../../services/firebase';
import {
    isValidEmail,
    isValidPhoneNumber,
} from '../../../utils/inputValidator';
import { GroupNotification } from '../../../domain/notifications';
interface AddMemberModalProps {
    setShowModal: (show: boolean) => void;
    leaderGroup?: Group;
}

const AddMemberModal: React.FC<AddMemberModalProps> = ({
    setShowModal,
    leaderGroup,
}) => {
    const [name, setName] = React.useState('');
    const [email, setEmail] = React.useState('');
    const [phone, setPhone] = React.useState('');

    const addNewMember = async () => {
        const user: User = {
            id: Date.now().toString(),
            name,
            email,
            phone,
        };

        if (leaderGroup) {
            const groupNotifications: GroupNotification = {
                type: 'group',
                id: Date.now().toString(),
                date: new Date().toISOString(),
                description: `${user.name} quer entrar no seu grupo`,
                read: false,
                title: 'Solicitação de entrada',
                user,
            };

            const updatedLeaderGroup = { ...leaderGroup };
            if (updatedLeaderGroup.groupNotifications) {
                updatedLeaderGroup.groupNotifications.push(groupNotifications);
            } else {
                updatedLeaderGroup.groupNotifications = [groupNotifications];
            }

            if (updatedLeaderGroup.members) {
                updatedLeaderGroup.members.push(user);
            } else {
                updatedLeaderGroup.members = [user];
            }

            await addMember(updatedLeaderGroup, user);
            setShowModal(false);
        } else {
            setShowModal(false);
        }
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
                        type="text"
                        placeholder="Digite seu nome"
                        setContent={setName}
                    />

                    <PrimaryInput
                        label="Email"
                        placeholder="Digite seu email"
                        hasError={!isValidEmail(email)}
                        setContent={setEmail}
                    />
                    <PrimaryInput
                        label="Telefone"
                        placeholder="Digite seu telefone"
                        type="phone"
                        hasError={!isValidPhoneNumber(phone)}
                        setContent={setPhone}
                    />
                    <div className="button-container">
                        <PrimaryButton
                            disabled={
                                name === '' ||
                                email === '' ||
                                phone === '' ||
                                !isValidEmail(email) ||
                                !isValidPhoneNumber(phone)
                            }
                            onClick={addNewMember}
                            widthP="300px"
                            colorText="white"
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
