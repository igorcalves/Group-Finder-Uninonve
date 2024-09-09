import React from 'react';
import { Group } from '../domain/group';

interface CardGroupProps {
  group: Group;
}

export function CardGroup({ group }: CardGroupProps) {
  return (
    <div style={{backgroundColor:'red', width:'200px'}}>
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
        {group.members.map((member, index) => (
          <span key={index}>{member.name}</span>
        ))}
      </p>
      <p>{group.owner}</p>
      <p>{group.id}</p>
      <button>+</button>
    </div>
  );
}

export default CardGroup;