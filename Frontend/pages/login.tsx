import Head from 'next/head';
import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import AuthButton from '../components/Auth/AuthButton';
import AuthFooter from '../components/Auth/AuthFooter';
import AuthInput from '../components/Auth/AuthInput';
import Layout from '../components/Layout';
import { useRouter } from 'next/router';
import { useSetRecoilState } from 'recoil';
import { userState } from '../store/user';

/**
 * 로그인 페이지
 * @returns
 */
function Login() {
  const setLogIn = useSetRecoilState(userState);

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const router = useRouter();

  const handleSubmit = useCallback(
    (e: React.FormEvent<HTMLFormElement>) => {
      e.preventDefault();
      console.log('eamil: ', email);
      console.log('password: ', password);
      console.log('로그인 요청');

      setLogIn({
        id: '1',
        email: 'messi@naver.com',
        nickname: 'messi',
        Posts: [],
        Followers: [],
        Follwings: [],
      });
      //* 일단 로그인 시킨다. (메인 페이지로 이동)
      router.push('/');
    },
    [email, password, router, setLogIn]
  );

  return (
    <Layout>
      <Head>
        <title>Login | Murmur</title>
        <meta name="description" content="Generated by create next app" />
        <link rel="icon" href="/favicon.ico" />
      </Head>

      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full px-2 space-y-4 md:max-w-screen-md"
        >
          <AuthInput type="email" label="Email Address" value={email} onChange={setEmail} />
          <AuthInput type="password" label="Password" value={password} onChange={setPassword} />

          <AuthButton>로그인</AuthButton>

          <AuthFooter to="register" description="계정이 없다면?" />
        </form>
      </div>
    </Layout>
  );
}

export default Login;
