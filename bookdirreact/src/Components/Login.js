import React, { useState } from "react";
import "./Style.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Login = (props) => {
  const Navigate = useNavigate();
  const [form, setform] = useState({
    username: "",
    password: "",
  });
  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);
    setform({
      ...form,
      [name]: value,
    });
  };
  const submitHandler = (e) => {
    if (!document.getElementsByClassName("inputField")[0].checkValidity()) {
      document.getElementsByClassName("inputField")[0].reportValidity();
      return;
    }
    axios
      .post("http://localhost:80/login", form)
      .then((res) => {
        props.setauth(res.data.data);
        localStorage.setItem("token", res.data.token);
        Navigate("/book/create");
      })
      .catch((err) => {
        alert(
          err.response.data.message || "Something went wrong. Please try again"
        );
      });
  };
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>Your Book Directory</h1>
      </div>
      <form action="" className="inputField">
        <label htmlFor="username">Username</label>
        <input
          required
          type="username"
          autoComplete="off"
          name="username"
          id="username"
          onChange={inputHandler}
          value={form.username}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          type="password"
          autoComplete="off"
          name="password"
          id="password"
          onChange={inputHandler}
          value={form.password}
        />
        <Button variant="outlined" onClick={submitHandler} id="btn">
          LOGIN
        </Button>
      </form>
    </>
  );
};
export default Login;
