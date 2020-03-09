import React, { useState, useEffect } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Map from "../component/Map"
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { MyHeader } from "../component/MyTitle";
import { MyButton } from "../component/MyButton";

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: '300px'
  },
  margin: {
    marginBottom: 16
  }
}));

const RequestJoin = ({ trip_id, member_id }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MyButton type="button" onClick={handleOpen}>
        Join
      </MyButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <MyHeader>Join trip</MyHeader>
          <TextField
            label="Pick up"
            className={classes.margin}
          />
          <Map setLocation={(departure_longtitude, departure_latitude) => { }} />
          <TextField
            label="Destination"
            className={classes.margin}
          />
          <Map setLocation={(departure_longtitude, departure_latitude) => { }} />
          <div style={{ marginTop: "25px", display: 'flex' }}>
            <Button onClick={handleClose} color="secondary" style={{ fontSize: 16, flexGrow: 1 }}>OK</Button>
            <Button onClick={handleClose} style={{ color: "#BDBDBD", fontSize: 16, flexGrow: 1 }}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default RequestJoin