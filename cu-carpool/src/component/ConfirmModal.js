import React, { useState } from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import { MyButton, MyFullWidthButton, MyWhiteButton } from "./MyButton";
import Button from "@material-ui/core/Button";

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
    display: "flex",
    flexDirection: "column",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4),
    width: "240px"
  },
  margin: {
    marginBottom: 16
  }
}));

const ConfirmModal = ({
  message,
  confirm,
  cancel,
  onConfirm,
  action,
  btn,
  disabled
}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(null);

  const handleConfirm = async () => {
    await onConfirm();
    handleClose();
  };
  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      {btn == 0 && (
        <MyButton type="button" onClick={handleOpen}>
          {action || "Action"}
        </MyButton>
      )}
      {btn == 1 && (
        <MyFullWidthButton
          type="button"
          onClick={handleOpen}
          style={{ marginTop: "10px" }}
          disabled={disabled || false}
        >
          {action || "Action"}
        </MyFullWidthButton>
      )}
      {btn == 2 && (
        <MyWhiteButton
          type="button"
          onClick={handleOpen}
          style={{ width: 146 }}
        >
          {action || "Action"}
        </MyWhiteButton>
      )}
      {btn == 3 && (
        <MyButton type="button" onClick={handleOpen} style={{ width: 146 }}>
          {action || "Action"}
        </MyButton>
      )}
      <Modal open={open} onClose={handleClose}>
        <div style={getModalStyle()} className={classes.paper}>
          <div style={{ margin: "12px auto 2px", lineHeight: "20px" }}>
            {message || "Please confirm your action."}
          </div>
          {err !== "" && (
            <div style={{ color: "red", marginTop: "16px" }}>{err}</div>
          )}
          <div style={{ display: "flex" }}>
            <Button
              onClick={handleConfirm}
              color="secondary"
              style={{ fontSize: 16, flexGrow: 1, textTransform: "capitalize" }}
            >
              {confirm || "Confirm"}
            </Button>
            <Button
              onClick={handleClose}
              style={{
                color: "#BDBDBD",
                fontSize: 16,
                flexGrow: 1,
                textTransform: "capitalize"
              }}
            >
              {cancel || "Cancel"}
            </Button>
          </div>
        </div>
      </Modal>
    </div>
  );
};

export default ConfirmModal;
