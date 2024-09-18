import React, { useState } from 'react';
import AddBox from '@mui/icons-material/AddBox';
import CardGroup from '../cardGroup';
import './styles.css';

const Body: React.FC = () => {
  const [groups, setGroups] = useState<any[]>([]);

  const createGroup = () => {
    const newGroup = {
      description: '',
      date: new Date().toISOString().split('T')[0],
      discipline: 'Projeto',
      tags: [],
      members: [],
      owner: 'User',
      id: `group${groups.length + 1}`,
    };
    setGroups([...groups, newGroup]);
  };

  return (
    <div className="body">
      {groups.length === 0 && (
        <>
          <h1>Criar grupo</h1>
          <AddBox
            onClick={createGroup}
            style={{ cursor: 'pointer', fontSize: '40px', color: '#01b3ff' }}
          />
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
    </div>
  );
};

export default Body;
