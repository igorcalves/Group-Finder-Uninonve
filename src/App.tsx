import React, { useState } from 'react';
import CardGroup from './components/CardGroup';
import { Group } from './domain/group';

const initialGroups: Group[] = [];

function App() {
  const [groups, setGroups] = useState<Group[]>(initialGroups);
  const [name, setName] = useState('');
  const [description, setDescription] = useState('');

  function createGroup() {
    const newGroup: Group = {
      name,
      description,
      date: new Date().toISOString().split('T')[0],
      discipline: 'Unknown',
      tags: [],
      members: [],
      owner: 'Unknown',
      id: `group${groups.length + 1}`,
    };
    setGroups([...groups, newGroup]);
  }

  return (
    <div>
      <input
        value={name}
        onChange={(e) => setName(e.target.value)}
        placeholder="Group Name"
      />
      <input
        value={description}
        onChange={(e) => setDescription(e.target.value)}
        placeholder="Group Description"
      />
      <button onClick={createGroup}>Create Group</button>
      <div style={{display:'flex', flexDirection:'row', gap: '20px', marginTop: '20px'}}>
        {groups.map((group, index) => (
          <CardGroup key={index} group={group} />
        ))}
      </div>
    </div>
  );
}

export default App;