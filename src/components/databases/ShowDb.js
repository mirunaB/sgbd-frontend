import React, { useState } from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableContainer from "@material-ui/core/TableContainer";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Paper from "@material-ui/core/Paper";
import styled from "styled-components";
import { Button } from "@material-ui/core";
import { useDispatch, useSelector } from "react-redux";
import { getDb } from "../../store/DbActions";
import IconButton from "@material-ui/core/IconButton";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import { Link } from "react-router-dom";
import { dropDb } from "../../store/DbActions";

const TableStyle = styled(Table)`
  min-width: 650px;
`;

const TableContainerStyle = styled(TableContainer)`
  margin-bottom: 10px;
  margin-top: 10px;
`;

const ITEM_HEIGHT = 48;

const ShowDb = () => {
  const dispatch = useDispatch();
  const databases = useSelector((state) => state.dbReducers.databases);

  React.useEffect(() => {
    dispatch(getDb());
  }, []);

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState({});

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setIsOpen({
      [row]: !isOpen[row],
    });
  };

  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  const handleCloseDelDb = (name) => {
    setIsOpen(false);
    setAnchorEl(null);
    dispatch(dropDb(name));
  };

  return (
    <>
      <TableContainerStyle component={Paper}>
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
                <TableCell component="th" scope="row">
                  <IconButton
                    aria-label="more"
                    aria-controls="long-menu"
                    aria-haspopup="true"
                    onClick={(e) => handleClick(e, row)}
                  >
                    <MoreVertIcon />
                  </IconButton>
                  <Menu
                    id={`long-menu-${row}`}
                    anchorEl={anchorEl}
                    open={isOpen[row]}
                    onClose={handleClose}
                    PaperProps={{
                      style: {
                        maxHeight: ITEM_HEIGHT * 4.5,
                      },
                    }}
                  >
                    <MenuItem onClick={() => handleCloseDelDb(row)}>
                      Delete database
                    </MenuItem>
                    <Link
                      to={`/addTable?name=${row}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <MenuItem onClick={handleClose}>
                        Add new table to database
                      </MenuItem>
                    </Link>
                    <Link
                      to={`/getTables?name=${row}`}
                      style={{ textDecoration: "none", color: "black" }}
                    >
                      <MenuItem onClick={handleClose}>
                        Show tables {row}
                      </MenuItem>
                    </Link>
                  </Menu>
                </TableCell>
              </TableRow>
            ))}
          </TableBody>
        </TableStyle>
      </TableContainerStyle>
      <Button variant="contained" color="primary" href="/addDb">
        Add new database
      </Button>
    </>
  );
};

export default ShowDb;
