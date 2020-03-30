import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "../component/LoginForm";
import axios from "axios";

const AdminLogin = ({ history, handleLogin }) => {
  const [form, setForm] = useState({
    username: null,
    password: null
  });
  const [errorMassage, setErrorMessage] = useState("");

  const login = async () => {
    const response = await axios.post(
      "http://localhost:4000/admin/login",
      form
    );
    const { success, username, message } = response.data;
    if (success) {
      handleLogin({ username });
      history.push("/admin/member");
    } else {
      setErrorMessage(message);
    }
  };

  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        paddingTop: "150px"
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
