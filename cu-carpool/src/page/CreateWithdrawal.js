import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeaderWithArrow } from "../component/MyTitle";
import { TextField } from "@material-ui/core";
import { MyDisabledFullWidthButton } from "../component/MyButton";
import ConfirmModal from "../component/ConfirmModal";
import backend from "../ip";
const CreateWithdrawal = ({ history, user }) => {
  const [form, setForm] = useState({
    account_number: "",
    account_name: "",
    bank_name: "",
    amount: "",
  });
  const [errorMessage, setErrorMessage] = useState("");
  const [error, setError] = useState({
    account_number: false,
    account_name: false,
    bank_name: false,
    amount: false,
  });
  const clickable = () => {
    return (
      form.account_name !== "" &&
      form.account_number !== "" &&
      form.bank_name !== "" &&
      form.amount !== ""
    );
  };
  const handleRequest = async () => {
    try {
      const response = await axios.post(backend + "/withdrawal", {
        member_id: user.id,
        ...form,
      });
      const { success } = response.data;
      if (success) {
        setErrorMessage(null);
        history.push("/wallet");
      } else {
        setErrorMessage("The inserted amount exceeds your current balance.");
      }
    } catch (e) {
      setErrorMessage("Please fill all inputs with valid data");
    }
  };
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        height: "80vh",
        justifyContent: "space-between",
      }}
    >
      <form autoComplete="off">
        <div style={{ display: "flex", flexDirection: "column" }}>
          <MyHeaderWithArrow goto="/wallet">
            Withdrawal Request
          </MyHeaderWithArrow>
          <TextField
            fullWidth
            required
            label="Bank Account Number"
            value={form.account_number}
            error={error.account_number}
            onChange={(e) => {
              setForm({ ...form, account_number: e.target.value });
              setErrorMessage("");
            }}
          />
          <TextField
            fullWidth
            required
            label="Account Holder Name"
            style={{ marginTop: 15 }}
            value={form.account_name}
            error={error.account_name}
            onChange={(e) => {
              setForm({ ...form, account_name: e.target.value });
              setErrorMessage("");
            }}
          />
          <TextField
            fullWidth
            required
            label="Bank Name"
            style={{ marginTop: 15 }}
            value={form.bank_name}
            error={error.bank_name}
            onChange={(e) => {
              setForm({ ...form, bank_name: e.target.value });
              setErrorMessage("");
            }}
          />
          <TextField
            fullWidth
            required
            label="Amount"
            style={{ marginTop: 15 }}
            value={form.amount}
            error={error.amount}
            type="number"
            onChange={(e) => {
              setForm({ ...form, amount: e.target.value });
              setErrorMessage("");
            }}
          />
          {error !== "" && (
            <div style={{ marginTop: 20, color: "red" }}>{errorMessage}</div>
          )}
        </div>
      </form>
      <div>
        {!clickable() && (
          <MyDisabledFullWidthButton disabled>
            Request
          </MyDisabledFullWidthButton>
        )}
        {clickable() && (
          <ConfirmModal
            onConfirm={handleRequest}
            btn="1"
            action="Request"
            message="Are you sure you want to request ?"
            confirm="OK"
            cancel="Cancel"
          />
        )}
      </div>
    </div>
  );
};
export default withRouter(CreateWithdrawal);
