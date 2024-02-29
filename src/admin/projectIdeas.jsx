import React from "react";
import Header from "../components/Header";
import {
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Paper,
  Link,
  Button,
  Typography,
  usePagination,
  Pagination,
} from "@mui/material";
import { useEffect, useState } from "react";

const projectIdeas = () => {
  const [getRows, setRows] = useState([]);
  const { items, currentPage, setCurrentPage, totalPages } =
    usePagination(getRows);
  const handleChange = (event, value) => {
    setCurrentPage(value);
  };
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/rounds", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setRows(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <div>
      <Header />
      <Typography
        fontFamily={"monospace"}
        fontWeight="700"
        letterSpacing={"0.3rem"}
        marginTop="120px"
        textAlign="center"
        variant="h4"
      >
        Project Entries
      </Typography>
      <TableContainer sx={{ marginTop: 5 }} component={Paper}>
        <Table sx={{ minWidth: 650 }} aria-label="simple table">
          <TableHead>
            <TableRow>
              <TableCell sx={{ color: "black" }}>S.NO</TableCell>
              <TableCell sx={{ color: "black" }}>Team Name</TableCell>
              <TableCell sx={{ color: "black" }}>Project Description</TableCell>
              <TableCell sx={{ color: "black" }}>
                Round1 Presentation Name
              </TableCell>
              <TableCell sx={{ color: "black" }}>Round2 SourceCode</TableCell>
              <TableCell sx={{ color: "black" }}>Round2 Presentation</TableCell>
              <TableCell sx={{ color: "black" }}>
                Round3 Final Presentation
              </TableCell>
            </TableRow>
          </TableHead>
          <TableBody>
            {getRows.map((row, index) => (
              <TableRow
                key={index}
                sx={{ "&:last-child td, &:last-child th": { border: 0 } }}
              >
                <TableCell component="th" scope="row">
                  {row.id}
                </TableCell>
                <TableCell>{row.Team_Name}</TableCell>
                <TableCell>{row.Project_Description}</TableCell>
                <TableCell>
                  <Button variant="text">
                    <Link rel="noopener" download underline="none">
                      {row.Round1_Presentation_Name}
                    </Link>
                  </Button>
                </TableCell>
                <TableCell>{row.Round2_SourceCode}</TableCell>
                <TableCell>{row.Round2_Presentation}</TableCell>
                <TableCell>{row.Round3_Final_Presentation}</TableCell>
              </TableRow>
            ))}
          </TableBody>
        </Table>
      </TableContainer>

      <Pagination
        size="large"
        sx={{ marginTop: 5 }}
        boundaryCount={2}
        showFirstButton
        showLastButton
        count={totalPages}
        page={currentPage}
        onChange={handleChange}
        variant="text"
        color="primary"
        shape="rounded"
      />
    </div>
  );
};

export default projectIdeas;
