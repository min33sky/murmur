import Link from 'next/link';
import React, { useCallback, useState } from 'react';
import AuthButton from '../components/Auth/AuthButton';
import AuthFooter from '../components/Auth/AuthFooter';
import AuthInput from '../components/Auth/AuthInput';
import Layout from '../components/Layout';

/**
 * 회원 가입 페이지
 * /register
 * @returns
 */
function Register() {
  const [email, setEmail] = useState('');
  const [nickname, setNickname] = useState('');
  const [password, setPassword] = useState('');
  const [passwordCheck, setPasswordCheck] = useState('');

  const handleSubmit = useCallback((e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    console.log('회원 가입 버튼');
  }, []);

  return (
    <Layout>
      <div className="absolute inset-0 flex flex-col items-center justify-center">
        <h1 className="mb-4 text-2xl font-bold tracking-wider">REGISTER</h1>
        <form
          onSubmit={handleSubmit}
          className="flex flex-col w-full px-2 space-y-4 md:max-w-screen-md"
        >
          <AuthInput type="email" label="Email Address" value={email} onChange={setEmail} />
          <AuthInput type="text" label="Nickname" value={nickname} onChange={setNickname} />
          <AuthInput type="password" label="Password" value={password} onChange={setPassword} />
          <AuthInput
            type="passwordCheck"
            label="PasswordCheck"
            value={passwordCheck}
            onChange={setPasswordCheck}
          />

          {/* 버튼 */}
          <AuthButton disabled={true}>회원 가입</AuthButton>
          <AuthFooter to="login" description="계정이 없다면?" />
        </form>
      </div>
    </Layout>
  );
}

export default Register;
