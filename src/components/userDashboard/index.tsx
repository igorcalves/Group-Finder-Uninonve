import React, { useEffect, useState } from 'react';
import PrimaryInput from '../input';
import './styles.css';
import { User } from '../../domain/user';
import PrimaryButton from '../button/primaryButton';
import { Group } from '../../domain/group';
import { getGroup } from '../../services/firebase';
import CardUser from '../cardUser';
import PersonAddIcon from '@mui/icons-material/PersonAdd';
import DeleteIcon from '@mui/icons-material/Delete';
import { Checkbox } from '@mui/material';

interface UserDashboardProps {
    user: User | undefined;
}

const UserDashboard: React.FC<UserDashboardProps> = ({ user }) => {
    const [group, setGroup] = useState<Group | undefined>(undefined);
    const [email, setEmail] = useState('');
    const [name, setName] = useState('');
    const [phone, setPhone] = useState('');
    const [description, setDescription] = useState('');
    const [discipline, setDiscipline] = useState('');
    const [maxMembers, setMaxMembers] = useState('');
    const [closedGroup, setClosedGroup] = useState(false);
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
                    setClosedGroup(group.closedGroup);
                }
            });
        }
    }, [user]);

    return (
        <div className="dashboard-container">
            <div className="form-user-container">
                <h1 className="form-user-title">Informações do usuário</h1>
                <PrimaryInput
                    content={email}
                    placeholder="email"
                    setContent={setEmail}
                />
                <PrimaryInput
                    content={name}
                    placeholder="Nome"
                    setContent={setName}
                />
                <PrimaryInput
                    placeholder="telefone"
                    content={phone}
                    setContent={setPhone}
                />

                <div className="form-user-button-container">
                    <PrimaryButton
                        onClick={() => {}}
                        widthP="100%"
                        colorText="#fff"
                    >
                        Salvar
                    </PrimaryButton>
                </div>
            </div>
            <div className="form-groups-container">
                <div className="form-groups-title">
                    <h1>Grupo: {group?.name}</h1>
                    <DeleteIcon
                        className="delete-group-icon"
                        onClick={() => {}}
                    />
                </div>
                <div className="form-groups-content">
                    <div className="form-groups-left">
                        <p className="form-groups-left-info">
                            Informações do grupo
                        </p>
                        <p className="form-groups-left-info-date">
                            Data de criação: {group?.date}
                        </p>
                        <PrimaryInput
                            content={description}
                            placeholder="Descrição"
                            setContent={setDescription}
                            label="Descrição"
                        />
                        <PrimaryInput
                            content={discipline}
                            placeholder="Disciplina"
                            setContent={setDiscipline}
                            label="Disciplina"
                        />
                        <PrimaryInput
                            content={maxMembers}
                            placeholder="Máximo de membros"
                            setContent={setMaxMembers}
                            label="Máximo de membros"
                            type="number"
                            maxLength={12}
                        />
                        <div className="checkbox-container-dashboard">
                            <div className="checkbox-item-dashboard">
                                <Checkbox
                                    checked={closedGroup}
                                    onChange={handleCheckboxChange}
                                />
                                <p>Entrada Somente com convite</p>
                            </div>
                        </div>
                    </div>
                    <div className="form-groups-right">
                        <div className="form-groups-right-title">
                            <p>Integrantes</p>
                            <PersonAddIcon
                                className="add-member-icon"
                                onClick={() => {}}
                            />
                        </div>
                        <div className="members-container">
                            {group?.members &&
                                group?.members.map((member) => (
                                    <CardUser user={member} />
                                ))}
                        </div>
                    </div>
                </div>
                <PrimaryButton
                    onClick={() => {}}
                    widthP="100%"
                    colorText="#fff"
                >
                    Salvar
                </PrimaryButton>
            </div>
        </div>
    );
};

export default UserDashboard;
