import React, { useEffect, useState } from "react";
import "./css/Home.css";
import { useDispatch, useSelector } from "react-redux";
import {
  postCreate,
  postGet,
  userLike,
  userViews,
} from "../app/clices/postSlice";
import { Outlet, useNavigate } from "react-router-dom";
import { FcLike, FcComments, FcDislike } from "react-icons/fc";
import { TfiGallery } from "react-icons/tfi";
import Comments from "../components/Comments";
import { CommentCreate } from "../app/clices/Comment.Slice";
import { SlUserFollow } from "react-icons/sl";
import { CiBookmark, CiBookmarkRemove } from "react-icons/ci";

import {
  getUserBookmarks,
  toggleFollow,
  userAddBookmark,
  userProtected,
} from "../app/clices/userSlice";
import { RiUserFollowLine } from "react-icons/ri";
import { Toaster } from "react-hot-toast";

const Home = () => {
  const { bookmark } = useSelector((state) => state.app);
  const { data } = useSelector((state) => state.app?.user);
  const { post, loading, errors } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [inputValue, setInputValue] = useState({
    user: data?._id,
    content: "",
    file: null,
    fileType: "",
  });
  const [error, setError] = useState("");
  const [openCommentForPost, setOpenCommentForPost] = useState(null); // State to track the open comment box for each post
  const [toggleComPost, setToggleComPost] = useState(false);
  const [postId, setCommId] = useState("");

  const handleInputChange = (event) => {
    const { name, value, files } = event.target;
    if (name === "file") {
      const fileType = files[0].type.split("/")[0];
      setInputValue({
        ...inputValue,
        file: files[0],
        fileType,
      });
    } else {
      setInputValue({
        ...inputValue,
        [name]: value,
      });
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (inputValue.content === "") {
      setError("Write something...");
      return;
    } else {
      setError("");
    }
    if (toggleComPost) {
      dispatch(
        CommentCreate({
          user: data?._id,
          post: postId,
          content: inputValue?.content,
        })
      ).then(() =>
        dispatch(postGet()).then(() =>
          setInputValue({
            user: data?._id,
            content: "",
            file: null,
            fileType: "",
          })
        )
      );
      return;
    }

    try {
      const formData = new FormData();
      formData.append("content", inputValue.content);
      formData.append("userId", inputValue.user);

      if (inputValue.fileType === "image" || inputValue.fileType === "video") {
        formData.append(inputValue.fileType, inputValue.file);
      }

      dispatch(postCreate(formData)).then(() => {
        dispatch(postGet()).then(() =>
          setInputValue({
            user: data?._id,
            content: "",
            file: null,
            fileType: "",
          })
        );
      });
    } catch (error) {
      setError("Error sending data to backend. Please try again.");
    }
  };

  useEffect(() => {
    dispatch(postGet());
    dispatch(getUserBookmarks({ userId: data?._id }));
  }, [dispatch]);

  // Function to toggle comment box for a post
  const toggleCommentBox = (postId) => {
    setOpenCommentForPost((prevPostId) =>
      prevPostId === postId ? null : postId
    );
  };

  return (
    <div className="Home">
      <Toaster />
      <div className="post d-flex justify-content-center align-items-center">
        <form className="postU" onSubmit={handleSubmit}>
          <div className="proUserData d-flex align-items-center gap-2">
            <img
              src={data.img_url}
              alt="User Profile"
              onClick={() => navigate(`${data?.username}`)}
            />
            <div className="d-flex flex-column">
              <h6 className="m-0 p-0">{data?.name}</h6>
              <span>{data?.username}</span>
            </div>
          </div>

          <div className="d-flex w-100 justify-content-between align-items-center">
            <textarea
              name="content"
              cols="30"
              rows="1"
              value={inputValue.content}
              onChange={handleInputChange}
              placeholder="Write something..."
            ></textarea>
          </div>

          <div className="fileUpload d-flex justify-content-between">
            <div className="icons">
              <TfiGallery style={{ cursor: "pointer" }} size={20} />
              <input
                type="file"
                name="file"
                accept="image/*,video/*"
                onChange={handleInputChange}
              />
            </div>
            {error && <p className="error">{error}</p>}
            {errors && <p className="error">{errors}</p>}
            <button className="btn" type="submit">
              {toggleComPost ? "commets" : loading ? "..." : "Post"}
            </button>
          </div>
        </form>
      </div>
      <div className="postData">
        <div className="postCompo">
          {post?.data &&
            post?.data.map((val, i) => (
              <div className="divPost text-white" key={val?._id}>
                <div className="imgPic">
                  <span className="w-100 d-flex">
                    <img
                      onClick={() => navigate(`/${val?.user?._id}`)}
                      className="img"
                      src={val?.user?.img_url}
                      alt="User"
                    />
                    <div className="d-flex flex-column">
                      <span className="mx-2">{val?.user?.name}</span>
                      <span className="mx-2" style={{ opacity: ".7" }}>
                        {val?.user?.username}
                      </span>
                    </div>
                    {/* toggleFollow */}
                    {data?._id === val?.user?._id ? (
                      ""
                    ) : (
                      <div className="mt-2">
                        {data?.following.some(
                          (followingUser) =>
                            followingUser._id === val?.user?._id
                        ) ? (
                          <i className="bg-info p-1 rounded-3">
                            <RiUserFollowLine
                              size={20}
                              onClick={() =>
                                dispatch(
                                  toggleFollow({
                                    userId: data?._id,
                                    otherUserId: val?.user?._id,
                                  })
                                ).then(() => dispatch(userProtected()))
                              }
                            />
                          </i>
                        ) : (
                          <i className="bg-info p-1 rounded-3">
                            <SlUserFollow
                              size={20}
                              onClick={() =>
                                dispatch(
                                  toggleFollow({
                                    userId: data?._id,
                                    otherUserId: val?.user?._id,
                                  })
                                ).then(() => dispatch(userProtected()))
                              }
                            />
                          </i>
                        )}
                      </div>
                    )}
                    {/* toggleFollow */}

                  </span>
                  <div className="p-4">{val?.content}</div>
                </div>
                <div className="postIMage w-100 d-flex flex-column align-items-center">
                  {val?.img_url && (
                    <img
                      src={val?.img_url}
                      alt="Post"
                      className="h-100 imgData"
                      onClick={() => {
                        dispatch(userViews(val?._id)).then(() =>
                          dispatch(postGet())
                        );
                      }}
                    />
                  )}
                </div>
                <div className="Like">
                  <div>
                    <i
                      onClick={() => {
                        dispatch(
                          userLike({ userId: data?._id, postId: val?._id })
                        ).then(() => dispatch(postGet()));
                      }}
                    >
                      <FcLike size={30} />
                      <span>{val?.likes?.length}</span>
                    </i>

                    <i>
                      <FcComments
                        size={30}
                        onClick={() => {
                          toggleCommentBox(val?._id);
                          setToggleComPost((pre) => !pre);
                          setCommId(val?._id);
                        }} // Toggle comment box
                      />
                    </i>
                    {bookmark &&
                    bookmark?.some((e) => e?.post?._id == val?._id) ? (
                      <i>
                        <CiBookmarkRemove
                          size={30}
                          onClick={() => {
                            dispatch(
                              userAddBookmark({
                                userId: data?._id,
                                postId: val?._id,
                              })
                            ).then(() =>
                              dispatch(getUserBookmarks({ userId: data?._id }))
                            );
                          }}
                        />
                      </i>
                    ) : (
                      <i>
                        <CiBookmark
                          size={30}
                          onClick={() => {
                            dispatch(
                              userAddBookmark({
                                userId: data?._id,
                                postId: val?._id,
                              })
                            ).then(() =>
                              dispatch(getUserBookmarks({ userId: data?._id }))
                            );
                          }}
                        />
                      </i>
                    )}
                    <i className="d-flex align-items-center">
                      {val?.views}
                    </i>
                  </div>
                </div>
                {openCommentForPost === val?._id && (
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
      </div>
      <div id="imgBoxI">
        <img src="" alt="" id="img" />
      </div>
      <Outlet />
    </div>
  );
};

export default Home;
