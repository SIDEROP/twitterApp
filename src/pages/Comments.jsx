import React, { useState } from "react";
import { TfiGallery } from "react-icons/tfi";
import { CommentCreate } from "../app/clices/Comment.Slice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate, useParams } from "react-router-dom";
import { getUserPost, postGet } from "../app/clices/postSlice";
import { IoMdArrowRoundBack } from "react-icons/io";

const Comments = ({params}) => {
  let usepar = useParams();
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

    dispatch(
      CommentCreate({
        user: data?._id,
        post: usepar?.postId,
        content: inputValue?.content,
      })
    ).then(() =>
      dispatch(getUserPost(data?._id)).then(
        () =>
          setInputValue({
            user: data?._id,
            content: "",
            file: null,
            fileType: "",
          }),
        navigate(`/${params || data?.username}`)
      )
    );
  };
  return (
    <div className="UserCommets">
      <div className="post d-flex justify-content-center align-items-center">
        <form className="postU" onSubmit={handleSubmit}>
          <span className="btnBack">
            <IoMdArrowRoundBack size={25} onClick={()=>navigate(`/${params || data?.username}`)}/>
          </span>
          <div className="proUserData d-flex align-items-center gap-2">
            <img
              src={data.img_url}
              alt="User Profile"
              onClick={() => navigate("/siderop")}
            />
            <div className="d-flex flex-column">
              <h6 className="m-0 p-0">{data?.name}</h6>
              <span>@{data?.username}</span>
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
              {loading ? "..." : "commets"}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

export default Comments;
