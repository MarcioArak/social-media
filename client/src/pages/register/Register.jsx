import { Link } from "react-router-dom";
import "./register.scss";
import { useState, useEffect } from "react";
import { makeRequest } from "../../axios";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Register = () => {
  const [input, setInput] = useState({
    username: "",
    email: "",
    password: "",
    name: "",
  });

  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState(null);
  const [user, setUser] = useState(null);

  useEffect(() => {
    document.title = "MeSo-Social | Register";
  });

  const handleClick = async (e) => {
    e.preventDefault();
    console.log(`${process.env.REACT_APP_API_URL}/api/`);
    try {
      await makeRequest.post("/auth/register", input);
      setUser(true);
      setErr(null);
    } catch (err) {
      setUser(false);
      setErr(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="register">
      <div className="card">
        <div className="left">
          <h1>Register</h1>
          <form>
            <TextField
              error={err}
              label="Username"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
              helperText={err ? "user already exists" : ""}
            />
            <TextField
              label="Email"
              value={input.email}
              onChange={(e) => setInput({ ...input, email: e.target.value })}
            />
            <TextField
              label="Password"
              type={showPassword ? "text" : "password"}
              value={input.password}
              InputProps={{
                endAdornment: (
                  <IconButton
                    aria-label="toggle password visibility"
                    onClick={handleClickShowPassword}
                    edge="end"
                  >
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                ),
              }}
              onChange={(e) => setInput({ ...input, password: e.target.value })}
            />
            <TextField
              label="Name"
              value={input.name}
              onChange={(e) => setInput({ ...input, name: e.target.value })}
            />
            <span>{user && "User has been created!"}</span>
            <button
              className="registerButton"
              type="submit"
              onClick={handleClick}
            >
              Register
            </button>
          </form>
        </div>
        <div className="right">
          <h1>MeSo Social</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <span>Do you have an account?</span>
          <Link to="/meso-social/login">
            <button>Login</button>
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
