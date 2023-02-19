import React from "react";
import { useDispatch, useSelector } from "react-redux";
import { NavLink, useNavigate } from "react-router-dom";
import { useResponsive } from "../../hooks/useResposive";
import { setUserInfoAction } from "../../store/actions/userAction";

export default function Header() {
  const view = useResponsive();
  const userState = useSelector((state) => state.userReducer);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = () => {
    localStorage.removeItem("USER_INFO_KEY");
    dispatch(setUserInfoAction(null));
    navigate("/");
  };

  return (
    <div className={view.width > 1500 ? "container" : "container-fluid"}>
      <nav className="navbar navbar-expand-sm navbar-light bg-light">
        <NavLink className="navbar-brand" to={"/"}>
          Movie
        </NavLink>
        <button
          className="navbar-toggler d-lg-none"
          type="button"
          data-toggle="collapse"
          data-target="#collapsibleNavId"
          aria-controls="collapsibleNavId"
          aria-expanded="false"
          aria-label="Toggle navigation"
        >
          <span className="navbar-toggler-icon"></span>
        </button>
        <div className="collapse navbar-collapse" id="collapsibleNavId">
          <ul className="navbar-nav mr-auto mt-2 mt-lg-0">
            <li className="nav-item active">
              <NavLink to="/">Home</NavLink>
            </li>
          </ul>
          <div className="ml-auto">
            {userState.userInfo ? (
              <>
                <span className="mr-3">Hello {userState.userInfo.hoTen}</span>
                <button className="btn btn-danger" onClick={handleLogout}>
                  Logout
                </button>
              </>
            ) : (
              <>
                <button
                  className="btn btn-outline-info my-2 my-sm-0 mr-2"
                  type="summit"
                  onClick={() => navigate("/register")}
                >
                  Register
                </button>
                <button
                  className="btn btn-outline-success my-2 my-sm-0"
                  onClick={() => navigate("/login")}
                >
                  Login
                </button>
              </>
            )}
          </div>
        </div>
      </nav>
    </div>
  );
}
