import React, { useEffect, useState } from "react";
import "./css/Profile.css";
import { useDispatch, useSelector } from "react-redux";
import { Outlet, useNavigate, useParams } from "react-router-dom";
// icons
import { FcComments, FcLike } from "react-icons/fc";
import { getUserPost, postGet, userLike } from "../app/clices/postSlice";
import Comments from "../components/Comments";
import { TfiCommentsSmiley } from "react-icons/tfi";
const Profile = () => {
  let { userId } = useParams();

  const { data } = useSelector((state) => state.app?.user);
  const { post, userPost, loading, errors } = useSelector(
    (state) => state.post
  );
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [openCommentForPost, setOpenCommentForPost] = useState(null);
  const [toggleComPost, setToggleComPost] = useState(false);

  useEffect(() => {
    dispatch(getUserPost(data._id));
  }, []);

  // Function to toggle comment box for a post
  const toggleCommentBox = (postId) => {
    setOpenCommentForPost((prevPostId) =>
      prevPostId === postId ? null : postId
    );
  };

  return (
    <>
      <div className="Profile">
        <div className="pro1">
          <div className="top position-relative">
            <img
              className="pimg"
              src="https://img.freepik.com/free-photo/painting-mountain-lake-with-mountain-background_188544-9126.jpg"
              alt=""
            />
            <div className="imgPro bg-info">
              <img src={data.img_url} alt="" />
            </div>
            <div className=" bio d-flex justify-content-end px-2">
              <span className=" d-flex justify-content-end">
                {data?.bio}
              </span>
            </div>
            <div className="userNameData d-flex justify-content-end px-1 g-3">
              <div className="userFollow d-flex flex-column gap-1">
                <span >following {data?.following?.length}</span>
                <span >followers {data?.followers?.length}</span>
              </div>
              <div className="d-flex flex-column">
                <h4 className="m-0 p-0">{data.name}</h4>
                <span>{data.username}</span>
              </div>
            </div>
          </div>
          <div className="Post w-100 position-relative">
            <div className="PostNew">
              <div className="newPost">
                <div className="postData">
                  {/* postCompo */}
                  <div className="postCompo">
                    {userPost &&
                      userPost?.data &&
                      userPost?.data.map((val, i) => (
                        <div className="divPost text-white" key={val?._id}>
                          <div className="imgPic">
                            <span className="w-100 d-flex">
                              <img 
                                className="img"
                                src={val?.user?.img_url}
                                alt="User"
                              />
                              <div className="d-flex flex-column">
                                <span className="mx-2">{val?.user?.name}</span>
                                <span
                                  className="mx-2"
                                  style={{ opacity: ".7" }}
                                >
                                  {val?.user?.username}
                                </span>
                              </div>
                            </span>
                            <div className="p-4">{val.content}</div>
                          </div>
                          <div className="postIMage w-100 d-flex flex-column align-items-center">
                            {val.img_url && (
                              <img
                                src={val.img_url}
                                alt="Post"
                                className="h-100"
                              />
                            )}
                          </div>
                          <div className="Like">
                            <div>
                              <i
                                onClick={() => {
                                  dispatch(
                                    userLike({
                                      userId: data?._id,
                                      postId: val._id,
                                    })
                                  ).then(() =>
                                    dispatch(getUserPost(data?._id))
                                  );
                                }}
                              >
                                <FcLike size={30} />
                                <span>{val.likes.length}</span>
                              </i>
                              <i>
                                <FcComments
                                  size={30}
                                  onClick={() => {
                                    toggleCommentBox(val._id);
                                    setToggleComPost((pre) => !pre);
                                  }}
                                />
                              </i>
                              <i>
                                <TfiCommentsSmiley
                                  size={30}
                                  onClick={() =>
                                    navigate(`/${data?.username}/${val?._id}`)
                                  }
                                />
                              </i>
                            </div>
                          </div>
                          {openCommentForPost === val._id && (
                            <Comments
                              comment={val?.comments[0]}
                              comm={val?.comments}
                              toggleComment={toggleCommentBox}
                              setToggleComPost={setToggleComPost}
                            />
                          )}
                        </div>
                      ))}
                  </div>
                  {/* postCompo */}
                </div>
              </div>
            </div>
          </div>
        </div>
        <Outlet />
      </div>
    </>
  );
};

export default Profile;
