import React, { useEffect, useState } from "react";
import "./css/Sidebar.css";
import { Link, useNavigate } from "react-router-dom";
import { useSelector } from "react-redux";

// icons
import { IoIosArrowDropleft } from "react-icons/io";
import { IoIosArrowDropright } from "react-icons/io";
import { AiOutlineHome } from "react-icons/ai";
import { RiSearch2Line } from "react-icons/ri";
import { FaRegUser } from "react-icons/fa6";
import { TbMessage2Bolt } from "react-icons/tb";
import { CiLogout } from "react-icons/ci";
import { CiBookmark } from "react-icons/ci";

const Sidebar = () => {
  let {user,toggleBtn} = useSelector(pre=>pre.app)
  let [btnToggle, setToggle] = useState(false);
  let usenav = useNavigate()
  return (
    <>
      <div className={` Sidebar bg-dark text-white ${toggleBtn ? "" : "active"}`}
        style={{ width: `${btnToggle ? "55px" : ""}` }}
      >
        <nav className={`${btnToggle ? "active" : ""}`}>
          <div className="btnM">
            {btnToggle ? (
              <IoIosArrowDropright
                size={30}
                onClick={() => setToggle((pre) => !pre)}
                style={{ width: `${btnToggle ? "55px" : ""}`,cursor:"pointer"}}
              />
            ) : (
              <IoIosArrowDropleft
                size={30}
                onClick={() => setToggle((pre) => !pre)}
                style={{ width: `${btnToggle ? "55px" : ""}` }}
              />
            )}
          </div>
          <Link to="/">
            <i>
              <AiOutlineHome size={28} />
            </i>
            <span>Home</span>
          </Link>

          <Link to="/explore">
            <i>
              <RiSearch2Line size={28} />
            </i>
            <span>Explore</span>
          </Link>

          <Link to="/messages">
            <i>
              <TbMessage2Bolt size={28} />
            </i>
            <span>Messages</span>
          </Link>

          <Link to={`/${user?.data?.username}`}>
            <i>
              <FaRegUser size={28} />
            </i>
            <span>Profile</span>
          </Link>

          <Link to="/bookmark">
            <i>
              <CiBookmark size={28} />
            </i>
            <span>Bookmark</span>
          </Link>

          <div
            className="Logout"
            onClick={() => {
              window.localStorage.setItem("token", "");
              usenav("/")
              window.location.reload()
            }}
          >
            {btnToggle ? (
              <CiLogout
                size={39}
                style={{
                  color: "white",
                  border: "1px solid rgba(255, 255, 255, 0.348)",
                  borderRadius: "9px",
                }}
              />
            ) : (
              <div data="LogOut">
                <img src={user?.data?.img_url}/>
                <span>
                  <h6 className="m-0" style={{fontSize:"13px"}}>{user?.data?.name}</h6>
                  <span style={{fontSize:"9px"}}>{user?.data?.email}</span>
                </span>
              </div>
            )}
          </div>
        </nav>
      </div>
    </>
  );
};

export default Sidebar;
