import { UserRemoveIcon } from '@heroicons/react/solid';
import React from 'react';
import Gravatar from 'react-gravatar';

interface IFollowCard {
  user: {
    id: number;
    email: string;
    nickname: string;
  };
}

function FollowCard({ user }: IFollowCard) {
  return (
    <article className="flex items-center justify-between px-4 py-4 mb-4 transition duration-200 ease-out transform rounded-lg shadow-lg bg-gray-50 hover:-translate-y-1">
      <Gravatar email={user.email} className="rounded-full" />
      <div className="flex items-center space-x-4">
        <p className="text-lg font-bold">{user.nickname}</p>
        <UserRemoveIcon
          onClick={() => alert('제거 ㅇㅋ?')}
          className="h-8 transition duration-200 ease-out cursor-pointer hover:text-pink-500"
        />
      </div>
    </article>
  );
}

export default FollowCard;
