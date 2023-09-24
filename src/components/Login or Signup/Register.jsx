import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import Swal from "sweetalert2";

const theme = createTheme({
  palette: {
    primary: {
      main: "#f7c742",
      light: "#f8d267",
      dark: "#ab820d",
      contrastText: "whitesmoke",
    },
  },
  typography: {
    fontFamily: "roboto",
    fontWeight: 900,
  },
});

function Register({ setLocation }) {
  const navigate = useNavigate();
  const [inputs, setInputs] = useState({
    fname: "",
    lname: "",
    email: "",
    password: "",
  });
  const [confirmPassword, setConfirmpassword] = useState("");
  function handleChange(event) {
    const { name, value } = event.target;
    setInputs((prev) => {
      return { ...prev, [name]: value };
    });
  }

  async function handleClick(event) {
    event.preventDefault();
    if (
      inputs.fname === "" ||
      inputs.lname === "" ||
      inputs.email === "" ||
      inputs.password === "" ||
      confirmPassword === ""
    ) {
      Swal.fire({
        title: "Please fill in all fields",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }
    if (inputs.password !== confirmPassword) {
      Swal.fire({
        title: "Password not matched",
        icon: "warning",
        confirmButtonText: "OK",
      });
      return;
    }

    const registerLink = "https://noteit-api-xy18.onrender.com/register";

    await axios
      .post(registerLink, inputs)
      .then((response) => {
        let data = response.data;
        let userid = data._id;
        console.log("frontend", data, "User Id", userid);
        if (response.status === 200) {
          setLocation(data.email);
          navigate("/notes/" + userid);
        }
      })
      .catch((e) => e.message);
  }

  return (
    <>
      <div
        className="d-flex justify-content-center flex-column flex align-items-center"
        style={{ height: "80vh", width: "100vw" }}
      >
        <h2 className="h2">
          Register on{" "}
          <span style={{ fontFamily: "McLaren, cursive", fontWeight: "bold" }}>
            Take Notes
          </span>
          <span> </span>
          App
        </h2>
        <form className="d-flex justify-content-center flex-column flex align-items-center ">
          <ThemeProvider theme={theme}>
            <TextField
              fullWidth
              type="text"
              name="fname"
              id="standard-basic"
              label="First name"
              variant="standard"
              className="mt-5"
              placeholder="First name"
              value={inputs.fname}
              required
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="text"
              name="lname"
              id="standard-basic"
              label="LastName"
              variant="standard"
              placeholder="Last Name"
              value={inputs.lname}
              required
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="email"
              name="email"
              id="standard-basic"
              label="Email"
              variant="standard"
              placeholder="email@email.com"
              value={inputs.email}
              required
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="password"
              name="password"
              id="standard-basic"
              label="Password"
              variant="standard"
              placeholder="Enter password"
              value={inputs.password}
              required
              onChange={handleChange}
            />
            <TextField
              fullWidth
              type="password"
              name="confirmPassword"
              id="standard-basic"
              label="Confirm Password"
              variant="standard"
              placeholder="Re-type password"
              className="mb-4"
              value={confirmPassword}
              required
              onChange={(e) => setConfirmpassword(e.target.value)}
            />

            <div>
              <Button
                onClick={handleClick}
                variant="contained"
                className="me-4"
                theme={theme}
              >
                Register
              </Button>
              <Button variant="contained" theme={theme}>
                <Link to="/" style={{ textDecoration: "none", color: "white" }}>
                  Login
                </Link>
              </Button>
            </div>
          </ThemeProvider>
        </form>
      </div>
    </>
  );
}

export default Register;
