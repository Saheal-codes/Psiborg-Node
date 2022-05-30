import * as React from "react";
import Table from "@mui/material/Table";
import TableBody from "@mui/material/TableBody";
import TableCell from "@mui/material/TableCell";
import TableContainer from "@mui/material/TableContainer";
import TableHead from "@mui/material/TableHead";
import TableRow from "@mui/material/TableRow";
import Paper from "@mui/material/Paper";
import "./Style.css";
import axios from "axios";
import Addbooks from "./Addbooks";
import Addauthors from "./Addauthors";
import { Button } from "@mui/material";

export default function BookTable() {
  const [books, setbooks] = React.useState([]);
  const [authors, setauthors] = React.useState([]);
  const [refresh, setrefresh] = React.useState([]);
  React.useEffect(() => {
    axios
      .post("http://127.0.0.1:80/book/read/", {
        token: localStorage.getItem("token"),
      })
      .then((res) => {
        setbooks(res.data);
        console.log(res.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, [refresh]);

  const deletehandler = (_id) => {
    axios
      .delete(`http://127.0.0.1:80/book/delete/?id=${_id}`, {
        headers: { authorization: "bearer " + localStorage.getItem("token") },
      })
      .then((res) => {
        console.log("Item deleted");
        setrefresh(!refresh);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <>
      <Addauthors setauthors={setauthors} />
      <Addbooks
        authors={authors}
        setauthors={setauthors}
        setbooks={setbooks}
        refresh={setrefresh}
      />
      <TableContainer component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell>Index</TableCell>
              <TableCell align="right">Book Name</TableCell>
              <TableCell align="right">Author Name</TableCell>
              <TableCell align="right">Published On</TableCell>
              <TableCell align="right">Price</TableCell>
              <TableCell align="right">Delete</TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {books.map((book, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {index + 1}
                </TableCell>
                <TableCell align="right">{book.book_name}</TableCell>
                <TableCell align="right">{book.authorid.name}</TableCell>
                <TableCell align="right">{book.publishedon}</TableCell>
                <TableCell align="right">{book.price}</TableCell>
                <TableCell align="right">
                  <Button
                    variant="outlined"
                    size="small"
                    onClick={() => deletehandler(book._id)}
                  >
                    Delete
                  </Button>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>
    </>
  );
}
