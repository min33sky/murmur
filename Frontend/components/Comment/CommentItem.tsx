import React from 'react';
import { CommentType } from '../../typings/posts';

interface ICommentItem {
  comment: CommentType;
}

function CommentItem({
  comment: {
    content,
    User: { nickname },
  },
}: ICommentItem) {
  return (
    <div className="flex items-center mt-1">
      <p className="mr-2 font-bold">{nickname}</p>
      <p>{content}</p>
    </div>
  );
}

export default CommentItem;
