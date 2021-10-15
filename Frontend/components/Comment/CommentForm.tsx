import React, { useCallback } from 'react';

function CommentForm() {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
  }, []);

  return (
    <form
      onSubmit={handleSubmit}
      className="flex flex-col px-2 pt-2 mx-auto mt-4 rounded-lg shadow-lg bg-gray-50"
    >
      <textarea
        className="h-24 bg-transparent outline-none scrollbar-hide"
        placeholder="내용을 입력하세요"
      />

      <footer className="flex items-center justify-between px-4 py-2">
        <button
          type="submit"
          className="px-3 py-2 text-sm font-bold tracking-wider text-gray-100 transition duration-200 ease-out bg-indigo-400 rounded-lg cursor-pointer hover:bg-indigo-500 hover:ring-1"
        >
          전송
        </button>
      </footer>
    </form>
  );
}

export default CommentForm;
