import * as React from "react";
import { useEffect, useState } from "react";
import { DataGrid } from "@mui/x-data-grid";
import { Typography, Box } from "@mui/material";

import Header from "../components/Header";
const columns = [
  { field: "id", headerName: "S.No", width: 120 },
  { field: "Team_Name", headerName: "Team name", width: 190 },
  { field: "Project_Title", headerName: "Project groups", width: 120 },
  { field: "Project_Description", headerName: "Team ID", width: 120 },
  { field: "Leader_Name", headerName: "TeamName/TeamEmail", width: 350 },
  { field: "Member1", headerName: "MemberOne/ProjectGroup", width: 190 },
  { field: "Member2", headerName: "MemberTwo/ProjectGroup", width: 190 },
  { field: "Member3", headerName: "MemberThree/ProjectGroup", width: 198 },
  { field: "Mobile_Number", headerName: "Mobile No", width: 290 },
];

export default function ParticipantList() {
  const [getRows, setRows] = useState([]);
  useEffect(() => {
    var requestOptions = {
      method: "GET",
      redirect: "follow",
    };

    fetch("http://10.64.29.214:8080/api/teams", requestOptions)
      .then((response) => response.json())
      .then((result) => {
        // console.log(result);
        setRows(result);
      })
      .catch((error) => console.log("error", error));
  }, []);
  return (
    <>
      <Header />
      <Box sx={{ height: 400, width: "100%",marginTop:20 }}>
        <Typography
          fontFamily={"monospace"}
          fontWeight="700"
          letterSpacing={"0.3rem"}
          marginY="40px"
          textAlign="center"
          variant="h4"
        >
          List of Participants
        </Typography>
        <DataGrid
          autoHeight
          rows={getRows}
          columns={columns}
          initialState={{
            pagination: {
              paginationModel: { pageSize: 5 },
            },
          }}
          pageSizeOptions={[5]}
        />
      </Box>
    </>
  );
}
