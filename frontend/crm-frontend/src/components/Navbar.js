import React, { useContext } from "react";
import { Link } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";

function NavBar() {
  const { user, login, logout } = useContext(AuthContext);

  return (
    <nav className="bg-gray-900 text-white px-6 py-4 flex justify-between items-center shadow">
      {/* Left side links */}
      <div className="flex items-center space-x-6">
        <Link to="/" className="font-bold text-lg hover:text-blue-300">
          Xeno CRM
        </Link>
        <Link to="/" className="hover:text-gray-300">
          Home
        </Link>
        {user && (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">
              Dashboard
            </Link>
            <Link to="/campaigns" className="hover:text-gray-300">
              Campaigns
            </Link>
          </>
        )}
      </div>

      {/* Right side auth */}
      <div>
        {user ? (
          <div className="flex items-center space-x-4">
            <span className="text-sm">Hi, {user.displayName}</span>
            <button
              onClick={logout}
              className="bg-red-500 px-3 py-1 rounded hover:bg-red-600"
            >
              Logout
            </button>
          </div>
        ) : (
          <button
            onClick={login}
            className="bg-blue-500 px-4 py-2 rounded hover:bg-blue-600"
          >
            Login with Google
          </button>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
