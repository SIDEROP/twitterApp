import React, { useEffect, useState } from "react";
import "./css/Login.css";
import Singup from "../components/Singup";
import { useDispatch, useSelector } from "react-redux";
import { userLogin, userProtected } from "../app/clices/userSlice";
import { useNavigate } from "react-router-dom";
import toast, { Toaster } from "react-hot-toast";

const Login = () => {
  let usenav = useNavigate()
  let {loading,user,userErorr} = useSelector(preState=>preState.app)
  let useDis = useDispatch()
  let [toggleBtn, setToggleBtn] = useState(true);
  const [formData, setFormData] = useState({
    email: "",
    password: "",
  });

  const [formErrors, setFormErrors] = useState({
    emailError: "",
    passwordError: "",
  });

  const handleInputChange = (event) => {
    const { name, value } = event.target;
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
    if (Object.values(formErrors).some(error => error)) {
      return;
    }
    useDis(userLogin(formData)).then(()=>{
      useDis(userProtected()).then(()=>usenav("/"))
    })
  };

  

  return (
    <div className="w-100 h-100 position-relative containerImg">
      <div className="d-flex justify-content-center align-items-center w-100 h-100 position-relative">
        <div className="Login">
          {toggleBtn ? (
            <form
              className="position-relative w-100 d-flex flex-column align-items-center justify-content-center gap-3"
              onSubmit={handleSubmit}
            >
              <div>
                <h5>Login</h5>
                <Toaster/>
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
                {formErrors.passwordError && (
                  <span>{formErrors.passwordError}</span>
                )}
              </div>

              <div className="Button w-100 position-relative d-flex justify-content-center align-items-center">
                <button type="submit" className="btn">
                  {
                    loading?"...":"Login"
                  }
                </button>
              </div>
            </form>
          ) : (
            <Singup />
          )}
          <div className="SingUp">
            <button
              type="submit"
              className="btn"
              onClick={() => setToggleBtn((pre) => !pre)}
            >
              {toggleBtn ? "SingUp" : "Login"}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Login;
