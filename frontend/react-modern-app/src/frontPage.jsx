import React from 'react';

export default function SimpleButton() {
  const handleClick = () => {
    window.location.href = "http://localhost:3000/auth/google"
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
