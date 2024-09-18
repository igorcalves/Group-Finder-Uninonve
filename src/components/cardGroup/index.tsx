import React, { useState } from 'react';
import { Group } from '../../domain/group';
import { User } from '../../domain/user';
import './styles.css';
import PrimaryButton from '../button/primaryButton';
interface CardGroupProps {
  group: Group;
}

export function CardGroup({ group }: CardGroupProps) {
  const [members, setMembers] = useState<User[]>(group.members);

  function addMember() {
    if (members.length >= 5) {
      alert('Limite de membros atingido');
      return;
    }
    const newMember = { name: 'New Member', email: '', phone: '' };
    setMembers([...members, newMember]);
  }

  return (
    <div className="card-Body">
      <h1>{group.name}</h1>
      <p>{group.description}</p>
      <p>{group.date}</p>
      <p>{group.discipline}</p>
      <p>
        {group.tags.map((tag, index) => (
          <span key={index}>{tag}</span>
        ))}
      </p>
      <p>
        {members.map((member, index) => (
          <p key={index}>{member.name}</p>
        ))}
      </p>
      <p>{group.owner}</p>
      <p>{group.id}</p>
      <PrimaryButton onClick={addMember}>Adicionar</PrimaryButton>
    </div>
  );
}

export default CardGroup;
