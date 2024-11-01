import React, { useState } from 'react';
import { Group } from '../../domain/group';
import { User } from '../../domain/user';
import './styles.css';
import PrimaryButton from '../button/primaryButton';
import MemberModal from '../modal/memberModal';
import AddMemberModal from '../modal/addMemberModal';
import { Groups } from '@mui/icons-material';
import TextModal from '../modal/textModal';

interface CardGroupProps {
    group: Group;
    onUpdateGroup: (group: Group) => void;
}

export function CardGroup({ group }: CardGroupProps) {
    const [members, setMembers] = useState<User[]>(group.members || []);
    const [showModal, setShowModal] = useState(false);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const [showDescription, setShowDescription] = useState(false);

    function addMember() {
        setShowAddMemberModal(true);
    }

    function truncateDescription(description: string, maxLength: number) {
        if (description.length > maxLength) {
            return description.substring(0, maxLength) + '...';
        }
        return description;
    }
    return (
        <div className="card-container">
            <div className="card-header">
                <h1 title={group.name}>{group.name}</h1>
                <div className="group-container">
                    <Groups />
                    <p>
                        {members.length}/{group.maxMembers}
                    </p>
                </div>
            </div>
            <div className="card-body">
                <div className="discipline-container">
                    <h2>{group.discipline}</h2>
                    <p>{group.date}</p>
                </div>
                <p className="description" title={group.description}>
                    {truncateDescription(group.description, 80)}
                </p>
            </div>
            <div className="card-footer">
                {/* <PrimaryButton
                    onClick={() => setShowModal(true)}
                    disabled={members.length <= 0}
                    widthP="270px"
                    colorP="#01b3ff"
                >
                    Ver membros
                </PrimaryButton> */}
                <PrimaryButton
                    onClick={addMember}
                    disabled={
                        !(members.length < group.maxMembers) ||
                        group.closedGroup
                    }
                    widthP="270px"
                    colorP="#006d9b"
                    colorText="#fff"
                >
                    {group.closedGroup
                        ? ' Grupo fechado'
                        : members.length < group.maxMembers
                        ? 'Solicitar entrada'
                        : 'Lotado'}
                </PrimaryButton>
            </div>
            {showModal && (
                <MemberModal setShowModal={setShowModal} members={members} />
            )}

            {showAddMemberModal && (
                <AddMemberModal
                    setShowModal={setShowAddMemberModal}
                    members={members}
                    setMembers={setMembers}
                    groupId={group.id}
                    leaderGroup={group}
                />
            )}
            {showDescription && (
                <TextModal
                    text={group.description}
                    handleCloseModal={() => setShowDescription(false)}
                />
            )}
        </div>
    );
}

export default CardGroup;
