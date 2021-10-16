import Link from 'next/link';
import React from 'react';

/**
 * 포스트 내용을
 * @param param0
 * @returns
 */
function PostCardContent({ content }: { content: string }) {
  return (
    <p className="mt-4 text-gray-700">
      {content.split(/(#[^\s#]+)/g).map((keyword, index) => {
        if (keyword.match(/(#[^\s#]+)/g)) {
          return (
            <Link href={`/hashtag/${keyword.slice(1)}`} key={`keyword-${index}`}>
              <a className="text-blue-700">{keyword}</a>
            </Link>
          );
        }
        return keyword;
      })}
    </p>
  );
}

export default PostCardContent;
