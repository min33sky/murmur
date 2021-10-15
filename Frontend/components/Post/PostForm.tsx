import { PhotographIcon, TrashIcon } from '@heroicons/react/solid';
import React, { MutableRefObject, useCallback, useRef, useState } from 'react';
import Image from 'next/image';

/**
 * 포스트 등록 폼
 * @returns
 */
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

  const handleRemoveImagePreview = useCallback(
    (index: number) => {
      const updated = imagesPreview.filter((_, idx) => idx !== index);
      setimagesPreview(updated);
    },
    [imagesPreview]
  );

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
          <p className="mt-2 text-sm text-gray-600 select-none">Upload Images</p>
          <section className="flex flex-wrap">
            {imagesPreview.map((image, idx) => (
              <div key={`image-preview-${idx}`} className="relative w-20 h-20 mt-2 mr-2">
                <Image
                  src={image}
                  alt={`image-preview-${idx}`}
                  layout="fill"
                  onClick={() => handleRemoveImagePreview(idx)}
                  className="rounded-md cursor-pointer"
                />
                <div
                  onClick={() => handleRemoveImagePreview(idx)}
                  className="absolute inset-0 grid transition duration-200 ease-out rounded-md opacity-0 cursor-pointer hover:bg-black hover:opacity-80 place-items-center"
                  aria-label="Remove Image Preview"
                >
                  {/* <p className="font-bold text-white ">삭제</p> */}
                  <TrashIcon className="h-5 text-gray-400" />
                </div>
              </div>
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
