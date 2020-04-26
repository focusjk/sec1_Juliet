import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useHistory } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { Link } from "@material-ui/core/";
import Button from "@material-ui/core/Button";
import { MyHeader } from "../component/MyTitle";
import backend from "../ip";
function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`,
  };
}

const useStyles = makeStyles((theme) => ({
  paper: {
    position: "absolute",
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    width: "350px",
  },
  div: {
    display: "flex",
    alignItems: "flex-end",
    marginBottom: "10px",
  },
  button: {
    marginTop: "15px",
    display: "flex",
    fontSize: 16,
    flexGrow: 1,
  },
}));

const RequestInfoModal = ({ history, data }) => {
  const { requesttime, paidtime, arrivetime, departtime, departat } = data;

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(null);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Link
        onClick={handleOpen}
        style={{ color: "#C78899", textDecoration: "underline", fontSize: 14 }}
      >
        see request info
      </Link>
      <Modal open={open} onClose={handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <MyHeader style={{ marginBottom: "13px" }}>Request Info</MyHeader>
          <div className={classes.div}>
            <b>Requested at:</b>
            {requesttime}{" "}
          </div>
          <div className={classes.div}>
            <b>Paid at:</b>
            {paidtime}{" "}
          </div>
          <div className={classes.div}>
            <b>Driver arrived at:</b>
            {arrivetime}{" "}
          </div>
          <div className={classes.div}>
            <b>Driver departed at:</b>
            {departtime}{" "}
          </div>
          <div className={classes.div}>
            <b>Departed at:</b>
            {departat}{" "}
          </div>
          <Button
            onClick={handleClose}
            color="secondary"
            className={classes.button}
          >
            OK
          </Button>
        </div>
      </Modal>
    </div>
  );
};
export default withRouter(RequestInfoModal);
