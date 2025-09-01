<<<<<<< HEAD
import { useLocation, Link } from "react-router-dom";
=======
import { useLocation } from "react-router-dom";
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
import { useEffect } from "react";

const NotFound = () => {
  const location = useLocation();

  useEffect(() => {
    console.error(
      "404 Error: User attempted to access non-existent route:",
      location.pathname
    );
  }, [location.pathname]);

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100">
      <div className="text-center">
        <h1 className="text-4xl font-bold mb-4">404</h1>
        <p className="text-xl text-gray-600 mb-4">Oops! Page not found</p>
<<<<<<< HEAD
        <Link to="/" className="text-blue-500 hover:text-blue-700 underline">
          Вернуться на главную
        </Link>
=======
        <a href="/" className="text-blue-500 hover:text-blue-700 underline">
          Return to Home
        </a>
>>>>>>> 39d3f718b0d8f7b0390d11e523d856b03bc5bd8d
      </div>
    </div>
  );
};

export default NotFound;
