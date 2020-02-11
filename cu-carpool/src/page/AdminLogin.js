import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import { Input, Grid } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import LoginForm from "../component/LoginForm";
import axios from "axios";

const useStyles = makeStyles({
  root: {
    color: "#777777",
    marginBottom: 20,
    marginRight: "30px",
    marginLeft: "30px"
  }
});

const AdminLogin = ({ history, handleLogin }) => {
  const [form, setForm] = useState({
    username: null,
    password: null
  });
  const [errorMassage, setErrorMessage] = useState("");

  const login = async () => {
    console.log(form);
    const response = await axios.post(
      "http://localhost:4000/admin/login",
      form
    );
    console.log(response);
    const { success, username, message } = response.data;
    if (success) {
      handleLogin({ username });
      history.push("/admin/driver-request");
    } else {
      setErrorMessage(message);
    }
  };
  const classes = useStyles();
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        padding: "150px 500px 0 500px"
      }}
    >
      <h1 style={{ marginBottom: 50, marginTop: 50 }}> Welcome,</h1>
      <LoginForm
        username={form.username}
        password={form.password}
        setUsername={newUsername => {
          setForm({ ...form, username: newUsername });
        }}
        setPassword={newPassword => {
          setForm({ ...form, password: newPassword });
        }}
        handleLogin={login}
        error={errorMassage}
      />
    </div>
  );
};

export default withRouter(AdminLogin);
