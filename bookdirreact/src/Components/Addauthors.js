import React, { useState } from "react";
import "./Style.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { TextField } from "@mui/material";

export default function Addauthors({ setauthors, ...props }) {
  // a state for the form
  const [form, setform] = useState({
    name: "",
    dateofbirth: "",
    age: "",
  });
  // a funtion to handle the inputchange
  const inputHandler = (e) => {
    const name = e.target.name;
    const value = e.target.value;
    console.log(name, value);
    setform({
      ...form,
      [name]: value,
    });
  };
  // a function to handle the submit
  const submitHandler = (e) => {
    if (!document.getElementsByClassName("inputField")[0].checkValidity()) {
      document.getElementsByClassName("inputField")[0].reportValidity();
      return;
    }
    // send the data to the server
    axios
      .post("http://127.0.0.1:80/createauthor", {
        token: localStorage.getItem("token"),
        ...form,
      })
      .then((res) => {
        console.log(res.data);
        setauthors((a) => [...a, res.data.data]);
      })
      .catch((error) => {
        console.log(error);
      });
    // empty the form
    setform({
      name: "",
      dateofbirth: "",
      age: "",
    });
  };
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>
          Add Authors to your Book Directory Here!
        </h1>
      </div>
      <form action="" className="inputField">
        <TextField
          style={{ margin: "0.5rem", width: "100%" }}
          id="standard-basic"
          placeholder="Author Name"
          type="text"
          value={form.name}
          onChange={inputHandler}
          name="name"
        />
        <TextField
          style={{ margin: "0.5rem", width: "100%" }}
          id="standard-basic"
          placeholder="Date of Birth"
          type="date"
          value={form.dateofbirth}
          onChange={inputHandler}
          name="dateofbirth"
        />
        <TextField
          style={{ margin: "0.5rem", width: "100%" }}
          id="standard-basic"
          placeholder="Age"
          type="number"
          value={form.age}
          onChange={inputHandler}
          name="age"
        />
        <Button variant="outlined" onClick={submitHandler} id="btn">
          Save Author
        </Button>
      </form>
    </>
  );
}
