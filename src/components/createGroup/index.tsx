import React, { useState } from 'react';
import { PostAdd } from '@mui/icons-material';
import { Group } from '../../domain/group';
import './styles.css';
import CreateGroupModal from '../modal/createGroupModal';
import { useGlobalContext } from '../../context';
import { User } from '../../domain/user';

const CreateGroup: React.FC = () => {
    const { setGroups } = useGlobalContext();
    const [name, setName] = useState<string>('');
    const [description, setDescription] = useState<string>('');
    const [showModal, setShowModal] = useState<boolean>(false);

    function clearField() {
        setName('');
        setDescription('');
    }

    function createGroup() {
        const newGroups: Group[] = [];
        for (let i = 0; i < 100; i++) {
            const user: User = {
                name: `User${i}`,
                email: `teste${i}@teste.com`,
                phone: '123456789',
            };
            newGroups.push({
                name: `Group ${i}`,
                description: `DescriptionDes criptionDescri ptionDescrip tionDescription DescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescriptionDescription ${i}`,
                date: new Date().toISOString().split('T')[0],
                discipline: 'Projeto',
                tags: [],
                members: [],
                owner: user,
                id: `group${i} + ${new Date().getTime()}`,
            });
        }
        setGroups((prevGroups) => [...prevGroups, ...newGroups]);

        // const newGroup: Group = {
        //     name,
        //     description,
        //     date: new Date().toISOString().split('T')[0],
        //     discipline: 'Projeto',
        //     tags: [],
        //     members: [],
        //     owner: user,
        //     id: `group${groups.length + 1}`,
        // };

        setShowModal(false);
        clearField();
    }

    return (
        <>
            <PostAdd
                className="icon-add-group"
                onClick={() => setShowModal(true)}
            />
            <CreateGroupModal
                isVisible={showModal}
                setName={setName}
                name={name}
                description={description}
                setDescription={setDescription}
                handleButton={createGroup}
                handleCloseModal={() => setShowModal(false)}
            />
        </>
    );
};

export default CreateGroup;
