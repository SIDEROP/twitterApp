import React, { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { getUserBookmarks } from "../app/clices/userSlice";
import Post from "../components/Post";
import { Outlet } from "react-router-dom";

const Bookmark = () => {
  let { bookmark, user } = useSelector((pre) => pre.app);
  let dispatch = useDispatch();

  useEffect(() => {
    dispatch(getUserBookmarks({ userId: user?.data?._id }));
  }, []);
  return (
    <>
        <Post />
        <Outlet />
    </>
  );
};

export default Bookmark;
