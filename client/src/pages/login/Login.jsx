import { Link, useNavigate } from "react-router-dom";
import "./login.scss";
import { useState, useContext, useEffect } from "react";
import { AuthContext } from "../../context/authContext";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Login = () => {
  const [input, setInput] = useState({
    username: "",
    password: "",
  });
  const [showPassword, setShowPassword] = useState(false);
  const [err, setErr] = useState(null);

  useEffect(() => {
    document.title = `MeSo-Social | Login`;
  });

  const { login } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();
    try {
      await login(input);
      navigate("/meso-social/");
      setErr(null);
    } catch (err) {
      setErr(err.response.data);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="login">
      <div className="card">
        <div className="left">
          <h1>Welcome to MeSo Social.</h1>
          <p>
            Lorem ipsum dolor sit amet, consectetur adipiscing elit, sed do
            eiusmod tempor incididunt ut labore et dolore magna aliqua. Ut enim
            ad minim veniam, quis nostrud exercitation ullamco laboris nisi ut
            aliquip ex ea commodo consequat.
          </p>
          <span>Don't have an account?</span>
          <Link to="/meso-social/register">
            <button>Register</button>
          </Link>
        </div>
        <div className="right">
          <h1>Login</h1>
          <form className="form">
            <TextField
              error={err && true}
              label="Username"
              value={input.username}
              onChange={(e) => setInput({ ...input, username: e.target.value })}
            />
            <TextField
              error={err && true}
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
            <span className="error">{err && err}</span>
            <button className="loginButton" onClick={handleLogin}>
              Login
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Login;

// Login users
// name: test       pass: 1234
// name: Test2      pass: 456
// name: Ma22       pass: spidernerd
// name: Superman   pass: superman
// name: Mel96      pass: 123456
