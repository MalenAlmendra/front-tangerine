import React, { useState } from "react";
import {
  makeStyles,
  TableRow,
  TableCell,
  Checkbox,
  Typography,
  Avatar,
  IconButton,
} from "@material-ui/core";
import { StarBorder, Star, MoreVert } from "@material-ui/icons";
import ModalContact from "../Modal/ModalContact";

const useStyles = makeStyles((theme) => ({
  phone: {
    flexGrow: 1,
  },
  start: {
    zIndex: 40,
  },
}));

const Contact = ({
  row,
  selected,
  handleClick,
  updateContact,
  deleteOne
}) => {
  const { photo, name, lastname, nickname, email, phone, isFav,_id } = row;
  const classes = useStyles();
  const [open, setOpen] = useState(false);
  const [fav, setFav] = useState(isFav);
  const handleFav = (e) => {
    setFav(!fav);
    propagation(e);
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

  return (
    <TableRow
      id={row._id}
      hover
      selected={selected}
      onClick={(event) => handleClick(event, _id)}
    >
      <TableCell padding="checkbox">
        <Checkbox checked={selected} />
      </TableCell>
      <TableCell>
        <Avatar alt={name + " " + lastname} src={photo} />
      </TableCell>
      <TableCell component="th">
        <Typography variant="caption">{name + " " + lastname}</Typography>
      </TableCell>
      <TableCell component="th">
        <Typography variant="caption">{email}</Typography>
      </TableCell>
      <TableCell className={classes.phone} component="th">
        <Typography variant="caption">{phone}</Typography>
      </TableCell>
      <TableCell align="right" className={classes.star}>
        <IconButton onClick={(e) => handleFav(e)}>
          {fav ? <Star style={{ fill: "#FEB80A" }} /> : <StarBorder />}
        </IconButton>
      </TableCell>
      <TableCell>
        <IconButton onClick={(e) => handleOpen(e)}>
          <MoreVert />
        </IconButton>
        <ModalContact
          id={_id}
          open={open}
          handleClose={handleClose}
          photo=""
          name={name}
          lastname={lastname}
          nickname={nickname}
          email={email}
          phone={phone}
          isFav={fav}
          propagation={propagation}
          action='update'
          updateContact={updateContact}
          deleteOne={deleteOne}
        />
      </TableCell>
    </TableRow>
  );
};

export default Contact;
