import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login or Signup/Login";
import Register from "./Login or Signup/Register";
import YourNotes from "./YourNotes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../style.css";

const baseURL = "https://noteit-api-xy18.onrender.com/";
function App() {
  const [location, setLocation] = useState("");
  return (
    <div>
      {/* Render the Header and CreateArea components */}
      <BrowserRouter>
        <Header location={location} setLocation={setLocation} />

        <Routes>
          <Route
            path="/"
            element={<Login setLocation={setLocation} baseURL={baseURL} />}
          ></Route>
          <Route
            exact
            path="/register"
            element={<Register setLocation={setLocation} baseURL={baseURL} />}
          ></Route>
          <Route
            path="/notes/:id"
            element={<YourNotes setLocation={setLocation} baseURL={baseURL} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      {/* Render the Footer component */}
      <Footer />
    </div>
  );
}

export default App;
