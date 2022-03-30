import React from "react";
import "./Auth.css";
import { Link, useNavigate } from "react-router-dom";
import { useState } from "react";
import axios from "axios";
import { useAuthContext } from "../../Context/AuthContext";
import { emailChecker } from "../../backend/utils/emailChecker";

function Login() {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({ email: "", password: "" });
  const { setToken, setUser } = useAuthContext();

  const loginFormHandler = (e) => {
    e.preventDefault();

    if (emailChecker.test(formData.email)) {
      (async () => {
        try {
          const {
            status,
            data: { encodedToken, foundUser },
          } = await axios.post("/api/auth/login", formData);
          localStorage.setItem("login-Token", encodedToken);
          localStorage.setItem("user", JSON.stringify(foundUser));

          if (status === 200) {
            setToken(encodedToken);
            setUser(foundUser);

            if (encodedToken) {
              navigate("/videolisting");
            }
          }
        } catch (error) {
          console.log(error);
        }
      })();
    } else if (!emailChecker.test(formData.email)) {
      console.log("not valid email");
    }
  };
  return (
    <>
      <form onClick={(e) => loginFormHandler(e)}>
        <div className="auth-container">
          <div className="signup-container">
            <h1>Login</h1>
            <hr />
            <label>
              <b>Email address</b>
            </label>
            <input
              type="text"
              placeholder="Enter Email"
              name="email"
              value={formData.email}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  email: event.target.value,
                }))
              }
              autoComplete="true"
              required
            />

            <label>
              <b>Password</b>
            </label>
            <input
              type="password"
              placeholder="*******"
              name="psw"
              value={formData.password}
              onChange={(event) =>
                setFormData((prev) => ({
                  ...prev,
                  password: event.target.value,
                }))
              }
              autoComplete="true"
              required
            />

            <label>
              <input
                type="checkbox"
                name="remember"
                style={{ marginBottom: "15px" }}
              />
              Remember me
            </label>

            <div className="clearfix">
              <button type="submit" className="signupbtn anchor-btn">
                Login
              </button>
            </div>

            <div className="have-account">
              <Link to="/signup">Don't have an account ? </Link>
            </div>
          </div>
        </div>
      </form>
    </>
  );
}

export { Login };
