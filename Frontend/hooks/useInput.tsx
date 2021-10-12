import React, { useCallback, useState } from 'react';

function useInput(initialstate = '') {
  const [text, setText] = useState(initialstate);

  const handler = useCallback((e: React.ChangeEvent<HTMLInputElement>) => {
    setText(e.target.value);
  }, []);

  return {
    text,
    handler,
    setText,
  };
}

export default useInput;
