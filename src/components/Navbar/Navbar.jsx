import React, { useState } from "react";
import {
  AppBar,
  Toolbar,
  IconButton,
  Typography,
  Box,
  makeStyles,
  Button,
  Tooltip,
} from "@material-ui/core";

import { AccountBox, ArrowBack, DeleteOutlined } from "@material-ui/icons";
import lupa from "../../assets/images/lupa.svg";

const useStyles = makeStyles((theme) => ({
  root: {
    flexGrow: 1,
  },
  appbar: {
    backgroundColor: "#068FE0",
    minHeight: "125px",
    justifyContent: "center",
  },

  title: { flexGrow: 1 },
  menuButton: { marginRight: theme.spacing(2) },
  generalContainer: {
    paddings: 0,
  },
  selectedBox: {
    display: "flex",
    width: "100%",
    alignItems: "center",
  },
  tooltipBox: {
    flexGrow: 1,
    textAlign: "end",
  },
  selectedText: {
    minWidth: "100px",
    marginLeft: "10%",
  },
  searchBar: {
    height: theme.spacing(4),
    borderRadius: "20px",
    borderStyle: "none",
    width: "35vw",
    padding: "0 1em 0 2.5em",
    background: `url(${lupa})`,
    backgroundColor: "#fff",
    backgroundSize: "1em",
    backgroundRepeat: "no-repeat",
    backgroundPosition: "1em 50%",
  },
}));

const Navbar = ({
  numSelected,
  handleUnselectAll,
  deleteContacts,
  selected,
  contactsList,
  handleSearchList
}) => {
  const classes = useStyles();
  

  const [search, setSearch] = useState("");

  const handleSearch = async (e) => {
    let fullname = e.target.value;

    let list = await contactsList.filter((contact) => {
      let contactName = contact.name + " " + contact.lastname;
      return contactName.toLowerCase().includes(fullname.toLowerCase());
    });

    if (list.length === 0) {
      setSearch(fullname);
      handleSearchList(contactsList);
    }

    setSearch(fullname);
    handleSearchList(list);
  };

  return (
    <AppBar className={classes.appbar} position="static">
      <Toolbar>
        {numSelected > 0 ? (
          <Box className={classes.selectedBox}>
            <Button
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="back"
              startIcon={<ArrowBack />}
              onClick={handleUnselectAll}
            >
              <Typography variant="caption">Back</Typography>
            </Button>
            <Typography className={classes.selectedText} variant="h6">
              {numSelected + " selected"}
            </Typography>
            <Box className={classes.tooltipBox}>
              <Tooltip title="Delete">
                <IconButton
                  aria-label="delete"
                  color="inherit"
                  size="large"
                  onClick={() => deleteContacts(selected)}
                >
                  <DeleteOutlined fontSize="2em" />
                </IconButton>
              </Tooltip>
            </Box>
          </Box>
        ) : (
          <>
            <IconButton
              edge="start"
              className={classes.menuButton}
              color="inherit"
              aria-label="menu"
            >
              <AccountBox />
            </IconButton>
            <Typography variant="h6">Contacts</Typography>
            <Box width="100%" display="flex" justifyContent="center">
              <input
                className={classes.searchBar}
                type="search"
                placeholder="Search for a contact"
                value={search}
                onChange={(e) => handleSearch(e)}
              />
            </Box>
          </>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
