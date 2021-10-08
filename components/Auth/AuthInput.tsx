import { LockClosedIcon, MailIcon, UserIcon, XCircleIcon } from '@heroicons/react/solid';
import React from 'react';

interface IAuthInput {
  type: 'email' | 'password' | 'passwordCheck' | 'text';
  value: string;
  label: string;
  onChange: (text: string) => void;
}

/**
 * 인증 인풋
 * @param param0
 * @returns
 */
function AuthInput({ type, value, label, onChange }: IAuthInput) {
  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    onChange(e.target.value);
  };

  const handleReset = () => {
    onChange('');
  };

  return (
    <div className="relative ">
      <input
        type={type === 'passwordCheck' ? 'password' : type}
        id={type === 'passwordCheck' ? 'passwordCheck' : type}
        placeholder={type}
        className="w-full p-4 text-lg placeholder-transparent border border-indigo-400 rounded-md outline-none peer"
        value={value}
        onChange={handleChange}
      />
      <label
        htmlFor={type}
        className="absolute bg-transparent transition-all peer-placeholder-shown:top-4 peer-placeholder-shown:text-lg peer-placeholder-shown:text-gray-400 peer-focus:top-[-2px] top-[-2px] left-2 px-2 text-indigo-400 text-sm  peer-focus:text-sm peer-focus:text-indigo-400 peer-focus:rounded-full"
      >
        {label}
      </label>

      {value && (
        <XCircleIcon
          onClick={handleReset}
          className="absolute h-5 transition cursor-pointer right-12 top-5 opacity-40 hover:opacity-60"
        />
      )}

      {type === 'email' && <MailIcon className="absolute h-7 right-4 top-4 opacity-40" />}
      {type === 'text' && <UserIcon className="absolute h-7 right-4 top-4 opacity-40" />}
      {type === 'password' && <LockClosedIcon className="absolute h-7 right-4 top-4 opacity-40" />}
    </div>
  );
}

export default AuthInput;
