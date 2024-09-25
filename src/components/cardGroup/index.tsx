import React, { useState } from 'react';
import { Group } from '../../domain/group';
import { User } from '../../domain/user';
import './styles.css';
import PrimaryButton from '../button/primaryButton';
import PersonIcon from '@mui/icons-material/Person';
import MemberModal from '../modal/memberModal';
import AddMemberModal from '../modal/addMemberModal';
interface CardGroupProps {
    group: Group;
}

export function CardGroup({ group }: CardGroupProps) {
    const [members, setMembers] = useState<User[]>(group.members || []);
    const [showModal, setShowModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const sizeMax = 5;
    function addMember() {
        setShowAddMemberModal(true);
    }

    return (
        <div className="card-Body">
            <div className="icon-container">
                <div className="icon-click" onClick={() => setShowModal(true)}>
                    <PersonIcon />
                    <p>
                        {members.length}/{sizeMax}
                    </p>
                </div>
            </div>
            <h1>{group.name}</h1>
            <p>{group.description}</p>
            <p>{group.date}</p>
            <p>{group.discipline}</p>
            <p>
                {group.tags.map((tag, index) => (
                    <span key={index}>{tag}</span>
                ))}
            </p>

            <p>{group.owner?.name}</p>
            <p>{group.id}</p>
            <PrimaryButton
                onClick={addMember}
                disabled={!(members.length < sizeMax)}
            >
                {members.length < sizeMax ? 'Adicionar' : 'Lotado'}
            </PrimaryButton>
            {showModal && (
                <MemberModal setShowModal={setShowModal} members={members} />
            )}

            {showAddMemberModal && (
                <AddMemberModal
                    setShowModal={setShowAddMemberModal}
                    members={members}
                    setMembers={setMembers}
                />
            )}
        </div>
    );
}

export default CardGroup;
