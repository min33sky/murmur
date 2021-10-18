import React from 'react';
import { CommentType } from '../../typings/posts';
import CommentForm from './CommentForm';
import CommentList from './CommentList';

interface IComment {
  comments: CommentType[];
  show: boolean;
}

function Comment({ comments, show }: IComment) {
  return (
    <div className={`transition-all ease-in-out duration-200 ${show ? 'h-72' : 'h-0'}`}>
      <CommentForm show={show} />
      <CommentList comments={comments} show={show} />
    </div>
  );
}

export default Comment;
