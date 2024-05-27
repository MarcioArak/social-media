import React, { useState } from "react";
import "./update.scss";
import CloudUploadIcon from "@mui/icons-material/CloudUpload";
import { useQueryClient, useMutation } from "@tanstack/react-query";
import { makeRequest } from "../../axios";
import IconButton from "@mui/material/IconButton";
import TextField from "@mui/material/TextField";
import Visibility from "@mui/icons-material/Visibility";
import VisibilityOff from "@mui/icons-material/VisibilityOff";

const Update = ({ setOpenUpdate, user }) => {
  const [cover, setCover] = useState(null);
  const [profile, setProfile] = useState(null);
  const [texts, setTexts] = useState({
    name: user.name,
    email: user.email,
    password: user.password,
    city: user.city,
    website: user.website,
  });

  const [openCredential, setOpenCredential] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [credentials, setCredentials] = useState({
    username: user.username,
    password: "",
    newPassword: "",
    confirmPassword: "",
  });

  const [err1, setErr1] = useState(false);
  const [err2, setErr2] = useState(false);

  const upload = async (file) => {
    try {
      const formData = new FormData();
      formData.append("file", file);
      const res = await makeRequest.post("/upload", formData);
      return res.data;
    } catch (err) {
      console.log(err);
    }
  };

  const queryClient = useQueryClient();

  // Mutations
  // Copied and updated from the website the tanstack mutation
  const mutation = useMutation({
    mutationFn: (user) => {
      return makeRequest.put("/users", user);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["user"] });
    },
  });

  const credMutation = useMutation({
    mutationFn: (password) => {
      return makeRequest.put("/credentials", password);
    },
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["credentials"] });
    },
  });

  // Handles
  const handleSubmit = async (e) => {
    e.preventDefault();
    let coverUrl;
    let profileUrl;

    coverUrl = cover ? await upload(cover) : user.coverPic;
    profileUrl = profile ? await upload(profile) : user.profilePic;

    console.log(`${process.env.REACT_APP_API_URL}/api/`);
    mutation.mutate({
      ...texts,
      coverPic: coverUrl,
      profilePic: profileUrl,
    });
    window.location.reload();
  };

  const handleCredChange = async (e) => {
    e.preventDefault();
    if (credentials.newPassword !== credentials.confirmPassword)
      return setErr2(true);
    setErr2(false);

    try {
      await makeRequest.get(
        "http://localhost:8800/api/credentials?userPass=" + credentials.password
      );
      credMutation.mutate({
        username: credentials.username,
        password: credentials.newPassword,
      });
      setErr1(false);
      window.location.reload();
    } catch (err) {
      setErr1(true);
    }
  };

  const handleClickShowPassword = () => setShowPassword((show) => !show);

  return (
    <div className="update">
      <div className="wrapper">
        <h1>Update Your Profile</h1>
        <form>
          <div className="files">
            <label htmlFor="cover">
              <span>Cover Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    cover
                      ? URL.createObjectURL(cover)
                      : "/upload/" + user.coverPic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="cover"
              style={{ display: "none" }}
              onChange={(e) => setCover(e.target.files[0])}
            />
            <label htmlFor="profile">
              <span>Profile Picture</span>
              <div className="imgContainer">
                <img
                  src={
                    profile
                      ? URL.createObjectURL(profile)
                      : "/upload/" + user.profilePic
                  }
                  alt=""
                />
                <CloudUploadIcon className="icon" />
              </div>
            </label>
            <input
              type="file"
              id="profile"
              style={{ display: "none" }}
              onChange={(e) => setProfile(e.target.files[0])}
            />
          </div>
          <div className="textField">
            {!openCredential ? (
              <>
                <TextField
                  label="Name"
                  value={texts.name}
                  onChange={(e) => setTexts({ ...texts, name: e.target.value })}
                />
                <TextField
                  label="Email"
                  value={texts.email}
                  onChange={(e) =>
                    setTexts({ ...texts, email: e.target.value })
                  }
                />
                <TextField
                  label="City"
                  value={texts.city}
                  onChange={(e) => setTexts({ ...texts, city: e.target.value })}
                />
                <TextField
                  label="Website"
                  value={texts.website}
                  onChange={(e) =>
                    setTexts({ ...texts, website: e.target.value })
                  }
                />
                <button className="updateButton" onClick={handleSubmit}>
                  Update
                </button>
              </>
            ) : (
              <>
                <TextField
                  required
                  error={err1 && true}
                  label="Current Password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.password}
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
                  onChange={(e) =>
                    setCredentials({ ...credentials, password: e.target.value })
                  }
                  helperText={
                    err1
                      ? "Incorrect password"
                      : "Password required to change credentials"
                  }
                />
                <TextField
                  label="Username"
                  value={credentials.username}
                  onChange={(e) =>
                    setCredentials({ ...credentials, username: e.target.value })
                  }
                />
                <TextField
                  label="New Password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.newPassword}
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
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      newPassword: e.target.value,
                    })
                  }
                />
                <TextField
                  required
                  error={err2 && true}
                  label="Current Password"
                  type={showPassword ? "text" : "password"}
                  value={credentials.confirmPassword}
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
                  onChange={(e) =>
                    setCredentials({
                      ...credentials,
                      confirmPassword: e.target.value,
                    })
                  }
                  helperText={
                    err2 ? "Password does not match" : "Confirm password"
                  }
                />
                <button className="updateButton" onClick={handleCredChange}>
                  Update
                </button>
              </>
            )}
          </div>
        </form>

        {!openCredential ? (
          <button className="button" onClick={() => setOpenCredential(true)}>
            Change Login
          </button>
        ) : (
          <button className="button" onClick={() => setOpenCredential(false)}>
            Go Back
          </button>
        )}
        <button className="close" onClick={() => setOpenUpdate(false)}>
          close
        </button>
      </div>
    </div>
  );
};

export default Update;

// NOTES
// **This works with <input> but not with <textField>**
//
// const [texts, setTexts] = useState({
//   name: user.name,
//   email: user.email,
//   password: user.password,
//   city: user.city,
//   website: user.website,
// });

// const handleChange = (e) => {
//   setTexts((prev) => ({ ...prev, [e.target.name]: [e.target.value] }));
// };
