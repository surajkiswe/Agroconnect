export const Button = ({ children, className = '', ...props }) => (
  <button
    className={`bg-green-700 text-white px-4 py-2 rounded hover:bg-green-800 transition ${className}`}
    {...props}
  >
    {children}
  </button>
);
