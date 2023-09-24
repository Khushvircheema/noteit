import React from "react";
import Button from "@mui/material/Button";
import { createTheme } from "@mui/material/styles";
import { useNavigate } from "react-router-dom";

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
function Header({ location, setLocation }) {
  const navigate = useNavigate();
  function handleClick() {
    navigate("/");
  }
  return (
    <header>
      {/* Display the title of the app */}
      <h1 onClick={handleClick}>Take Notes</h1>
      <div className="headerButtons">
        {location && (
          <>
            <p
              style={{
                margin: "0px",
                color: "whitesmoke",
                fontWeight: "600",
                fontSize: "1.5rem",
              }}
            >
              {location}
            </p>

            <Button
              className="me-4"
              variant="contained"
              theme={theme}
              onClick={() => {
                navigate("/");
                setLocation("");
              }}
            >
              SignOut
            </Button>
          </>
        )}
      </div>
    </header>
  );
}

export default Header;
