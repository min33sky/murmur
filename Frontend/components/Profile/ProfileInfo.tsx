import React from 'react';
import Gravatar from 'react-gravatar';

function ProfileInfo() {
  return (
    <article className="flex items-center justify-between my-6 rounded-lg shadow-lg bg-gray-50">
      <div>
        <Gravatar email="pani@naver.com" className="w-40 h-40" />
      </div>
      <div className="pr-4 text-lg font-semibold">
        <p>닉네임</p>
        <p>하하</p>
        <p>크크</p>
        <p>낄낄</p>
      </div>
    </article>
  );
}

export default ProfileInfo;
