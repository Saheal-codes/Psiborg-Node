import React, { useState } from "react";
import "./Style.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { useNavigate } from "react-router-dom";

const Form = (props) => {
  const Navigate = useNavigate();
  const [form, setform] = useState({
    username: "",
    password: "",
    ConfirmPassword: "",
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
    if (form.password !== form.ConfirmPassword) {
      alert("Password does not match");
      return;
    }
    if (!document.getElementsByClassName("inputField")[0].checkValidity()) {
      document.getElementsByClassName("inputField")[0].reportValidity();
      return;
    }
    axios
      .post("http://127.0.0.1:80/register", form)
      .then(() => {
        Navigate("/login");
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
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
          minLength={3}
          maxLength={20}
          type="text"
          autoComplete="off"
          name="username"
          id="username"
          onChange={inputHandler}
          value={form.username}
        />
        <label htmlFor="password">Password</label>
        <input
          required
          minLength={10}
          maxLength={20}
          type="password"
          autoComplete="off"
          name="password"
          id="password"
          onChange={inputHandler}
          value={form.password}
        />
        <label htmlFor="confirmpass">Confirm Password</label>
        <input
          required
          type="password"
          autoComplete="off"
          name="ConfirmPassword"
          id="confirmpass"
          onChange={inputHandler}
          value={form.ConfirmPassword}
        />
        <Button variant="outlined" onClick={submitHandler} id="btn">
          Register
        </Button>
        <Button variant="outlined" onClick={() => Navigate("/login")} id="btn">
          Login
        </Button>
      </form>
    </>
  );
};
export default Form;
