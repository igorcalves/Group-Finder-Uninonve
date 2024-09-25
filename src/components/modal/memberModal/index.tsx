import React, { Dispatch, SetStateAction } from 'react';
import './styles.css';
import { User } from '../../../domain/user';
import PrimaryButton from '../../button/primaryButton';
import CardUser from '../../cardUser';

interface MemberModalProps {
    setShowModal: Dispatch<SetStateAction<boolean>>;
    members: User[];
}

const MemberModal: React.FC<MemberModalProps> = ({ setShowModal, members }) => {
    return (
        <div className="background-modal">
            <div className="member-modal-contaner">
                <h1>Membros</h1>
                <div className="members-container">
                    {members.map((member, index) => (
                        <CardUser key={index} user={member} />
                    ))}
                </div>
                <PrimaryButton onClick={() => setShowModal(false)}>
                    Fechar
                </PrimaryButton>
            </div>
        </div>
    );
};

export default MemberModal;
