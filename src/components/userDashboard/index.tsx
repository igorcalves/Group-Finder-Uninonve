import React, { useEffect, useState } from 'react';
import PrimaryInput from '../input';
import './styles.css';
import { User } from '../../domain/user';
import { Group } from '../../domain/group';
import { getGroup } from '../../services/firebase';
import CardUser from '../cardUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import EditIcon from '@mui/icons-material/Edit';
import { Checkbox } from '@mui/material';
import PerfilUserModal from '../modal/perfilUserModal';
import CircularPerfil from '../CircularPerfil';
import AddMemberModal from '../modal/addMemberModal';
interface UserDashboardProps {
    user: User | undefined;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
    const [group, setGroup] = useState<Group>();
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [maxMembers, setMaxMembers] = useState('');
    const [closedGroup, setClosedGroup] = useState(false);
    const [selectedUser, setSelectedUser] = useState<User>();
    const [members, setMembers] = useState<User[]>([]);
    const [showAddMemberModal, setShowAddMemberModal] = useState(false);
    const handleCheckboxChange = () => {
        setClosedGroup(!closedGroup);
    };

    useEffect(() => {
        if (user) {
            setEmail(user.email);
            setName(user.name);
            setPhone(user.phone);
        }

        const id = localStorage.getItem('user');
        if (id) {
            getGroup(id).then((group) => {
                if (group) {
                    setGroup(group);
                    setDescription(group.description);
                    setDiscipline(group.discipline);
                    setMaxMembers(group.maxMembers?.toString());
                    setMembers(group.members?.map((member) => member) || []);
                    setClosedGroup(group.closedGroup);
                }
            });
        }
    }, [user]);

    useEffect(() => {
        if (group) {
            setDescription(group.description);
            setDiscipline(group.discipline);
            setMaxMembers(group.maxMembers?.toString());
            setMembers(group.members?.map((member) => member) || []);
            setClosedGroup(group.closedGroup);
        }
    }, [group]);

    return (
        <div className="dashboard-container">
            <div className="form-user-container">
                <h1 className="form-user-title">Informações do usuário</h1>
                <CircularPerfil name={name} />
                <PrimaryInput
                    content={email}
                    placeholder="email"
                    disabled
                    label="Email"
                    setContent={setEmail}
                />
                <PrimaryInput
                    content={name}
                    placeholder="Nome"
                    label="Nome"
                    disabled
                    setContent={setName}
                />
                <PrimaryInput
                    label="Telefone"
                    placeholder="telefone"
                    content={phone}
                    disabled
                    setContent={setPhone}
                />
            </div>
            <div className="form-groups-container">
                <div className="form-groups-icons">
                    <PersonAddIcon
                        className="add-member-icon"
                        onClick={() => setShowAddMemberModal(true)}
                    />
                    <EditIcon className="edit-group-icon" onClick={() => {}} />
                    <DeleteIcon
                        className="delete-group-icon"
                        onClick={() => {}}
                    />
                </div>
                <div className="form-groups-content">
                    <h2>Informações do grupo</h2>
                    <p>Grupo: {group?.name}</p>
                    <p>Data de criação: {group?.date}</p>
                    <p>Descrição: {description}</p>
                    <p>Disciplina: {discipline}</p>
                    <p>Máximo de membros: {maxMembers}</p>
                    <div className="checkbox-item-dashboard">
                        <Checkbox
                            checked={closedGroup}
                            onChange={handleCheckboxChange}
                            style={{ marginLeft: '-10px' }}
                            disabled
                        />
                        <p>Entrada Somente com convite</p>
                    </div>
                </div>
                <h2>Membros</h2>
                <div className="members-container">
                    {group?.members &&
                        group?.members.map((member) => (
                            <CardUser
                                user={member}
                                key={member.email}
                                openModal={() => setSelectedUser(member)}
                            />
                        ))}
                </div>
            </div>
            {selectedUser && (
                <PerfilUserModal
                    user={selectedUser}
                    onClose={() => setSelectedUser(undefined)}
                />
            )}

            {showAddMemberModal && (
                <AddMemberModal
                    setShowModal={setShowAddMemberModal}
                    groupId={group?.id || ''}
                    members={members || []}
                    leaderGroup={group}
                    setMembers={setMembers}
                />
            )}
        </div>
    );
};

export default UserDashboard;
