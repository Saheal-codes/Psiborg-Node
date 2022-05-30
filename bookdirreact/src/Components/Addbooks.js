import React, { useState } from "react";
import "./Style.css";
import Button from "@mui/material/Button";
import axios from "axios";
import { MenuItem, Select } from "@mui/material";

export default function Addbooks({
  authors,
  setauthors,
  setbooks,
  refresh,
  ...props
}) {
  const [form, setform] = useState({
    book_name: "",
    authorid: "",
    publishedon: "",
    price: "",
  });
  const inputHandler = (e) => {
    console.log(e);
    console.log(e.target.name);
    console.log(e.target.value);
    const name = e.target.name;
    const value = e.target.value;
    //console.log(name, value);
    setform({
      ...form,
      [name]: value,
    });
  };
  React.useEffect(() => {
    axios
      .post("http://127.0.0.1:80/getauthors")
      .then((res) => {
        setauthors(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);
  const submitHandler = (e) => {
    // console.log(document.getElementsByClassName("inputField")[0]);
    if (!document.getElementsByClassName("inputField")[0].checkValidity()) {
      document.getElementsByClassName("inputField")[0].reportValidity();
      return;
    }
    axios
      .post("http://127.0.0.1:80/book/create/", {
        ...form,
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        refresh((prevstate) => !prevstate);
      })
      .catch((err) => {
        alert(err.response.data.message);
        console.log(err);
      });
    setform({
      book_name: "",
      authorid: "",
      publishedon: "",
      price: "",
    });
  };
  return (
    <>
      <div>
        <h1 style={{ textAlign: "center" }}>
          Add Books to your Book Directory Here!
        </h1>
      </div>
      <form action="" className="inputField">
        <label htmlFor="book_name">Book Name</label>
        <input
          label="Book Name"
          type="text"
          style={{ margin: ".5rem", padding: ".5rem", width: "95%" }}
          value={form.book_name}
          onChange={inputHandler}
          name="book_name"
        />
        <Select
          style={{ margin: ".5rem", padding: ".5rem", width: "95%" }}
          // labelId="demo-simple-select-label"
          name="authorid"
          value={form.authorid}
          label="Author"
          onChange={inputHandler}
        >
          {authors.map((options) => (
            <MenuItem value={options._id} key={options._id}>
              {options.name}
            </MenuItem>
          ))}
        </Select>

        <label htmlFor="publishedon">Published On</label>
        <input
          type="date"
          style={{ margin: ".5rem", padding: ".5rem", width: "95%" }}
          value={form.publishedon}
          onChange={inputHandler}
          name="publishedon"
        />
        <label htmlFor="price">Price</label>
        <input
          label="Price"
          type="number"
          style={{ margin: ".5rem", padding: ".5rem", width: "95%" }}
          value={form.price}
          onChange={inputHandler}
          name="price"
        />
        <Button variant="outlined" onClick={submitHandler} id="btn">
          Save Book
        </Button>
      </form>
    </>
  );
}
