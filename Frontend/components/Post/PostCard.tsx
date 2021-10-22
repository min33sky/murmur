import React, { useState } from 'react';
import Gravatar from 'react-gravatar';
import Image from 'next/image';
import { HeartIcon, ChatAltIcon, ShareIcon, DuplicateIcon } from '@heroicons/react/outline';
import ImageCarousel from '../ImageCarousel/ImageCarousel';
import { IPost } from '../../typings/posts';
import PostCardContent from './PostCardContent';
import Comment from '../Comment/Comment';
import { useRecoilValue } from 'recoil';
import { userState } from '../../store/user';

interface IPostCard {
  post: IPost;
}

function PostCard({ post: { id, content, likes, User, Images, Comments } }: IPostCard) {
  const loggedInUser = useRecoilValue(userState);
  const [showCarousel, setShowCarousel] = useState(false);
  const [showComment, setShowComment] = useState(false);
  const [favorite, setFavorite] = useState(false);

  return (
    <>
      <div className="px-4 py-4 rounded-lg shadow-lg bg-gray-50 ">
        <header className="flex items-center">
          <Gravatar email={User.email} className="w-8 h-8 mr-2 rounded-full" />
          <p className="mr-2 text-lg font-bold text-gray-500 ">{User.nickname}</p>
          {loggedInUser?.id !== User.id && (
            <button className="px-3 py-2 text-sm text-white transition duration-200 ease-out bg-indigo-400 rounded-lg hover:bg-indigo-500">
              팔로우
            </button>
          )}
        </header>

        {/* 이미지 뷰 */}
        <div className="mt-4">
          {Images.length > 0 && (
            <div className="relative flex h-96 ">
              <Image
                loading="lazy"
                placeholder="blur"
                // blurDataURL="https://fakeimg.pl/640x360"
                blurDataURL={Images[0].src}
                key={Images[0].src}
                src={Images[0].src}
                alt={`image`}
                layout="fill"
                className="object-cover rounded-md cursor-pointer hover:bg-black hover:opacity-60 "
                onClick={() => setShowCarousel(true)}
              />
              {Images.length > 1 && (
                <div className="absolute top-2 right-2 ">
                  <DuplicateIcon className="h-10 text-indigo-500 cursor-pointer" />
                </div>
              )}
            </div>
          )}
        </div>

        <PostCardContent content={content} />

        <footer className="grid grid-cols-3 mt-4 place-items-center ">
          <div className="flex items-center space-x-2">
            <HeartIcon
              onClick={() => setFavorite((prev) => !prev)}
              className={`h-8 cursor-pointer ${favorite && 'text-red-500 fill-current'} `}
            />
            <p>{likes.length}</p>
          </div>
          <ChatAltIcon
            onClick={() => setShowComment((prev) => !prev)}
            className="h-8 cursor-pointer"
          />
          <ShareIcon className="h-8 cursor-pointer" />
        </footer>

        {/************************************** 댓글 관련 *************************************************/}
        <Comment comments={Comments} show={showComment} />
      </div>

      {/* Image Carousel */}
      {showCarousel && <ImageCarousel onClose={() => setShowCarousel(false)} images={Images} />}
    </>
  );
}

export default PostCard;
