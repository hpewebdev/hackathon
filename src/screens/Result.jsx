import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";
import Header from "../components/Header";
const columns = [
  { field: "id", headerName: "Team Rank", width: 110 },
  { field: "Team_Name", headerName: "Team Name", width: 170 },
  { field: "Round_Num", headerName: "Round No", width: 170 },
  { field: "Innovation", headerName: "Innovation", width: 170 },
  { field: "Complexity", headerName: "Complexity", width: 170 },
  { field: "Impact", headerName: "Impact", width: 170 },
  { field: "Feasibility", headerName: "Feasibility", width: 170 },
  { field: "Presentation", headerName: "Presentation", width: 170 },
  { field: "Project_Title", headerName: "Project_Title", width: 170 },
  {
    field: "Project_Description",
    headerName: "Project_Description",
    width: 170,
  },
  { field: "TotalScore", headerName: "TotalScore", width: 170 },
];
export default function Result() {
  const [getRows, setRows] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/scoreboard", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setRows(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      <Header sx={{ marginTop: 20 }}></Header>

      <Box sx={{ marginTop: 20 }} style={{ height: 595, width: "100%" }}>
        <Typography
          fontFamily={"monospace"}
          fontWeight="700"
          letterSpacing={"0.3rem"}
          marginY="50px"
          textAlign="center"
          variant="h4"
        >
          SCOREBOARD
        </Typography>
        <DataGrid
          autoHeight
          textAlign="center"
          rows={getRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { page: 0, pageSize: 8 },
            },
          }}
          pageSizeOptions={[5, 8]}
        />
      </Box>
    </>
  );
}
