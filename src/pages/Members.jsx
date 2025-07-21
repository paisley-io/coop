// src/pages/Members.jsx
import React, { useEffect, useState } from 'react';
import MemberCard from '../components/MemberCard';

const Members = () => {
  const [members, setMembers] = useState([]);

  useEffect(() => {
    fetch('http://localhost:4000/api/members')
      .then((res) => res.json())
      .then((data) => setMembers(data))
      .catch((err) => console.error('Error fetching members:', err));
  }, []);

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
      {members.map((member) => (
        <MemberCard key={member.id} member={member} />
      ))}
    </div>
  );
};

export default Members;
