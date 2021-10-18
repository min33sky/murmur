import React, { useCallback, useState } from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';
import Gravatar from 'react-gravatar';
import router from 'next/router';
import { useRecoilState } from 'recoil';
import { userState } from '../store/user';

/**
 * 메인 헤더
 * @returns
 */
function Header() {
  const [loggedInUser, setLoggedInUser] = useRecoilState(userState);

  // const [isLoggedIn, setIsLoggedIn] = useState(false);
  const [openedButton, setOpenedButton] = useState(false);

  const [keyword, setKeyword] = useState('');

  const logout = useCallback(() => {
    // setIsLoggedIn(false);
    setLoggedInUser(null);
  }, [setLoggedInUser]);

  return (
    <div className="sticky top-0 z-50 flex flex-col px-2 pt-4 bg-white shadow-lg md:flex-row md:pb-4 md:justify-between md:px-6 md:items-center">
      <div className="flex items-center justify-between md:flex-grow">
        {/* 로고 */}
        <Link href="/">
          <a className="text-2xl font-bold md:mr-8 lg:mr-20">LOGO</a>
        </Link>

        {/* 검색창 */}
        <div className="flex items-center max-w-4xl px-1 py-1 bg-indigo-100 border rounded-full md:flex-grow md:mr-24 ">
          <input
            type="text"
            className="flex-grow px-2 py-2 font-bold rounded-full outline-none "
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
          {loggedInUser && (
            <div className="flex items-center mr-2 space-x-4">
              <Gravatar
                email={loggedInUser.email}
                className="w-10 h-10 transition rounded-full cursor-pointer hover:scale-110"
                onClick={() => router.push('/profile')}
              />
              <p className="hidden text-lg font-bold md:inline-flex">{loggedInUser.nickname}</p>
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
        {!loggedInUser && (
          <>
            <Link href="/register">
              <a className="w-full text-center">회원가입</a>
            </Link>
            <Link href="/login">
              <a className="w-full text-center">로그인</a>
            </Link>
          </>
        )}
        {loggedInUser && (
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
