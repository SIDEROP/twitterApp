import React, { useEffect, useState } from "react";
import "./css/Comments.css";
// icons
import { MdOutlineCommentsDisabled } from "react-icons/md";

const Comments = ({ comm, comment, toggleComment, setToggleComPost }) => {
  if (!comment) {
    return;
  }

  return (
    <>
      <div className="Commentsd">
        <div className="Comments d-flex flex-column gap-3 align-items-center">
          <i>
            <MdOutlineCommentsDisabled
              size={28}
              style={{ color: "black" }}
              onClick={() => {
                toggleComment(null);
                setToggleComPost((pre) => !pre);
              }}
            />
          </i>
          {comm.map((val) => (
            <div className="boxComm">
              <div className="imgbox">
                <div className="d-flex gap-2">
                  <img src={val?.user?.img_url} alt="" />
                  <div className="d-flex flex-column">
                    <span className=" m-0 p-0">{val?.user?.name}</span>
                    <span>{val?.user?.username}</span>
                  </div>
                </div>
              </div>
              <div className="content p-2">
                <div className="conte">{val?.content}</div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </>
  );
};

export default Comments;
