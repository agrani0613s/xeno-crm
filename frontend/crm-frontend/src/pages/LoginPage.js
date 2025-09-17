import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { useNavigate, useLocation } from "react-router-dom";

function LoginPage() {
  const { user } = useContext(AuthContext);
  const navigate = useNavigate();
  const location = useLocation();

  const params = new URLSearchParams(location.search);
  const message = params.get("message");

  useEffect(() => {
    if (user) navigate("/dashboard");
  }, [user, navigate]);

  const handleLogin = () => {
    window.location.href = "http://localhost:5000/auth/google";
  };

  return (
    <div className="flex flex-col items-center justify-center h-screen bg-gray-50">
      <div className="bg-white shadow-lg rounded-lg p-8 w-96 text-center">
        <h2 className="text-2xl font-bold mb-6">Login to Xeno CRM</h2>
        {message && <p className="text-red-500 mb-4">{message}</p>}
        <button
          onClick={handleLogin}
          className="bg-blue-500 text-white px-6 py-2 rounded-lg hover:bg-blue-600 transition w-full"
        >
          Login with Google
        </button>
      </div>
    </div>
  );
}

export default LoginPage;
