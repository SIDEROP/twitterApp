import React, { useEffect, useState } from "react";
import { userCreate, userLogin, userProtected } from "../app/clices/userSlice";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { Toaster } from "react-hot-toast";

const Signup = () => {
  let usenav = useNavigate()
  const dispatch = useDispatch();
  let { loading } = useSelector((pre) => pre.app);
  // State for form data and form errors
  const [formData, setFormData] = useState({
    name: "",
    username: "@",
    email: "",
    password: "",
    bio: "",
    image: "",
  });

  const [formErrors, setFormErrors] = useState({
    nameError: "",
    usernameError: "",
    emailError: "",
    passwordError: "",
  });

  // Function to handle input change
  const handleInputChange = (event) => {
    const { name, value, type, files } = event.target;

    if (type === "file") {
      setFormData({ ...formData, image: files[0] });
      return;
    }

    if (name === "email") {
      if (!value || !/\S+@\S+\.\S+/.test(value)) {
        setFormErrors({ ...formErrors, emailError: "Invalid email address" });
      } else {
        setFormErrors({ ...formErrors, emailError: "" });
      }
    } else if (name === "password") {
      if (!value || value.length < 6) {
        setFormErrors({
          ...formErrors,
          passwordError: "Password must be at least 6 characters long",
        });
      } else {
        setFormErrors({ ...formErrors, passwordError: "" });
      }
    }

    setFormData({ ...formData, [name]: value });
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    const formDataToSend = new FormData();
    formDataToSend.append("name", formData.name);
    formDataToSend.append("username", formData.username);
    formDataToSend.append("email", formData.email);
    formDataToSend.append("password", formData.password);
    formDataToSend.append("bio", formData.bio);
    formDataToSend.append("image", formData.image);

    dispatch(userCreate(formDataToSend)).then(() => {
      dispatch(
        userLogin({ email: formData.email, password: formData.password })
      ).then(() => {
        dispatch(userProtected()).then(()=>usenav("/"))
      });
    });
  };

  return (
    <div id="singup">
      <form
        
        className="position-relative w-100 d-flex flex-column align-items-center justify-content-center gap-0"
        onSubmit={handleSubmit}
      >
        <div>
          <h5>Sign Up</h5>
          <Toaster/>
        </div>
        <div className="userInpu w-100 position-relative">
          <h5>Full Name</h5>
          <input
            type="text"
            name="name"
            value={formData.name}
            onChange={handleInputChange}
          />
          {formErrors.nameError && <span>{formErrors.nameError}</span>}
        </div>

        <div className="userInpu w-100 position-relative">
          <h5>Username</h5>
          <input
            type="text"
            name="username"
            value={formData.username}
            onChange={handleInputChange}
          />
          {formErrors.usernameError && <span>{formErrors.usernameError}</span>}
        </div>

        <div className="userInpu w-100 position-relative">
          <h5>Email</h5>
          <input
            type="text"
            name="email"
            value={formData.email}
            onChange={handleInputChange}
          />
          {formErrors.emailError && <span>{formErrors.emailError}</span>}
        </div>

        <div className="userInpu w-100 position-relative">
          <h5>Password</h5>
          <input
            type="password"
            name="password"
            value={formData.password}
            onChange={handleInputChange}
          />
          {formErrors.passwordError && <span>{formErrors.passwordError}</span>}
        </div>

        <div className="userInpu w-100 position-relative">
          <h5>Bio</h5>
          <textarea
            className="w-100"
            name="bio"
            value={formData.bio}
            onChange={handleInputChange}
          />
        </div>

        <div className="userInput w-100 position-relative">
          <h5>Image Upload</h5>
          <input
            className="imgInpu"
            type="file"
            name="image"
            onChange={handleInputChange}
          />
        </div>

        <div className="Button w-100 position-relative d-flex justify-content-center align-items-center">
          <button type="submit" className="btn">
            {loading ? "..." : "Sign Up"}
          </button>
        </div>
      </form>
    </div>
  );
};

export default Signup;
