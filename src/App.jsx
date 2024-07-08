import React, { useEffect } from "react";
import { Route, Routes } from "react-router-dom";
// import Layout
import Layout from "./Layout";
import Home from "./pages/Home";
import Comments from "./pages/Comments";
import Login from "./pages/Login";
import { useDispatch, useSelector } from "react-redux";
import { userProtected } from "./app/clices/userSlice";
import Profile from "./pages/Profile";
import Messages from "./pages/Messages";
import Explore from "./pages/Explore";
import Bookmark from "./pages/Bookmark";
import ProfileUser from "./components/ProfileUser"
import Imgbox from "./components/Imgbox"

const App = () => {
  let { loading, auth, user } = useSelector((preState) => preState.app);
  let useDis = useDispatch();

  useEffect(() => {
    useDis(userProtected());
  }, []);

  if (!auth) return <Login />;
  return (
    <>
      <Routes>
        <Route path="/" element={<Layout />}>
          <Route path="/" element={<Home />} >
            <Route path="/image/:imgUrl" element={<Imgbox/>}/>
          </Route>
          <Route path={`/${user.data?.username}`} element={<Profile />}>
            <Route
              path={`/${user.data?.username}/:postId`}
              element={<Comments />}
            />
          </Route>
          <Route path="/:profile" element={<ProfileUser />} />
          <Route path="/messages" element={<Messages />} />
          <Route path="/explore" element={<Explore />} />
          <Route path="/bookmark" element={<Bookmark />}>
            <Route
              path={`/bookmark/:postId`}
              element={<Comments params={"bookmark"} />}
            />
          </Route>
        </Route>
      </Routes>
    </>
  );
};

export default App;
