import React from 'react';
import Gravatar from 'react-gravatar';
import FollowCard from './FollowCard';

interface IFollowList {
  label: string;
  data: {
    id: number;
    email: string;
    nickname: string;
  }[];
}

function FollowList({ label, data }: IFollowList) {
  return (
    <article>
      <h1 className="mb-4 text-2xl font-bold">{label}</h1>
      <section>
        {data.map((user) => (
          <FollowCard key={user.id} user={user} />
        ))}
      </section>
    </article>
  );
}

export default FollowList;
