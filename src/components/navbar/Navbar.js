import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import styled from "styled-components";

const Text = styled(Typography)`
  color: #fff;
  text-decoration: none;
`;

const Navbar = () => {
  const [isOpen, setIsOpen] = React.useState(false);
  const [anchorEl, setAnchorEl] = React.useState(null);

  const handleClick = (event) => {
    setAnchorEl(event.currentTarget);
    setIsOpen(!isOpen);
  };

  const handleClose = () => {
    setIsOpen(false);
    setAnchorEl(null);
  };

  return (
    <div>
      <AppBar position="static">
        <Toolbar>
          <Link to="/" style={{ textDecoration: "none" }}>
            <Text variant="h6">SGBD</Text>
          </Link>
          <Button
            aria-controls="simple-menu"
            style={{
              marginLeft: "auto",
              color: "#fff",
            }}
            aria-haspopup="true"
            onClick={(e) => handleClick(e)}
          >
            Options
          </Button>
          <Menu
            id="simple-menu"
            anchorEl={anchorEl}
            keepMounted
            open={isOpen}
            onClose={handleClose}
          >
            <Link to="/addDb" style={{ textDecoration: "none" }}>
              <MenuItem onClick={handleClose}>Add database</MenuItem>
            </Link>
            <Link to="/dropDb" style={{ textDecoration: "none" }}>
              <MenuItem onClick={handleClose}>Drop database</MenuItem>
            </Link>
            <Link to="/addTable" style={{ textDecoration: "none" }}>
              <MenuItem onClick={handleClose}>Add table</MenuItem>
            </Link>
            <Link to="/dropTable" style={{ textDecoration: "none" }}>
              <MenuItem onClick={handleClose}>Drop table</MenuItem>
            </Link>
            <Link to="/getDbs" style={{ textDecoration: "none" }}>
              <MenuItem onClick={handleClose}>Show databases</MenuItem>
            </Link>
            {/* <MenuItem onClick={handleClose}>Add index</MenuItem> */}
            <Link to="/select" style={{ textDecoration: "none" }}>
              <MenuItem onClick={handleClose}>Select</MenuItem>
            </Link>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
