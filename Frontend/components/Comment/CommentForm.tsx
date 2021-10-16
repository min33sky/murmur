import React, { useCallback, useState } from 'react';

function CommentForm() {
  const [comment, setComment] = useState('');

  const handleChangeComment = useCallback((e: React.ChangeEvent<HTMLTextAreaElement>) => {
    setComment(e.target.value);
  }, []);

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      if (!comment || !comment.trim()) return;
      console.log('댓글 전송: ', comment);
    },
    [comment]
  );

  const handleKeyPress = (e: React.KeyboardEvent) => {
    // ? 그냥 엔터키만 눌렀을 시 채팅 전송
    if (e.key === 'Enter') {
      if (!e.shiftKey) {
        e.preventDefault();
        console.log('댓글 전송');
      }
    }
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-2 pt-2 mx-auto mt-4 rounded-lg shadow-lg bg-gray-50"
    >
      <textarea
        className="h-24 bg-transparent outline-none scrollbar-hide"
        value={comment}
        onChange={handleChangeComment}
        onKeyPress={handleKeyPress}
        placeholder="댓글을 입력하세요"
      />

      <button
        type="submit"
        disabled={!comment || !comment.trim()}
        className="px-3 py-2 text-sm font-bold tracking-wider text-gray-100 transition duration-200 ease-out bg-indigo-400 rounded-lg cursor-pointer disabled:bg-gray-400 disabled:ring-0 hover:bg-indigo-500 hover:ring-1"
      >
        전송
      </button>
    </form>
  );
}

export default CommentForm;
