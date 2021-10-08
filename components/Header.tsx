import React, { useState } from 'react';
import { MenuIcon, SearchIcon } from '@heroicons/react/solid';
import Link from 'next/link';

function Header() {
  const [openedButton, setOpenedButton] = useState(false);

  return (
    <div className="sticky z-50 top-0 bg-white flex flex-col md:flex-row px-2 pt-4 md:pb-4 shadow-lg md:justify-between md:px-6 md:items-center">
      <div className="flex items-center justify-between md:flex-grow">
        {/* 로고 */}
        <Link href="/">
          <a className="md:mr-8 lg:mr-20 font-bold text-2xl">LOGO</a>
        </Link>

        {/* 검색창 */}
        <div className="border bg-indigo-100 py-1 px-1 rounded-2xl flex items-center md:flex-grow md:mr-24 ">
          <input type="text" className="rounded-2xl outline-none px-2 py-2 flex-grow mr-2 " />
          <button>
            <SearchIcon className="h-5 cursor-pointer px-2" />
          </button>
        </div>

        {/* 햄버거 버튼 */}
        <div className="md:hidden">
          <MenuIcon
            className="h-8 cursor-pointer"
            onClick={() => setOpenedButton((prev) => !prev)}
          />
        </div>
      </div>
      {/* 햄버거 메뉴 */}
      <nav
        className={`flex flex-col items-center transition-all whitespace-nowrap md:space-x-4 md:h-auto duration-200 ease-out md:flex-row mt-4 md:mt-0 space-y-4 md:space-y-0 md:ml-4 font-bold overflow-hidden ${
          openedButton ? 'h-32' : 'h-0'
        } `}
      >
        <Link href="/register">
          <a className="w-full text-center">회원가입</a>
        </Link>
        <Link href="/login">
          <a className="w-full text-center">로그인</a>
        </Link>
      </nav>
    </div>
  );
}

export default Header;
