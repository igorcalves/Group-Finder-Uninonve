import React, { useState } from 'react';
import { PostAdd } from '@mui/icons-material';
import { Group } from '../../domain/group';
import './styles.css';
import CreateGroupModal from '../modal/createGroupModal';
import { useGlobalContext } from '../../context';
import { User } from '../../domain/user';
import RedirectModal from '../modal/redirectModal';
import { createAGroup, getUser } from '../../services/firebase';
import PrimaryButton from '../button/primaryButton';
import sapiens from '../../assets/images/sapiensCreateGroup.png';

interface CreateGroupProps {
    setGroup: React.Dispatch<React.SetStateAction<Group | undefined>>;
}

const CreateGroup: React.FC<CreateGroupProps> = ({ setGroup }) => {
    const { setGroups } = useGlobalContext();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [quantityMembers, setQuantityMembers] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);
    const [redirectModal, setRedirectModal] = useState<boolean>(false);
    const [closedGroup, setClosedGroup] = useState<boolean>(false);
    const [loading, setLoading] = useState<boolean>(false);
    const loggedIn = localStorage.getItem('loggedIn');
    function clearField() {
        setName('');
        setDescription('');
    }

    function handlePostGroup() {
        if (loggedIn) {
            setShowModal(true);
        } else {
            setRedirectModal(true);
        }
    }

    function createGroup() {
        setLoading(true);
        const newGroups: Group[] = [];
        // for (let i = 0; i < 100; i++) {
        //     const user: User = {
        //         name: `User${i}`,
        //         email: `teste${i}@teste.com`,
        //         phone: '123456789',
        //     };
        //     newGroups.push({
        //         name: `Group ${i}`,
        //         description: `DescriptionDes criptionDescri ptionDescrip tionDescription DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription ${i}`,
        //         date: new Date().toISOString().split('T')[0],
        //         discipline: 'Projeto',
        //         tags: [],
        //         members: [],
        //         owner: user,
        //         id: `group${i} + ${new Date().getTime()}`,
        //         maxMembers: 10,
        //         closedGroup: closedGroup,
        //     });
        // }

        const users: User[] = [];

        // for (let i = 0; i < 12; i++) {
        //     const user: User = {
        //         name: `User${i}`,
        //         email: `teste${i}@teste.com`,
        //         phone: '123456789',
        //     };
        //     users.push(user);
        // }

        getUser().then((user) => {
            if (user) {
                const newGroup: Group = {
                    name,
                    description,
                    date: new Date().toISOString().split('T')[0],
                    discipline: 'Projeto',
                    tags: [],
                    members: users,
                    owner: user,
                    id: localStorage.getItem('user') || '',
                    maxMembers: parseInt(quantityMembers),
                    closedGroup: closedGroup,
                };

                createAGroup(newGroup)
                    .then((response) => {
                        if (response) {
                            newGroups.push(newGroup);
                            setGroups((prevGroups) => [
                                ...prevGroups,
                                ...newGroups,
                            ]);
                            setShowModal(false);
                            clearField();
                            setGroup(newGroup);
                            setLoading(false);
                        }
                    })
                    .catch((error) => {
                        console.log(error);
                        setLoading(false);
                    });
            }
        });
    }

    return (
        <>
            <img className="image-sapiens" src={sapiens}></img>
            <p>Você não possui um grupo. que tal criar um?</p>

            <PrimaryButton colorText="white" onClick={handlePostGroup}>
                Criar grupo
            </PrimaryButton>
            <CreateGroupModal
                isVisible={showModal}
                setName={setName}
                name={name}
                loading={loading}
                description={description}
                setDescription={setDescription}
                handleButton={createGroup}
                handleCloseModal={() => setShowModal(false)}
                setQuantityMembers={setQuantityMembers}
                quantityMembers={quantityMembers}
                closedGroup={closedGroup}
                setClosedGroup={setClosedGroup}
            />
            {redirectModal && (
                <RedirectModal
                    isVisible={redirectModal}
                    handleCloseModal={setRedirectModal}
                />
            )}
        </>
    );
};

export default CreateGroup;
