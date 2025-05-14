import React from 'react';

export default function SimpleButton() {
  const handleClick = () => {
    window.location.href = "https://personalbin.onrender.com/auth/google"
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
