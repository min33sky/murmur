import Link from 'next/link';
import React from 'react';

interface IAuthFooter {
  to: 'login' | 'register';
  description: string;
}

function AuthFooter({ to, description }: IAuthFooter) {
  return (
    <footer className="m-4">
      <p className="text-right">
        {description}
        <Link href={to === 'login' ? '/login' : '/register'}>
          <a className="font-bold text-pink-600 hover:text-pink-500">
            {to === 'login' ? ' 로그인' : ' 회원가입'}
          </a>
        </Link>{' '}
      </p>
    </footer>
  );
}

export default AuthFooter;
