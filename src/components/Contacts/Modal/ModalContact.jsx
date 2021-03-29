import React, { useState } from "react";
import {
  makeStyles,
  Modal,
  Card,
  CardActions,
  CardContent,
  Avatar,
  Button,
  TextField,
  Box,
  Typography,
} from "@material-ui/core";
import {
  AccountCircleOutlined,
  StarOutlined,
  StarBorderOutlined,
  Phone,
  Email,
} from "@material-ui/icons";

const useStyles = makeStyles((theme) => ({
  modal: {
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
  },
  card: {
    minHeight: "100vh",
    width: "30%",
    [theme.breakpoints.down(1366)]: {
      width: "50%",
    },
  },
  cardContent: {
    display: "flex",
    flexDirection: "column",
    flexWrap: "wrap",
    padding: "0",
  },
  avatarBox: {
    minHeight: "25vh",
    display: "flex",
    justifyContent: "center",
    alignItems: "center",
    flexWrap: "wrap",
    backgroundColor: "#068FE0",
    padding: "1em .5em",
  },
  avatar: {
    minWidth: "100px",
    minHeight: "100px",
  },
  form: {
    margin: "auto 1em",
    "&>div": {
      width: "100%",
    },
  },
  fullnameText: {
    width: "100%",
    color:'#fff',
    fontWeight:'500'
  },
  cardActions: {
    display: "flex",
    justifyContent: "flex-end",
  },
}));

const ModalContact = ({
  name,
  lastname,
  email,
  phone,
  isFav,
  photo,
  nickname,
  open,
  handleClose,
  propagation,
  action,
  id,
  createContact,
  updateContact,
  deleteOne
}) => {
  const classes = useStyles();

  const [nameInput, setNameInput] = useState(name);
  const [lastnameInput, setLastnameInput] = useState(lastname);
  const [nicknameInput, setNicknameInput] = useState(nickname);
  const [emailInput, setEmailInput] = useState(email);
  const [phoneInput, setPhoneInput] = useState(phone);

  const handleNameInput = (e) => setNameInput(e.target.value);
  const handleLastnameInput = (e) => setLastnameInput(e.target.value);
  const handleNicknameInput = (e) => setNicknameInput(e.target.value);
  const handleEmailInput = (e) => setEmailInput(e.target.value);
  const handlePhoneInput = (e) => setPhoneInput(e.target.value);

  const createOrUpdateContact = (e) => {
    let newContact = {
      photo,
      name: nameInput,
      lastname: lastnameInput,
      nickname: nicknameInput,
      email: emailInput,
      phone: phoneInput,
      isFav,
    };
    if (action === "add") {
      createContact(newContact);
      handleClose(e)
    }

    if (action === "update") {
      newContact.id = id;
      updateContact(newContact);
      handleClose(e)
    }

    setNameInput('')
    setLastnameInput('')
    setNicknameInput('')
    setEmailInput('')
    setPhoneInput('')
  };
  

  return (
    <Modal
      BackdropProps={{ style: { backgroundColor: "rgba(0,0,0,.5)" } }}
      className={classes.modal}
      open={open}
      onClose={(e) => handleClose(e)}
      onClick={(e) => propagation(e)}
    >
      <Card className={classes.card}>
        <CardContent className={classes.cardContent}>
          <Box className={classes.avatarBox}>
            {action === "update" ? (
              <Typography className={classes.fullnameText}>
                Edit Contact
              </Typography>
            ) : (
              <Typography className={classes.fullnameText}>
                Add Contact
              </Typography>
            )}
            <Avatar
              className={classes.avatar}
              alt={nameInput + " " + lastnameInput}
              src={photo}
            />
            <Typography className={classes.fullnameText} align="center">
              {name + " " + lastname}
            </Typography>
          </Box>
          <form className={classes.form} action="">
            <TextField
              margin="normal"
              label="Name"
              variant="outlined"
              value={nameInput}
              onChange={(e) => handleNameInput(e)}
              InputProps={{
                endAdornment: <AccountCircleOutlined />,
              }}
            />
            <TextField
              margin="normal"
              label="LastName"
              variant="outlined"
              value={lastnameInput}
              onChange={(e) => handleLastnameInput(e)}
              InputProps={{
                endAdornment: <AccountCircleOutlined />,
              }}
            />
            <TextField
              margin="normal"
              label="NickName"
              variant="outlined"
              value={nicknameInput}
              onChange={(e) => handleNicknameInput(e)}
              InputProps={{
                endAdornment: isFav ? <StarOutlined /> : <StarBorderOutlined />,
              }}
            />
            <TextField
              margin="normal"
              label="Phone Number"
              variant="outlined"
              value={phoneInput}
              onChange={(e) => handlePhoneInput(e)}
              InputProps={{
                endAdornment: <Phone />,
              }}
              type="number"
            />
            <TextField
              margin="normal"
              label="Email"
              variant="outlined"
              value={emailInput}
              onChange={(e) => handleEmailInput(e)}
              InputProps={{
                endAdornment: <Email />,
              }}
            />
          </form>
        </CardContent>
        <CardActions className={classes.cardActions}>
          {action === "update" ? <Button size="small" onClick={(e)=>deleteOne(e,id)}>DELETE</Button> : <></>}
          <Button size="small"  onClick={e=>createOrUpdateContact(e)}>SAVE</Button>
        </CardActions>
      </Card>
    </Modal>
  );
};

export default ModalContact;
