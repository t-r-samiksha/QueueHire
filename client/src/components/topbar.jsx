import "../styles/topbar.css";
import React from "react";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { clearUser } from "../store/userslice";

function TopBar({ title, subtitle, icon }) {
  const user = useSelector((state) => state.user);
  const nav = useNavigate();
  const dispatch = useDispatch();
  return (
    <div className="topbar">
      <div className="topright">
        <h1>{title}</h1>
        <p>{subtitle}</p>
      </div>
      <div className="topleft">
        {icon ? <img src={icon} alt="" /> : <p>{user.fullName[0]}</p>}
        <p>Hi, {user.fullName}</p>
        <button
          className="logout"
          onClick={() => {
            dispatch(clearUser());
            localStorage.removeItem("user");
            nav("/");
          }}
        >
          Logout
        </button>
      </div>
    </div>
  );
}
export default TopBar;
