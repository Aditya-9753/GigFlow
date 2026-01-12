import { Link, useNavigate } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function Navbar() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate("/login");
  };

  return (
    <>
      {/* INTERNAL CSS */}
      <style>{`
        .navbar {
          background: #ffffff;
          border-top: 4px solid #4f46e5;
          border-bottom: 1px solid #e5e7eb;
          padding: 16px 28px;
          position: sticky;
          top: 0;
          z-index: 100;
          box-shadow: 0 2px 6px rgba(0,0,0,0.05);
        }

        .navbar-inner {
          max-width: 1100px;
          margin: auto;
          display: flex;
          align-items: center;
          justify-content: space-between;
        }

        .logo {
          font-size: 26px;
          font-weight: 800;
          color: #4f46e5;
          text-decoration: none;
        }

        .nav-links {
          display: flex;
          align-items: center;
          gap: 20px;
        }

        .nav-link {
          font-size: 16px;
          font-weight: 600;
          color: #374151;
          text-decoration: none;
        }

        .nav-link:hover {
          color: #4f46e5;
        }

        .btn {
          padding: 8px 16px;
          font-size: 15px;
          font-weight: 600;
          border-radius: 6px;
          text-decoration: none;
          cursor: pointer;
          border: none;
        }

        .btn-primary {
          background: #4f46e5;
          color: #ffffff;
        }

        .btn-primary:hover {
          background: #4338ca;
        }

        .btn-logout {
          background: #ef4444;
          color: #ffffff;
        }

        .btn-logout:hover {
          background: #dc2626;
        }

        .username {
          font-size: 15px;
          color: #6b7280;
          font-weight: 600;
        }
      `}</style>

      {/* NAVBAR */}
      <nav className="navbar">
        <div className="navbar-inner">

          {/* LEFT */}
          <Link to="/" className="logo">
            GigFlow
          </Link>

          {/* RIGHT */}
          <div className="nav-links">

            {/* Always visible */}
            <Link to="/" className="nav-link">Gigs</Link>

            {user && (
              <>
                <Link to="/dashboard" className="nav-link">Dashboard</Link>
                <Link to="/post-gig" className="nav-link">Post Gig</Link>
              </>
            )}

            {user ? (
              <>
                <span className="username">{user.name}</span>
                <button onClick={handleLogout} className="btn btn-logout">
                  Logout
                </button>
              </>
            ) : (
              <>
                <Link to="/login" className="nav-link">Login</Link>
                <Link to="/register" className="btn btn-primary">
                  Register
                </Link>
              </>
            )}
          </div>

        </div>
      </nav>
    </>
  );
}
