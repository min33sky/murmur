import { PhotographIcon } from '@heroicons/react/solid';
import React, { MutableRefObject, useCallback, useRef, useState } from 'react';
import Image from 'next/image';

function PostForm() {
  const [imagesPreview, setimagesPreview] = useState<string[]>([]);

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

    function readAndPreview(file: File) {
      if (/\.(jpe?g|png|gif|webp)$/i.test(file.name)) {
        const fileReader = new FileReader();
        fileReader.readAsDataURL(file);

        fileReader.onload = (e) => {
          const dataURL = e.target?.result?.toString()!;
          setimagesPreview((prev) => [...prev, dataURL]);
        };
      }
    }

    if (files && files.length > 0) {
      [].forEach.call(files, readAndPreview);
    }
  }, []);

  return (
    <form
      onSubmit={handleSumbit}
      className="flex flex-col px-2 pt-2 mx-auto mt-4 rounded-lg shadow-lg bg-gray-50"
    >
      <textarea
        className="h-24 bg-transparent outline-none scrollbar-hide"
        placeholder="내용을 입력하세요"
      />

      {imagesPreview.length > 0 && (
        <div>
          <p className="mt-2 text-sm text-gray-600 select-none">이미지 미리보기</p>
          <section className="flex mt-2 space-x-1">
            {imagesPreview.map((image, idx) => (
              <Image
                key={`image-preview-${idx}`}
                src={image}
                alt={`image-preview-${idx}`}
                width={100}
                height={100}
                layout="fixed"
              />
            ))}
          </section>
        </div>
      )}

      <footer className="flex items-center justify-between px-4 py-2">
        <input hidden multiple type="file" ref={imageUploadRef} onChange={handleUploadImage} />
        <PhotographIcon
          className="h-10 transition duration-200 ease-in-out opacity-50 cursor-pointer hover:opacity-100"
          onClick={handleClickUploadImage}
        />
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

export default PostForm;
