import React, { useState, useEffect } from "react";
import {
  makeStyles,
  Paper,
  Box,
  Table,
  TableBody,
  TableCell,
  TableContainer,
  TableHead,
  TableRow,
  Typography,
  Fab,
} from "@material-ui/core";
import Contact from "./Contact/Contact";
import AddContactModal from "./Modal/ModalContact";
import Navbar from "../Navbar/Navbar";
import { PersonAddOutlined } from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  paper: {
    backgroundColor: "#eee",
    display: "flex",
    justifyContent: "center",
    flexWrap: "wrap",
  },
  fabButtonBox: {
    position: "relative",
    width: "100%",
    display: "flex",
    justifyContent: "flex-end",
  },
  fabButton: {
    position: "fixed",
    backgroundColor: "#068FE0",
    color: "#fff",
    zIndex: 1000000,
    bottom: 16,
    right: 16,
    "&:hover": {
      color: "#068FE0",
      backgroundColor: "#fff",
    },
  },
}));

const headCells = ["", "", "Name", "Email", "Phone", "", ""];

const Contacts = () => {
  const classes = useStyles();
  const [contactsList, setContactsList] = useState([]);
  const [searchList, setSearchList] = useState([]);
  const [selected, setSelected] = useState([]);
  const [open, setOpen] = useState(false);

  const fetchData = async () => {
    const data = await fetch("/users");
    const users = await data.json();
    const usersJson = await users;
    setContactsList(usersJson);
    setSearchList(usersJson);
  };

  useEffect(() => {
    fetchData();
  }, [setContactsList, setSearchList]);

  const isSelected = (id) => selected.indexOf(id) !== -1;

  const handleClick = (event, id) => {
    const selectedIndex = selected.indexOf(id);
    let newSelected = [];

    if (selectedIndex === -1) {
      newSelected = newSelected.concat(selected, id);
    } else if (selectedIndex === 0) {
      newSelected = newSelected.concat(selected.slice(1));
    } else if (selectedIndex === selected.length - 1) {
      newSelected = newSelected.concat(selected.slice(0, -1));
    } else if (selectedIndex > 0) {
      newSelected = newSelected.concat(
        selected.slice(0, selectedIndex),
        selected.slice(selectedIndex + 1)
      );
    }

    setSelected(newSelected);
  };

  const handleUnselectAll = () => {
    setSelected([]);
  };

  const handleSearchList = (list) => {
    setSearchList(list)
  };

  const propagation = (e) => {
    e.stopPropagation();
  };

  const handleOpen = (e) => {
    setOpen(true);
    propagation(e);
  };

  const handleClose = (e) => {
    setOpen(false);
    propagation(e);
  };

  const createContact = async (contact) => {
    const url = "/users";
    const requestOptions = {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    };

    const data = await fetch(url, requestOptions);
    const status = await data.json();
    const statusJson = await status;
    console.log(statusJson);
    fetchData();
  };

  const updateContact = async (contact) => {
    const url = `/users/${contact.id}`;
    const requestOptions = {
      method: "PUT",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify(contact),
    };
    const data = await fetch(url, requestOptions);
    const status = await data.json();
    const statusJson = await status;
    console.log(statusJson);
    fetchData();
  };

  const deleteContacts = async (ids) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };

    await ids.forEach(async (id) => {
      const url = `/users/${id}`;
      const data = await fetch(url, requestOptions);
      const status = await data.json();
      const statusJson = await status;
      console.log(statusJson.message);
    });
    fetchData();
  };

  const deleteOne = async (e, id) => {
    const requestOptions = {
      method: "DELETE",
      headers: { "Content-Type": "application/json" },
    };
    const url = `/users/${id}`;
    const data = await fetch(url, requestOptions);
    const status = await data.json();
    const statusJson = await status;
    console.log(statusJson.message);
    handleClose(e);
    fetchData();
  };

  return (
    <>
      <Navbar
        selected={selected}
        numSelected={selected.length}
        handleUnselectAll={handleUnselectAll}
        deleteContacts={deleteContacts}
        setContactsList={setContactsList}
        contactsList={contactsList}
        handleSearchList={handleSearchList}
      />
      <Paper className={classes.paper} elevation="0">
        <Box
          style={{
            height: "85vh",
            width: "80%",
            display: "flex",
            backgroundColor: "#fff",
          }}
        >
          <TableContainer>
            <Table>
              <TableHead>
                <TableRow>
                  {headCells.map((headerText) => (
                    <TableCell align="left">
                      <Typography>{headerText}</Typography>
                    </TableCell>
                  ))}
                </TableRow>
              </TableHead>
              <TableBody>
                {searchList.map((row, index) => {
                  const isItemSelected = isSelected(row._id);
                  return (
                    <Contact
                      key={index}
                      row={row}
                      selected={isItemSelected}
                      handleClick={handleClick}
                      handleOpen={handleOpen}
                      open={open}
                      handleClose={handleClose}
                      propagation={propagation}
                      updateContact={updateContact}
                      deleteOne={deleteOne}
                    />
                  );
                })}
              </TableBody>
            </Table>
          </TableContainer>
        </Box>
        <Box className={classes.fabButtonBox}>
          <Fab
            className={classes.fabButton}
            aria-label="add"
            onClick={(e) => handleOpen(e)}
          >
            <PersonAddOutlined />
          </Fab>
          <AddContactModal
            name=""
            lastname=""
            nickname=""
            email=""
            photo=""
            isFav={false}
            open={open}
            handleClose={handleClose}
            action={"add"}
            createContact={createContact}
            propagation={propagation}
          />
        </Box>
      </Paper>
    </>
  );
};

export default Contacts;
