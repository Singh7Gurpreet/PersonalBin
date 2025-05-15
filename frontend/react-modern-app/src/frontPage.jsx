const apiUrl = import.meta.env;

console.log(apiUrl.VITE_BACKEND_URL);

export default function SimpleButton() {
  const handleClick = () => {
    console.log(apiUrl);
    window.location.href = `${apiUrl.VITE_BACKEND_URL}/auth/google`
  };

  return (
    <button onClick={handleClick}>
      Click Me
    </button>
  );
}
