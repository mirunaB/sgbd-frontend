import React from "react";
import { Link } from "react-router-dom";
import Button from "@material-ui/core/Button";
import Menu from "@material-ui/core/Menu";
import MenuItem from "@material-ui/core/MenuItem";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";

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
          <Link to="/">
            <Typography variant="h6">SGBD</Typography>
          </Link>
          <Button
            aria-controls="simple-menu"
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
            <Link to="/addDb">
              <MenuItem onClick={handleClose}>Add database</MenuItem>
            </Link>
            <Link to="/dropDb">
              <MenuItem onClick={handleClose}>Drop database</MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>Add table</MenuItem>
            <Link to="/dropTable">
              <MenuItem onClick={handleClose}>Drop table</MenuItem>
            </Link>
            <MenuItem onClick={handleClose}>Add index</MenuItem>
          </Menu>
        </Toolbar>
      </AppBar>
    </div>
  );
};

export default Navbar;
