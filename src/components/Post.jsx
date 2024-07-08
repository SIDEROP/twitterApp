import React, { useEffect, useState } from "react";

import { useDispatch, useSelector } from "react-redux";
import { postGet, userLike } from "../app/clices/postSlice";
import { useNavigate } from "react-router-dom";
import { FcLike, FcComments } from "react-icons/fc";
import Comments from "../components/Comments";
import { SlUserFollow } from "react-icons/sl";
import { CiBookmark, CiBookmarkRemove } from "react-icons/ci";
import { RiUserFollowLine } from "react-icons/ri";
import { TfiCommentsSmiley } from "react-icons/tfi";

import {
  getUserBookmarks,
  toggleFollow,
  userAddBookmark,
  userProtected,
} from "../app/clices/userSlice";
import { BsBookmarkHeartFill } from "react-icons/bs";

const Post = () => {
  const { data } = useSelector((state) => state.app?.user);
  const { bookmark } = useSelector((state) => state.app);
  const { post, loading, errors } = useSelector((state) => state.post);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const [openCommentForPost, setOpenCommentForPost] = useState(null);
  const [toggleComPost, setToggleComPost] = useState(false);
  const [postId, setCommId] = useState("");

  useEffect(() => {
    dispatch(getUserBookmarks({ userId: data?._id }));
  }, []);
  
  // Function to toggle comment box for a post
  const toggleCommentBox = (postId) => {
    setOpenCommentForPost((prevPostId) =>
    prevPostId === postId ? null : postId
  );
};

  return (
    <>
      <div className="Home">
        <div className="postData">
          <div className="postCompo">
            {bookmark &&
              bookmark.map((val, i) => (
                <div className="divPost text-white" key={val?._id}>
                  <div className="imgPic">
                    <span className="w-100 d-flex">
                      <img
                        className="img"
                        src={val?.post?.user?.img_url}
                        alt="User"
                      />
                      <div className="d-flex flex-column">
                        <span className="mx-2">{val?.post?.user?.name}</span>
                        <span className="mx-2" style={{ opacity: ".7" }}>
                          @{val?.post?.user?.username}
                        </span>
                      </div>
                    </span>
                    <div className="p-4">{val?.post?.content}</div>
                  </div>
                  <div className="postIMage w-100 d-flex flex-column align-items-center">
                    {val?.post?.img_url && (
                      <img
                        src={val?.post?.img_url}
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
                              postId: val?.post?._id,
                            })
                          ).then(() =>
                            dispatch(getUserBookmarks({ userId: data?._id }))
                          );
                        }}
                      >
                        <FcLike size={30} />
                        <span>{val?.post?.likes?.length}</span>
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

                      {data?._id == val?.user ? (
                        <i>
                          <CiBookmarkRemove
                            size={30}
                            onClick={() => {
                              dispatch(
                                userAddBookmark({
                                  userId: data?._id,
                                  postId: val?.post?._id,
                                })
                              ).then(() =>
                                dispatch(
                                  getUserBookmarks({ userId: data?._id })
                                )
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
                                  postId: val?.post?._id,
                                })
                              ).then(() =>
                                dispatch(
                                  getUserBookmarks({ userId: data?._id })
                                )
                              );
                            }}
                          />
                        </i>
                      )}
                      <i>
                        <TfiCommentsSmiley
                          size={30}
                          onClick={() =>
                            navigate(`/${'bookmark'}/${val?.post?._id}`)
                          }
                        />
                      </i>
                    </div>
                  </div>
                  {openCommentForPost === val?._id && (
                    <Comments
                      comment={val?.post?.comments[0]}
                      comm={val?.post?.comments}
                      toggleComment={toggleCommentBox}
                      setToggleComPost={setToggleComPost}
                    />
                  )}
                </div>
              ))}
          </div>
        </div>
      </div>
    </>
  );
};

export default Post;

// import React, { useEffect, useState } from "react";

// import { useDispatch, useSelector } from "react-redux";
// import { postGet, userLike } from "../app/clices/postSlice";
// import { useNavigate } from "react-router-dom";
// import { FcLike, FcComments } from "react-icons/fc";
// import Comments from "../components/Comments";
// import { SlUserFollow } from "react-icons/sl";
// import { CiBookmark } from "react-icons/ci";
// import { RiUserFollowLine } from "react-icons/ri";
// import { TfiCommentsSmiley } from "react-icons/tfi";

// import {
//   getUserBookmarks,
//   toggleFollow,
//   userAddBookmark,
//   userProtected,
// } from "../app/clices/userSlice";

// const Post = () => {
//   const { data,bookmark } = useSelector((state) => state.app?.user);
//   const { post, loading, errors } = useSelector((state) => state.post);
//   const dispatch = useDispatch();
//   const navigate = useNavigate();

//   const [openCommentForPost, setOpenCommentForPost] = useState(null);
//   const [toggleComPost, setToggleComPost] = useState(false);
//   const [postId, setCommId] = useState("");

//   useEffect(() => {
//     dispatch(postGet());
//   }, [dispatch]);

//   // Function to toggle comment box for a post
//   const toggleCommentBox = (postId) => {
//     setOpenCommentForPost((prevPostId) =>
//       prevPostId === postId ? null : postId
//     );
//   };

//   return (
//     <>
//       <div className="Home">
//         <div className="postData">
//           <div className="postCompo">
//             {post?.data &&
//               post?.data.map((val, i) => (
//                 <div className="divPost text-white" key={val?._id}>
//                   <div className="imgPic">
//                     <span className="w-100 d-flex">
//                       <img
//                         className="img"
//                         src={val?.user?.img_url}
//                         alt="User"
//                       />
//                       <div className="d-flex flex-column">
//                         <span className="mx-2">{val?.user?.name}</span>
//                         <span className="mx-2" style={{ opacity: ".7" }}>
//                           @{val?.user?.username}
//                         </span>
//                       </div>
//                       {/* toggleFollow */}
//                       {data._id == val?.user?._id ? (
//                         ""
//                       ) : (
//                         <div>
//                           {data?.following[0]?._id == val?.user?._id ? (
//                             <i className="bg-info p-1 rounded-3">
//                               <RiUserFollowLine
//                                 size={20}
//                                 onClick={() =>
//                                   dispatch(
//                                     toggleFollow({
//                                       userId: data?._id,
//                                       otherUserId: val?.user?._id,
//                                     })
//                                   ).then(() => dispatch(userProtected()))
//                                 }
//                               />
//                             </i>
//                           ) : (
//                             <i className="bg-info p-1 rounded-3">
//                               {" "}
//                               <SlUserFollow
//                                 size={20}
//                                 onClick={() =>
//                                   dispatch(
//                                     toggleFollow({
//                                       userId: data?._id,
//                                       otherUserId: val?.user?._id,
//                                     })
//                                   ).then(() => dispatch(userProtected()))
//                                 }
//                               />
//                             </i>
//                           )}
//                         </div>
//                       )}
//                       {/* toggleFollow */}
//                     </span>
//                     <div className="p-4">{val.content}</div>
//                   </div>
//                   <div className="postIMage w-100 d-flex flex-column align-items-center">
//                     {val.img_url && (
//                       <img src={val.img_url} alt="Post" className="h-100" />
//                     )}
//                   </div>
//                   <div className="Like">
//                     <div>
//                       <i
//                         onClick={() => {
//                           dispatch(
//                             userLike({ userId: data?._id, postId: val?._id })
//                           ).then(() => dispatch(postGet()));
//                         }}
//                       >
//                         <FcLike size={30} />
//                         <span>{val.likes.length}</span>
//                       </i>
//                       <i>
//                         <FcComments
//                           size={30}
//                           onClick={() => {
//                             toggleCommentBox(val._id);
//                             setToggleComPost((pre) => !pre);
//                             setCommId(val._id);
//                           }} // Toggle comment box
//                         />
//                       </i>
//                       <i>
//                         <CiBookmark
//                           size={30}
//                           onClick={() => {
//                             dispatch(
//                               userAddBookmark({
//                                 userId: data?._id,
//                                 postId: val?._id,
//                               })
//                             ).then(() =>
//                               dispatch(getUserBookmarks({ userId: data?._id }))
//                             );
//                           }}
//                         />
//                       </i>
//                       <i>
//                         <TfiCommentsSmiley
//                           size={30}
//                           onClick={() =>
//                             navigate(`/${data?.username}/${val?._id}`)
//                           }
//                         />
//                       </i>
//                     </div>
//                   </div>
//                   {openCommentForPost === val._id && (
//                     <Comments
//                       comment={val?.comments[0]}
//                       comm={val?.comments}
//                       toggleComment={toggleCommentBox}
//                       setToggleComPost={setToggleComPost}
//                     />
//                   )}
//                 </div>
//               ))}
//           </div>
//         </div>
//       </div>
//     </>
//   );
// };

// export default Post;
