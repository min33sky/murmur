import React from 'react';
import { CommentType } from '../../typings/posts';
import CommentItem from './CommentItem';

interface ICommentList {
  comments: CommentType[];
}

function CommentList({ comments = [] }: ICommentList) {
  return (
    <div className="px-4 py-4 rounded-md shadow-lg bg-gray-50">
      {comments.map((comment) => (
        <CommentItem key={comment.id} comment={comment} />
      ))}
    </div>
  );
}

export default CommentList;
