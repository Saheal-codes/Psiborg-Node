import React, { useEffect, useState } from "react";
import "./App.css";
import Form from "./Components/Register";
import {
  BrowserRouter as Router,
  Navigate,
  Route,
  Routes,
} from "react-router-dom";
import Login from "./Components/Login";
import axios from "axios";
import BookTable from "./Components/Userpage";

function App() {
  const [auth, setauth] = useState();
  useEffect(() => {
    const token = localStorage.getItem("token");
    if (token) {
      axios
        .post("http://localhost:80/verifytoken", { token })
        .then((res) => {
          setauth(true);
        })
        .catch((err) => {
          console.log(err);
        });
    }
  }, []);

  let routes;

  if (auth) {
    routes = (
      <Router>
        <Routes>
          <Route path="*" element={<Navigate to={"/user"} />} />
          <Route path="/user" element={<BookTable />} />
        </Routes>
      </Router>
    );
  } else {
    routes = (
      <Router>
        <Routes>
          <Route path="/" element={<Navigate to={"/register"} />} />
          <Route path="/register" element={<Form />} />
          <Route path="/login" element={<Login setauth={setauth} />} />
        </Routes>
      </Router>
    );
  }

  return (
    <>
      <main>{routes}</main>
    </>
  );
}

export default App;
