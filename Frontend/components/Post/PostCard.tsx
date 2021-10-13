import React from 'react';
import { IPost } from '../../store/posts';
import Gravatar from 'react-gravatar';
import Image from 'next/image';
import { HeartIcon, ChatAltIcon, ShareIcon } from '@heroicons/react/outline';

interface IPostCard {
  post: IPost;
}

function PostCard({ post: { id, content, User, Images, Comments } }: IPostCard) {
  return (
    <div className="px-4 py-4 rounded-lg shadow-lg bg-gray-50">
      <header className="flex items-center">
        <Gravatar email="default" className="w-8 h-8 mr-2 rounded-full" />
        <p className="mr-2 text-lg font-bold text-gray-500 ">{User.nickname}</p>
        <button className="px-3 py-2 text-sm text-white transition duration-200 ease-out bg-indigo-400 rounded-lg hover:bg-indigo-500">
          팔로우 버튼
        </button>
      </header>

      <div className="mt-4">
        {Images.length > 0 &&
          Images.map((image, index) => (
            <Image
              key={image.src}
              src={image.src}
              alt={`image-${index}`}
              width={400}
              height={400}
              layout="responsive"
            />
          ))}
        <p className="mt-4 text-gray-700">{content}</p>
      </div>

      <footer className="grid grid-cols-3 mt-4 place-items-center ">
        <HeartIcon className="h-8 cursor-pointer " />
        <ChatAltIcon className="h-8 cursor-pointer" />
        <ShareIcon className="h-8 cursor-pointer" />
      </footer>
    </div>
  );
}

export default PostCard;
