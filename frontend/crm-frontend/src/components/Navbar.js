import React, { useContext } from "react";
import { Link, useNavigate } from "react-router-dom";
import { AuthContext } from "../context/AuthContext";
import axios from "axios";

function NavBar() {
  const { user, setUser } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = async () => {
    try {
      await axios.get("http://localhost:5000/auth/logout", { withCredentials: true });
      setUser(null);
      navigate("/login?message=Logged out successfully");
    } catch (err) {
      console.error("Logout failed", err);
    }
  };

  return (
    <nav
      style={{
        padding: "10px 20px",
        backgroundColor: "#282c34",
        color: "white",
        display: "flex",
        justifyContent: "space-between",
        alignItems: "center",
      }}
    >
      <div>
        <Link to="/" style={{ color: "white", marginRight: "15px", textDecoration: "none" }}>
          Home
        </Link>
        {user && (
          <>
            <Link
              to="/dashboard"
              style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
            >
              Dashboard
            </Link>
            <Link
              to="/campaigns"
              style={{ color: "white", marginRight: "15px", textDecoration: "none" }}
            >
              Campaigns
            </Link>
          </>
        )}
      </div>

      <div>
        {user ? (
          <>
            <span style={{ marginRight: "15px" }}>Hi, {user.displayName}</span>
            <button onClick={handleLogout}>Logout</button>
          </>
        ) : (
          <Link to="/login" style={{ color: "white", textDecoration: "none" }}>
            Login
          </Link>
        )}
      </div>
    </nav>
  );
}

export default NavBar;
