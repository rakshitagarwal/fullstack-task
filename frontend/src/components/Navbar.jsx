import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import AppBar from "@material-ui/core/AppBar";
import Toolbar from "@material-ui/core/Toolbar";
import Typography from "@material-ui/core/Typography";
import MenuIcon from "@material-ui/icons/Menu";
import Button from "@material-ui/core/Button";
import useMediaQuery from "@mui/material/useMediaQuery";
import { List, ListItem, ListItemText, Collapse } from "@mui/material";
import ExpandLess from "@mui/icons-material/ExpandLess";
import ExpandMore from "@mui/icons-material/ExpandMore";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
    position: "fixed", // Make navbar fixed
    width: "100%", // Set navbar width to 100%
    zIndex: theme.zIndex.drawer + 1, // Ensure the navbar appears above other content
  },
  menuButton: {
    marginRight: theme.spacing(2),
  },
}));

export default function Navbar() {
  const classes = useStyles();
  const small = useMediaQuery("(max-width:600px)");
  const full = useMediaQuery("(min-width:600px)");

  const [open, setOpen] = useState(false);

  const handleClick = () => {
    setOpen(!open);
  };

  return (
    <div className={classes.root}>
      <AppBar position="static">
        <Toolbar variant="dense" style={{ justifyContent: "space-between" }}>
          {small && (
            <>
              <List>
                <ListItem button>
                  <Button onClick={handleClick}>
                    <MenuIcon />
                    {open ? <ExpandLess /> : <ExpandMore />}
                  </Button>
                  <Typography
                    variant="h6"
                    color="inherit"
                    onClick={() => {
                      setOpen(false);
                    }}
                  >
                    Full Stack task
                  </Typography>
                </ListItem>
                <Collapse in={open} timeout="auto" unmountOnExit>
                  <List component="div" disablePadding>
                    <ListItem button>
                      <ListItemText primary="Create Table" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Create Chart" />
                    </ListItem>
                    <ListItem button>
                      <ListItemText primary="Other Functionality" />
                    </ListItem>
                  </List>
                </Collapse>
              </List>
            </>
          )}

          {full && (
            <>
              <Typography variant="h6" color="inherit">
                Aimbrill
              </Typography>
              <Button color="inherit">Create Table</Button>
              <Button color="inherit">Create Chart</Button>
              <Button color="inherit">Other Functionality</Button>
            </>
          )}
        </Toolbar>
      </AppBar>
    </div>
  );
}
