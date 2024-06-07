import React from "react";
import { Link, NavLink } from "react-router-dom";
import { useAuth } from "../../hook/authHook";

function Header() {
  let {
    data: { name },
  } = useAuth();
  return (
    <nav className="navbar navbar-expand-lg navbar-dark bg-dark ">
      <div className="container-fluid">
        <NavLink className="navbar-brand" to="/">
          Resume Builder 🧾
        </NavLink>
        <button
          className="navbar-toggler"
          type="button"
          data-bs-toggle="collapse"
          data-bs-target="#navbarSupportedContent"
          aria-controls="navbarSupportedContent"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon" />
        </button>
        <div className="collapse navbar-collapse" id="navbarSupportedContent">
          <ul className="navbar-nav me-auto mb-2 mb-lg-0">
            <li className="nav-item">
              <NavLink className="nav-link active" aria-current="page" to="/">
                Home
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/about">
                About
              </NavLink>
            </li>
            <li className="nav-item">
              <NavLink className="nav-link" to="/contact">
                contact
              </NavLink>
            </li>
            {name && (
              <div className="dropdown">
                <NavLink
                  className="drop dropdown-toggle"
                  type="button"
                  id="dropdownMenuButton1"
                  data-bs-toggle="dropdown"
                  aria-expanded="false"
                >
                  {<p className="text-white">{name}</p>}
                </NavLink>
                <ul
                  className="dropdown-menu"
                  aria-labelledby="dropdownMenuButton1"
                >
                  <li>
                    <Link>Profile</Link>
                  </li>
                  <li>
                    <Link>ForgetPassword</Link>
                  </li>
                  <li>
                    <Link>Logout</Link>
                  </li>
                </ul>
              </div>
            )}
            {!name && (
              <li className="nav-item ms-auto">
                <NavLink className="nav-link" to="/signin">
                  Login
                </NavLink>
              </li>
            )}
          </ul>
        </div>
      </div>
    </nav>
  );
}

export default Header;
