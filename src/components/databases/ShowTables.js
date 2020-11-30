import React from "react";
import Table from "@material-ui/core/Table";
import TableBody from "@material-ui/core/TableBody";
import TableCell from "@material-ui/core/TableCell";
import TableHead from "@material-ui/core/TableHead";
import TableRow from "@material-ui/core/TableRow";
import Typography from "@material-ui/core/Typography";
import Box from "@material-ui/core/Box";
import Collapse from "@material-ui/core/Collapse";
import IconButton from "@material-ui/core/IconButton";
import KeyboardArrowDownIcon from "@material-ui/icons/KeyboardArrowDown";
import KeyboardArrowUpIcon from "@material-ui/icons/KeyboardArrowUp";
import { Link } from "react-router-dom";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import MoreVertIcon from "@material-ui/icons/MoreVert";
import {
  deleteRow,
  dropTable,
  getColumns,
  getRows,
  getTables,
} from "../../store/TableActions";
import { useDispatch, useSelector } from "react-redux";
import { useLocation } from "react-router-dom";
import queryString from "query-string";
import { Button } from "@material-ui/core";

const ShowTables = () => {
  const location = useLocation();
  const nameDb = queryString.parse(location.search);

  const handleClick = (event, row) => {
    setAnchorEl(event.currentTarget);
    setIsOpen({
      [row]: !isOpen[row],
    });
  };

  const handleClose = (row) => {
    setIsOpen({
      [row]: false,
    });
    setAnchorEl(null);
  };

  const handleCloseDelDb = (db, name) => {
    setIsOpen({
      [name]: false,
    });
    setAnchorEl(null);
    dispatch(dropTable(db, name));
  };

  const ITEM_HEIGHT = 48;

  const [collapse, setCollapse] = React.useState({});

  const [anchorEl, setAnchorEl] = React.useState(null);
  const [isOpen, setIsOpen] = React.useState({});

  const dispatch = useDispatch();

  const tables = useSelector((state) => state.tableReducers.tables);
  const cols = useSelector((state) => state.tableReducers.cols);
  const records = useSelector((state) => state.tableReducers.rows);

  React.useEffect(() => {
    dispatch(getTables(nameDb.name));
  }, []);

  const handleCollapse = (row) => {
    setCollapse({ [row]: !collapse[row] });
    dispatch(getColumns(nameDb.name, row));
    dispatch(getRows(nameDb.name, row));
  };

  const handleButton = (row, key, value) => {
    dispatch(deleteRow(nameDb.name, row, key, value));
  };

  return (
    <React.Fragment>
      <TableBody>
        {tables.map((row) => (
          <>
            <TableRow>
              <TableCell>
                <IconButton
                  aria-label="expand row"
                  size="small"
                  onClick={() => handleCollapse(row)}
                >
                  {collapse[row] ? (
                    <KeyboardArrowUpIcon />
                  ) : (
                    <KeyboardArrowDownIcon />
                  )}
                </IconButton>
              </TableCell>
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
                  id="long-menu"
                  anchorEl={anchorEl}
                  keepMounted
                  open={isOpen[row]}
                  onClose={() => handleClose(row)}
                  PaperProps={{
                    style: {
                      maxHeight: ITEM_HEIGHT * 4.5,
                    },
                  }}
                >
                  <MenuItem onClick={() => handleCloseDelDb(nameDb.name, row)}>
                    Delete table
                  </MenuItem>
                  <Link
                    to={`/addRow?table=${row}&db=${nameDb.name}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleClose}>Add new row</MenuItem>
                  </Link>
                  <Link
                    to={`/addIndex?table=${row}&db=${nameDb.name}`}
                    style={{ textDecoration: "none", color: "black" }}
                  >
                    <MenuItem onClick={handleClose}>Add index</MenuItem>
                  </Link>
                </Menu>
              </TableCell>
            </TableRow>
            <TableRow>
              <TableCell
                style={{ paddingBottom: 0, paddingTop: 0 }}
                colSpan={6}
              >
                <Collapse in={collapse[row]} timeout="auto" unmountOnExit>
                  <Box margin={1}>
                    <Typography variant="h6" gutterBottom component="div">
                      Data
                    </Typography>
                    <Table size="small" aria-label="purchases">
                      <TableHead>
                        <TableRow>
                          {cols &&
                            cols.length > 0 &&
                            cols.map((col) => <TableCell>{col}</TableCell>)}
                        </TableRow>
                      </TableHead>
                      <TableBody>
                        {Object.keys(records).map((key) => (
                          <>
                            <TableRow>
                              <TableCell>{key}</TableCell>
                              {records[key].split("#").map((c) => (
                                <TableCell>{c}</TableCell>
                              ))}
                              <TableCell>
                                <Button
                                  variant="contained"
                                  color="primary"
                                  onClick={() =>
                                    handleButton(row, key, records[key])
                                  }
                                >
                                  Delete row
                                </Button>
                              </TableCell>
                            </TableRow>
                          </>
                        ))}
                      </TableBody>
                    </Table>
                  </Box>
                </Collapse>
              </TableCell>
            </TableRow>
          </>
        ))}
      </TableBody>
    </React.Fragment>
  );
};

export default ShowTables;
