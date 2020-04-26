import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "../component/LoginForm";
import { Box } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import { MyLink } from "../component/MyTitle";
import backend from "../ip";
class Login extends React.Component {
  state = { username: null, password: null, error: "" };
  login = async () => {
    const { username, password } = this.state;
    const response = await axios.post(backend + "/user/login", {
      username,
      password,
    });
    const { success, information, message } = response.data;
    if (success) {
      const user = information[0];
      if (user.banned_at == null) {
        this.props.handleLogin(user);
        this.props.history.push("/");
      } else {
        this.setState({ error: "Your account has been suspended" });
      }
    } else {
      this.setState({ error: message });
    }
  };

  render() {
    const { username, password, error } = this.state;
    return (
      <Grid container direction="column" justify="flex-start">
        <h1 style={{ marginBottom: 10 }}> Welcome,</h1>
        <Box
          color="palette.secondary.main"
          style={{ color: "#CE7B91", marginBottom: 40 }}
        >
          Sign In
        </Box>

        <LoginForm
          username={username}
          password={password}
          setUsername={(username) => this.setState({ username })}
          setPassword={(password) => this.setState({ password })}
          handleLogin={this.login}
          error={error}
        />

        <Box
          color="palette.secondary.main"
          style={{ color: "#bdbdbd", alignSelf: "center", marginTop: 40 }}
        >
          Don’t have an account ?
          <MyLink goto="/register" style={{ marginLeft: 10, fontSize: 16 }}>
            Sign Up
          </MyLink>
        </Box>
      </Grid>
    );
  }
}
export default withRouter(Login);
