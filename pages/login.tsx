import Link from 'next/link';
import React, { useCallback } from 'react';
import Layout from '../components/Layout';

function Login() {
  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('로그인 버튼');
  }, []);

  return (
    <Layout>
      <div className="absolute inset-0 flex items-center justify-center flex-col">
        <h1 className="text-2xl font-bold mb-4">Login</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col space-y-4 w-full md:max-w-screen-md px-2"
        >
          <div className="relative ">
            <input
              type="text"
              id="email"
              placeholder="email"
              className="w-full p-4 text-lg placeholder-transparent border border-indigo-400 rounded-md outline-none peer"
            />
            <label htmlFor="email" className="auth-label">
              Email Address
            </label>
          </div>

          <div className="relative ">
            <input
              type="password"
              id="password"
              placeholder="password"
              className="w-full p-4 text-lg placeholder-transparent border border-indigo-400 rounded-md outline-none peer"
            />
            <label htmlFor="password" className="auth-label">
              Password
            </label>
          </div>

          {/* 버튼 */}
          <button
            type="submit"
            className="bg-indigo-300 py-4 cursor-pointer hover:bg-indigo-400 duration-200 transition ease-out text-2xl text-white"
          >
            로그인
          </button>

          <footer className="m-4">
            <p className="text-right">
              계정이 없다면?
              <Link href="/register">
                <a className="hover:text-pink-500 text-pink-600"> 회원가입</a>
              </Link>{' '}
            </p>
          </footer>
        </form>
      </div>
    </Layout>
  );
}

export default Login;
