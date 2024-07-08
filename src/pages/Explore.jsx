import React, { useState, useEffect } from "react";
import "./css/Explore.css";
import { useDispatch, useSelector } from "react-redux";
import {
  toggleFollow,
  userProtected,
  userSearch,
} from "../app/clices/userSlice";

// icons
import { FcSearch } from "react-icons/fc";
import { RiUserFollowLine } from "react-icons/ri";
import { SlUserFollow } from "react-icons/sl";

const Explore = () => {
  const { data } = useSelector((state) => state.app?.user);
  const dispatch = useDispatch();
  let { search } = useSelector((pre) => pre.app);
  const [searchQuery, setSearchQuery] = useState("");



  const handleSubmit = (event) => {
    event.preventDefault();
  };

  const handleInputChange = (event) => {
    setSearchQuery(event.target.value);
    console.log(event.target.value == "")
    if(event.target.value == ""){
      window.location.reload()
    }
    dispatch(userSearch({ userName:  searchQuery}));
  };

  return (
    <div className="Explore">
      <div className="Search">
        <form onSubmit={handleSubmit}>
          <span>
            <input
              type="text"
              placeholder="Search..."
              value={searchQuery}
              onChange={handleInputChange}
            />
            <button>
              <i>
                <FcSearch size={20} />
              </i>
            </button>
          </span>
        </form>
      </div>
      <div className="searchData">
        {search &&
          search?.map((val, i) => (
            <div className="userDataSearch" key={val?._id || i}>
              <div className="img">
                <img src={val?.img_url} />
              </div>
              <div className="searchUsername">
                <span>{val?.name}</span>
                <p>{val?.username}</p>
              </div>
              <>
                {/* toggleFollow */}

                {data?._id === val?._id ? (
                  ""
                ) : (
                  <div>
                    {data?.following.some(
                      (followingUser) => followingUser._id === val?._id
                    ) ? (
                      <i className="bg-info p-1 rounded-3">
                        <RiUserFollowLine
                          size={20}
                          onClick={() =>
                            dispatch(
                              toggleFollow({
                                userId: data?._id,
                                otherUserId: val?._id,
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
                                otherUserId: val?._id,
                              })
                            ).then(() => dispatch(userProtected()))
                          }
                        />
                      </i>
                    )}
                  </div>
                )}

                {/* toggleFollow */}
              </>
            </div>
          ))}
      </div>
    </div>
  );
};

export default Explore;
