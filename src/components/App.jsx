import React, { useState } from "react";
import Header from "./Header";
import Footer from "./Footer";
import Login from "./Login or Signup/Login";
import Register from "./Login or Signup/Register";
import YourNotes from "./YourNotes";
import { BrowserRouter, Routes, Route } from "react-router-dom";

import "../style.css";

function App() {
  const [location, setLocation] = useState("");
  return (
    <div>
      {/* Render the Header and CreateArea components */}
      <BrowserRouter>
        <Header location={location} setLocation={setLocation} />

        <Routes>
          <Route path="/" element={<Login setLocation={setLocation} />}></Route>
          <Route
            exact
            path="/register"
            element={<Register setLocation={setLocation} />}
          ></Route>
          <Route
            path="/notes/:id"
            element={<YourNotes setLocation={setLocation} />}
          ></Route>
        </Routes>
      </BrowserRouter>
      {/* Render the Footer component */}
      <Footer />
    </div>
  );
}

export default App;
