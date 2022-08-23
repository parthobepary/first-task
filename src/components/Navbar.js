import { signOut } from "firebase/auth";
import React from "react";
import { useAuthState } from "react-firebase-hooks/auth";
import { NavLink, useNavigate } from "react-router-dom";

import auth from "../../src/firebase.init";

const Navbar = ({ children }) => {
  const navigate = useNavigate();
  const [user] = useAuthState(auth);
  const logout = () => {
    signOut(auth);
    navigate("/login");
  };
  return (
    <div>
      <div className="bg-gray-500 py-4">
        <ul className="menu menu-horizontal flex items-center justify-center">
          <li>
            <NavLink className="rounded-md mr-20" to="/home">
              Home
            </NavLink>
          </li>
          <li>
            {user ? (
              <button onClick={logout} className="btn btn-primary rounded-md">
                Signout
              </button>
            ) : (
              <NavLink className="rounded-md" to="login">
                {" "}
                Login{" "}
              </NavLink>
            )}
          </li>
        </ul>
      </div>
      {children}
    </div>
  );
};

export default Navbar;
