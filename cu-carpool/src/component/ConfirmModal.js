import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { MyHeader } from "./MyTitle";
import { MyButton } from "./MyButton";
import Button from "@material-ui/core/Button";

// class ConfirmModal extends React.Component {
//     static defaultProps = {
//         message: "Please confirm your action.",
//         confirm: "confirm",
//         cancel: "cancel",       
//     }
// }

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
    padding: theme.spacing(2, 4),
    width: '250px'
  },
  margin: {
    marginBottom: 16
  }
}));

const ConfirmModal = ({ message, confirm, cancel, onConfirm, action }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(null);

  const handleConfirm = async () => {
    await onConfirm()
    handleClose()
  }
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <MyButton type="button" onClick={handleOpen}>
        {action || 'Action'}
      </MyButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <MyHeader>Confirmation</MyHeader>
          <div style={{ margin: "16px auto" }}>
            {message || 'Please confirm your action.'}
          </div>
          {err !== "" && <div style={{ color: "red", marginTop: '16px' }}>{err}</div>}
          <div style={{ display: 'flex' }}>
            <Button onClick={handleConfirm} color="secondary" style={{ fontSize: 16, flexGrow: 1 }}>{confirm || 'Confirm'}</Button>
            <Button onClick={handleClose} style={{ color: "#BDBDBD", fontSize: 16, flexGrow: 1 }}>{cancel || 'Cancel'}</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default ConfirmModal

