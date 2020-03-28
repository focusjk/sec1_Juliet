import React, { useState, useEffect } from "react";
import Modal from "@material-ui/core/Modal";
import { makeStyles } from "@material-ui/core/styles";
import Button from "@material-ui/core/Button";
import { useParams } from "react-router-dom";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeader, MyHeaderWithArrow } from "../component/MyTitle";
import { Grid, TextField } from "@material-ui/core";
import CheckCircleIcon from "@material-ui/icons/CheckCircle";
import ConfirmModal from "../component/ConfirmModal";

const Payment = ({ history }) => {
  const { request_id } = useParams();
  const [errorMessage, setErrorMessage] = useState("");
  const [price, setPrice] = useState(0);
  const [paid_at, setPaidAt] = useState("");
  const [form, setForm] = useState({
    card_number: "",
    card_holder_name: "",
    card_expiry_date: "",
    card_code: ""
  });
  const [error, setError] = useState({
    card_number: false,
    card_holder_name: false,
    card_expiry_date: false,
    card_code: false
  });
  const validate = () => {
    setError({
      card_number: !form.card_number,
      card_holder_name: !form.card_holder_name,
      card_expiry_date: !form.card_expiry_date,
      card_code: !form.card_code
    });
    return (
      form.card_number &&
      form.card_holder_name &&
      form.card_expiry_date &&
      form.card_code
    );
  };

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
      padding: theme.spacing(2, 4, 3),
      width: "250px"
    },
    margin: {
      marginBottom: 16
    }
  }));

  const classes = useStyles();

  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
    history.push("/trip-history");
  };

  const getPrice = async () => {
    try {
      const response = await axios.post("http://localhost:4000/request/price", {
        request_id
      });
      const { success, price } = response.data;
      setPrice(price);
    } catch (e) {
      console.log(e);
    }
  };

  useEffect(() => {
    getPrice();
  }, [request_id]);

  const handlePayment = async () => {
    if (validate()) {
      try {
        const response = await axios.post(
          "http://localhost:4000/user/payment",
          {
            id: request_id,
            ...form,
            price
          }
        );
        const { success, id, request_status, paid_at } = response.data;
        if (success) {
          handleOpen();
          setPaidAt(paid_at);
          setErrorMessage(null);
        } else {
          setErrorMessage("Payment failed. Please try again.");
        }
      } catch (e) {
        setErrorMessage("Payment failed. Please try again.");
      }
    } else {
      setErrorMessage("Please fill all inputs with valid data");
    }
  };

  const clearData = () => {
    setForm({
      card_number: "",
      card_holder_name: "",
      card_expiry_date: "",
      card_code: ""
    });
    setErrorMessage("");
  };

  return (
    <div>
      <MyHeaderWithArrow goto="/trip-history">Payment</MyHeaderWithArrow>
      <form autoComplete="off">
        <Grid container direction="column" justify="flex-start">
          <TextField
            fullWidth
            required
            label="Card Number"
            style={{ marginTop: 25 }}
            value={form.card_number}
            error={error.card_number}
            onChange={e => {
              setForm({ ...form, card_number: e.target.value });
              setErrorMessage("");
            }}
          />
          <TextField
            fullWidth
            required
            label="Card Holder Name"
            style={{ marginTop: 25 }}
            value={form.card_holder_name}
            error={error.card_holder_name}
            onChange={e => {
              setForm({ ...form, card_holder_name: e.target.value });
              setErrorMessage("");
            }}
          />
          <div
            style={{
              display: "flex",
              direction: "row",
              justifyContent: "space-between"
            }}
          >
            <TextField
              required
              label="Expiry Date"
              style={{ marginTop: 25, width: "152px" }}
              value={form.card_expiry_date}
              error={error.card_expiry_date}
              onChange={e => {
                setForm({ ...form, card_expiry_date: e.target.value });
                setErrorMessage("");
              }}
            />
            <TextField
              required
              label="CVV"
              style={{ marginTop: 25, width: "152px" }}
              value={form.card_code}
              error={error.card_code}
              onChange={e => {
                setForm({ ...form, card_code: e.target.value });
                setErrorMessage("");
              }}
            />
          </div>
          {error !== "" && (
            <div style={{ marginTop: 20, color: "red" }}>{errorMessage}</div>
          )}
          <Grid container direction="column" alignItems="flex-end">
            <div style={{ marginTop: 25, marginBottom: 5 }}>Payment Amount</div>
            <div style={{ marginTop: 5, marginBottom: 60, fontSize: "20px" }}>
              {price} ฿
            </div>
          </Grid>
          <Grid container direction="row" justify="space-between">
            <ConfirmModal
              onConfirm={handlePayment}
              btn="0"
              width="146px"
              action="Pay"
              message="Are you sure you want to make a payment ?"
              confirm="OK"
              cancel="Cancel"
            />
            <Modal open={open} onClose={handleClose}>
              <div style={getModalStyle()} className={classes.paper}>
                <div
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    justifyContent: "center"
                  }}
                >
                  <CheckCircleIcon
                    color="secondary"
                    style={{ fontSize: 40, marginBottom: "10px" }}
                  />
                </div>
                <MyHeader style={{ marginBottom: "13px" }}>
                  Payment Successful
                </MyHeader>
                <div
                  style={{
                    marginBottom: "13px",
                    display: "flex",
                    justifyContent: "center",
                    border: "0.5px solid #BDBDBD"
                  }}
                />
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  Paid At: {paid_at}{" "}
                </div>
                <div style={{ display: "flex", alignItems: "flex-end" }}>
                  Payment Amount: {price} ฿
                </div>
                <Button
                  onClick={handleClose}
                  color="secondary"
                  style={{
                    marginTop: "15px",
                    display: "flex",
                    fontSize: 16,
                    flexGrow: 1
                  }}
                >
                  OK
                </Button>
              </div>
            </Modal>
            <ConfirmModal
              onConfirm={clearData}
              btn="2"
              width="146px"
              action="Cancel"
              message="Are you sure you want to cancel this payment ?"
              confirm="OK"
              cancel="Cancel"
            />
          </Grid>
        </Grid>
      </form>
    </div>
  );
};
export default withRouter(Payment);
