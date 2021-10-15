import React, { useState } from 'react';
import { IPost } from '../../store/posts';
import Gravatar from 'react-gravatar';
import Image from 'next/image';
import { HeartIcon, ChatAltIcon, ShareIcon } from '@heroicons/react/outline';
import { DuplicateIcon } from '@heroicons/react/solid';
import ImageCarousel from '../ImageCarousel/ImageCarousel';

interface IPostCard {
  post: IPost;
}

function PostCard({ post: { id, content, User, Images, Comments } }: IPostCard) {
  const [showCarousel, setShowCarousel] = useState(false);

  return (
    <>
      <div className="px-4 py-4 rounded-lg shadow-lg bg-gray-50">
        <header className="flex items-center">
          <Gravatar email="default" className="w-8 h-8 mr-2 rounded-full" />
          <p className="mr-2 text-lg font-bold text-gray-500 ">{User.nickname}</p>
          <button className="px-3 py-2 text-sm text-white transition duration-200 ease-out bg-indigo-400 rounded-lg hover:bg-indigo-500">
            팔로우 버튼
          </button>
        </header>

        {/* 이미지 뷰 */}
        <div className="mt-4">
          {Images.length > 0 && (
            <div className="relative flex h-96 ">
              <Image
                loading="lazy"
                key={Images[0].src}
                src={Images[0].src}
                alt={`image`}
                layout="fill"
                className="object-cover rounded-md cursor-pointer hover:bg-black hover:opacity-60 "
                onClick={() => setShowCarousel(true)}
              />
              <div className="absolute top-2 right-2 ">
                <DuplicateIcon className="h-5 cursor-pointer" />
              </div>
            </div>
          )}
        </div>

        <p className="mt-4 text-gray-700">{content}</p>

        <footer className="grid grid-cols-3 mt-4 place-items-center ">
          <HeartIcon className="h-8 cursor-pointer " />
          <ChatAltIcon className="h-8 cursor-pointer" />
          <ShareIcon className="h-8 cursor-pointer" />
        </footer>
      </div>

      {/* Image Carousel */}
      {showCarousel && <ImageCarousel onClose={() => setShowCarousel(false)} images={Images} />}
    </>
  );
}

export default PostCard;
