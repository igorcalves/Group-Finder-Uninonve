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
import PrimaryButton from '../button/primaryButton';
import DeleteModal from '../modal/deleteModal';
import {
    deleteGroup,
    updateGroup,
    updateInRealTimeToDashboard,
} from '../../services/firebase';
import CreateGroup from '../createGroup';
import { toast } from 'react-toastify';
import { BeatLoader } from 'react-spinners';
import { isValidPhoneNumber, isValidEmail } from '../../utils/inputValidator';
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
    const [editGroup, setEditGroup] = useState(false);
    const [groupName, setGroupName] = useState('');
    const [deleteModal, setDeleteModal] = useState(false);
    const [loading, setLoading] = useState(false);
    const [dashBoardLoading, setDashBoardLoading] = useState(false);
    const handleCheckboxChange = () => {
        setClosedGroup(!closedGroup);
    };
    const id = localStorage.getItem('user');

    useEffect(() => {
        setDashBoardLoading(true);
        if (user) {
            setEmail(user.email);
            setName(user.name);
            setPhone(user.phone);
        }

        if (id) {
            getGroup(id).then((group) => {
                if (group) {
                    setGroup(group);
                    setGroupName(group.name);
                    setDescription(group.description);
                    setDiscipline(group.discipline);
                    setMaxMembers(group.maxMembers?.toString());
                    setMembers(group.members?.map((member) => member) || []);
                    setClosedGroup(group.closedGroup);
                }
                setDashBoardLoading(false);
            });

            const unsubscribe = updateInRealTimeToDashboard(setGroup, id);

            return () => {
                unsubscribe();
            };
        }
    }, [user]);

    useEffect(() => {
        if (group) {
            setDescription(group.description);
            setDiscipline(group.discipline);
            setMaxMembers(group.maxMembers?.toString());
            setMembers(group.members?.map((member) => member) || []);
            setClosedGroup(group.closedGroup);
            setGroupName(group.name);
        }
    }, [group]);

    const handleAddMember = () => {
        if (group?.members?.length === group?.maxMembers) {
            toast.error('Grupo cheio');
            return;
        } else {
            setShowAddMemberModal(true);
        }
    };

    return !dashBoardLoading ? (
        <div className="dashboard-container">
            <div className="form-user-container">
                <h1 className="form-user-title">Informações do usuário</h1>
                <CircularPerfil name={name} />
                <PrimaryInput
                    content={email}
                    placeholder="email"
                    disabled={!editGroup}
                    hasError={!isValidEmail(email)}
                    label="Email"
                    setContent={setEmail}
                />
                <PrimaryInput
                    content={name}
                    placeholder="Nome"
                    label="Nome"
                    type="text"
                    disabled={!editGroup}
                    setContent={setName}
                />
                <PrimaryInput
                    label="Telefone"
                    placeholder="telefone"
                    type="phone"
                    hasError={!isValidPhoneNumber(phone)}
                    content={phone}
                    disabled={!editGroup}
                    setContent={setPhone}
                />
            </div>
            {group ? (
                <div className="form-groups-container">
                    <div className="form-groups-icons">
                        <PersonAddIcon
                            className="add-member-icon"
                            onClick={() => handleAddMember()}
                        />
                        <EditIcon
                            className="edit-group-icon"
                            onClick={() => setEditGroup(!editGroup)}
                        />
                        <DeleteIcon
                            className="delete-group-icon"
                            onClick={() => setDeleteModal(true)}
                        />
                    </div>
                    <div className="form-groups-content">
                        {!editGroup ? (
                            <h2>Informações do grupo</h2>
                        ) : (
                            <h2>Editando informações</h2>
                        )}

                        {!editGroup ? (
                            <p>Grupo: {group?.name}</p>
                        ) : (
                            <PrimaryInput
                                label="Nome do grupo"
                                content={groupName}
                                setContent={setGroupName}
                            />
                        )}
                        {editGroup ? null : (
                            <p>Data de criação: {group?.date}</p>
                        )}
                        {editGroup ? (
                            <PrimaryInput
                                label="Descrição"
                                content={description}
                                setContent={setDescription}
                            />
                        ) : (
                            <p>Descrição: {description}</p>
                        )}
                        {editGroup ? (
                            <PrimaryInput
                                label="Disciplina"
                                content={discipline}
                                setContent={setDiscipline}
                                type="text"
                            />
                        ) : (
                            <p>Disciplina: {discipline}</p>
                        )}
                        {!editGroup ? (
                            <p>
                                quantidade de membros: {group?.members?.length}
                            </p>
                        ) : null}
                        {editGroup ? (
                            <PrimaryInput
                                label="Número máximo de membros"
                                content={maxMembers}
                                type="number"
                                setContent={setMaxMembers}
                            />
                        ) : (
                            <p>Número máximo de membros: {maxMembers}</p>
                        )}
                        <div className="checkbox-item-dashboard">
                            <Checkbox
                                checked={closedGroup}
                                onChange={handleCheckboxChange}
                                style={{ marginLeft: '-10px' }}
                                disabled={!editGroup}
                            />
                            <p>Entrada Somente com convite</p>
                        </div>
                    </div>
                    {members && members.length > 0 ? (
                        <>
                            <h2>Membros</h2>
                            <div className="members-header">
                                <p>Nome</p>
                                <p>Telefone</p>
                                <p>Email</p>
                            </div>
                            <div className="members-container">
                                {group?.members &&
                                    group?.members.map((member) => (
                                        <CardUser
                                            user={member}
                                            key={member.email}
                                            openModal={() =>
                                                setSelectedUser(member)
                                            }
                                        />
                                    ))}
                            </div>
                        </>
                    ) : (
                        <div className="no-members">
                            <h2>Sem membros</h2>
                        </div>
                    )}
                    {editGroup ? (
                        <PrimaryButton
                            disabled={
                                loading ||
                                !groupName ||
                                !description ||
                                !discipline ||
                                !maxMembers ||
                                !isValidEmail(email) ||
                                !isValidPhoneNumber(phone)
                            }
                            onClick={() => {
                                if (user && id && group.members) {
                                    if (+maxMembers < group?.members?.length) {
                                        toast.error(
                                            'a quantidade de membros não pode ser menor que a quantidade atual de membros'
                                        );
                                        return;
                                    } else {
                                        updateGroup(
                                            {
                                                ...group,
                                                name: groupName,
                                                description,
                                                discipline,
                                                maxMembers:
                                                    parseInt(maxMembers),
                                                closedGroup,
                                            },
                                            {
                                                ...user,
                                                email,
                                                name,
                                                phone,
                                            },
                                            id
                                        ).then(() => {
                                            setEditGroup(false);
                                            setGroup({
                                                ...group,
                                                name: groupName,
                                                description,
                                                discipline,
                                                maxMembers:
                                                    parseInt(maxMembers),
                                                closedGroup,
                                            });
                                            setLoading(false);
                                        });
                                    }
                                }
                                setLoading(true);
                            }}
                            colorText="white"
                        >
                            {loading ? (
                                <BeatLoader color="#fff" size={6} />
                            ) : (
                                'Salvar'
                            )}
                        </PrimaryButton>
                    ) : null}
                </div>
            ) : (
                <div className="create-group-container">
                    <CreateGroup setGroup={setGroup} />
                </div>
            )}
            {selectedUser && (
                <PerfilUserModal
                    user={selectedUser}
                    group={group}
                    onClose={() => setSelectedUser(undefined)}
                />
            )}

            {showAddMemberModal && (
                <AddMemberModal
                    setShowModal={setShowAddMemberModal}
                    leaderGroup={group}
                />
            )}
            {deleteModal ? (
                <DeleteModal
                    isOpen={deleteModal}
                    onClose={() => setDeleteModal(false)}
                    onDelete={() =>
                        deleteGroup(group?.id || '').then(() => {
                            setDeleteModal(false);
                            setGroup(undefined);
                        })
                    }
                />
            ) : null}
        </div>
    ) : (
        <div className="dashboard-loading-container">
            <BeatLoader color="#01B3FF" size={40} />
        </div>
    );
};

export default UserDashboard;
