import { useState } from "react";
import axios from "axios";
import { useNavigate } from "react-router-dom";
import TextField from "@mui/material/TextField";
import Button from "@mui/material/Button";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import "@fontsource/roboto/300.css";
import "@fontsource/roboto/400.css";
import "@fontsource/roboto/500.css";
import "@fontsource/roboto/700.css";

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

function Login({ setLocation }) {
  const navigate = useNavigate();

  const [loginInput, setLoginInput] = useState({
    email: "",
    password: "",
  });

  function handleChange(event) {
    const { name, value } = event.target;
    setLoginInput((prev) => ({
      ...prev,
      [name]: value,
    }));
  }

  async function handleClick(evt) {
    // authenticate user if in database
    evt.preventDefault();

    if (!loginInput) return;

    const loginLink = `https://noteit-api.onrender.com/login`;

    await axios
      .post(loginLink, loginInput)
      .then((response) => {
        console.log(`Response from server ${response.status}`);

        if (response.status === 200) {
          console.log("User Authenticated");
          setLocation(`${loginInput.email}`);
          navigate("/notes/" + response.data);
        }
      })
      .catch((e) => {
        if (e.response.status === 404) {
          console.log(e.message);
        } else {
          console.log(e);
        }
      });
  }

  return (
    <div
      className="d-flex justify-content-center flex-column flex align-items-center"
      style={{ height: "80vh", width: "100vw" }}
    >
      <h2 className="h2">
        Login to 📒
        <span style={{ fontFamily: "McLaren, cursive", fontWeight: "bold" }}>
          Take Notes
        </span>
      </h2>
      <form className="d-flex justify-content-center flex-column flex align-items-center ">
        <ThemeProvider theme={theme}>
          <TextField
            fullWidth
            id="standard-basic"
            label="Email"
            variant="standard"
            size="normal"
            className="mt-5"
            type="email"
            name="email"
            placeholder="email@email.com"
            onChange={handleChange}
          />
          <TextField
            fullWidth
            size="medium"
            id="standard-basic"
            label="Password"
            variant="standard"
            type="password"
            name="password"
            placeholder="password"
            onChange={handleChange}
            className="mb-4"
          />
          <div>
            <Button
              className="me-4"
              variant="contained"
              theme={theme}
              onClick={handleClick}
            >
              Login
            </Button>

            {/* if user wants to register then navigate to register page */}
            <Button
              variant="contained"
              theme={theme}
              onClick={() => navigate("/register")}
            >
              Register
            </Button>
          </div>
        </ThemeProvider>
      </form>
    </div>
  );
}

export default Login;
