import { PhotographIcon } from '@heroicons/react/solid';
import React, { MutableRefObject, useCallback, useRef } from 'react';

function PostForm() {
  const imageUploadRef: MutableRefObject<HTMLInputElement | null> = useRef(null);

  const handleSumbit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('폼 전송');
  }, []);

  const handleClickUploadImage = useCallback(() => {
    if (imageUploadRef.current) {
      imageUploadRef.current.click();
    }
  }, []);

  const handleUploadImage = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    const files = e.target.files;
    console.log('files: ', files);
  }, []);

  return (
    <form
      onSubmit={handleSumbit}
      className="flex flex-col max-w-md px-2 pt-2 mx-auto mt-4 rounded-lg shadow-lg bg-gray-50"
    >
      <textarea
        className="h-24 bg-transparent outline-none scrollbar-hide"
        placeholder="내용을 입력하세요"
      />

      <footer className="flex items-center justify-between px-4 py-2">
        <input hidden type="file" ref={imageUploadRef} onChange={handleUploadImage} />
        <PhotographIcon className="h-8 cursor-pointer" onClick={handleClickUploadImage} />
        <button
          type="submit"
          className="px-3 py-2 text-sm font-bold text-gray-100 transition duration-200 ease-out bg-indigo-400 rounded-lg cursor-pointer hover:bg-indigo-500 hover:ring-1"
        >
          전송
        </button>
      </footer>
    </form>
  );
}

export default PostForm;
