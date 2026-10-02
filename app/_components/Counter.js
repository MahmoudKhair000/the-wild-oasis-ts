'use client';
import { useState } from 'react';

function Counter({ users }) {
  const [count, setCount] = useState(0);
  console.log(users)

  return (
    <>
      <p>There are {users.length} users</p>
      <div>
        <button onClick={() => setCount((prev) => prev - 1)}>-</button>
        <span>&nbsp;{count}&nbsp;</span>
        <button onClick={() => setCount((prev) => prev + 1)}>+</button>
      </div>
    </>
  );
}

export default Counter;
