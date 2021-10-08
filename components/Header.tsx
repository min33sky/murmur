import React, { useCallback, useState } from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Gravatar from 'react-gravatar';
import router from 'next/router';

function Header() {
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [openedButton, setOpenedButton] = useState(false);

  const [keyword, setKeyword] = useState('');

  const logout = useCallback(() => {
    setIsLoggedIn(false);
  }, []);

  return (
    <div className="sticky top-0 z-50 flex flex-col px-2 pt-4 bg-white shadow-lg md:flex-row md:pb-4 md:justify-between md:px-6 md:items-center">
      <div className="flex items-center justify-between md:flex-grow">
        {/* 로고 */}
        <Link href="/">
          <a className="text-2xl font-bold md:mr-8 lg:mr-20">LOGO</a>
        </Link>

        {/* 검색창 */}
        <div className="flex items-center px-1 py-1 bg-indigo-100 border rounded-2xl md:flex-grow md:mr-24 ">
          <input
            type="text"
            className="flex-grow px-2 py-2 mr-2 font-bold outline-none rounded-2xl "
            value={keyword}
            onChange={(e) => setKeyword(e.target.value)}
            placeholder="Search...."
          />
          <button>
            <SearchIcon className="h-5 px-2 cursor-pointer" />
          </button>
        </div>

        {/* 햄버거 버튼 */}
        <div className="flex items-center">
          {isLoggedIn && (
            <div className="flex items-center mr-2 space-x-4">
              <Gravatar
                email="messi@naver.com"
                className="w-10 h-10 transition rounded-full cursor-pointer hover:scale-110"
                onClick={() => router.push('/profile')}
              />
              <p className="hidden text-lg font-bold md:inline-flex">UserName</p>
            </div>
          )}
          <MenuIcon
            className="h-8 cursor-pointer md:hidden"
            onClick={() => setOpenedButton((prev) => !prev)}
          />
        </div>
      </div>

      {/************************************************* 햄버거 메뉴 ***********************************************************/}
      <nav
        className={`flex flex-col items-center transition-all whitespace-nowrap md:space-x-4 md:h-auto duration-200 ease-out md:flex-row mt-4 md:mt-0 space-y-4 md:space-y-0 md:ml-4 font-bold overflow-hidden ${
          openedButton ? 'h-32' : 'h-0'
        } `}
      >
        {!isLoggedIn && (
          <>
            <Link href="/register">
              <a className="w-full text-center">회원가입</a>
            </Link>
            <Link href="/login">
              <a className="w-full text-center">로그인</a>
            </Link>
          </>
        )}
        {isLoggedIn && (
          <>
            <Link href="/">
              <a className="w-full text-center" onClick={logout}>
                로그아웃
              </a>
            </Link>
          </>
        )}
      </nav>
    </div>
  );
}

export default Header;
