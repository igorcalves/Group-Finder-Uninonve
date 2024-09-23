import React, { useState } from 'react';
import AddBox from '@mui/icons-material/AddBox';
import CardGroup from '../cardGroup';
import './styles.css';
import { Group } from '../../domain/group';
import CreateGroupModal from '../modal/CreateGroupModal';
import PrimaryInput from '../input';

const Body: React.FC = () => {
  const [groups, setGroups] = useState<Group[]>([]);
  const [name, setName] = useState<string>('');
  const [description, setDescription] = useState<string>('');
  const [showModal, setShowModal] = useState<boolean>(false);

  function createGroup() {
    const newGroup: Group = {
      name,
      description,
      date: new Date().toISOString().split('T')[0],
      discipline: 'Projeto',
      tags: [],
      members: [],
      owner: 'User',
      id: `group${groups.length + 1}`,
    };
    setGroups([...groups, newGroup]);
    setShowModal(false);
    clearField();
  }

  function clearField() {
    setName('');
    setDescription('');
  }

  return (
    <div className="body">
      <div className="input-container">
        <PrimaryInput placeholder="Buscar Grupos" setContent={() => console} />
        <AddBox
          onClick={() => setShowModal(true)}
          style={{ cursor: 'pointer', fontSize: '40px', color: '#01b3ff' }}
        />
      </div>
      {groups.length === 0 && (
        <>
          <h1>Não exite nenhum grupo</h1>
        </>
      )}
      <div
        style={{
          display: 'flex',
          flexDirection: 'row',
          gap: '20px',
          marginTop: '20px',
        }}
      >
        {groups.map((group, index) => (
          <CardGroup key={index} group={group} />
        ))}
      </div>
      <CreateGroupModal
        isVisible={showModal}
        setName={setName}
        name={name}
        description={description}
        setDescription={setDescription}
        handleButton={createGroup}
      />
    </div>
  );
};

export default Body;
