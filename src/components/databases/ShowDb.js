import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { useDispatch, useSelector } from "react-redux";
import { getDb } from "../../store/DbActions";

const TableStyle = styled(Table)`
  min-width: 650px;
`;

const ShowDb = () => {
  const dispatch = useDispatch();
  const databases = useSelector((state) => state.dbReducers.databases);

  React.useEffect(() => {
    dispatch(getDb());
  }, []);

  return (
    <TableContainer component={Paper}>
      <TableStyle aria-label="simple table">
        <TableHead>
          <TableRow>
            <TableCell>Name</TableCell>
          </TableRow>
        </TableHead>
        <TableBody>
          {databases.map((row) => (
            <TableRow key={row}>
              <TableCell component="th" scope="row">
                {row}
              </TableCell>
            </TableRow>
          ))}
        </TableBody>
      </TableStyle>
    </TableContainer>
  );
};

export default ShowDb;
