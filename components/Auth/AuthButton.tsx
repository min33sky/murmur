import React from 'react';

interface IAuthButton {
  disabled?: boolean;
  children: React.ReactNode;
}

function AuthButton({ disabled, children }: IAuthButton) {
  return (
    <button
      type="submit"
      disabled={disabled}
      className={`py-4 text-2xl font-bold tracking-wider text-white transition duration-200 ease-out bg-indigo-300 rounded-md cursor-pointer hover:bg-indigo-400 ${
        disabled && 'cursor-not-allowed bg-gray-400 hover:bg-gray-400'
      }`}
    >
      {children}
    </button>
  );
}

export default AuthButton;
