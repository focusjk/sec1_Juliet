import React, { useState } from "react";
import { withRouter } from "react-router-dom";
import LoginForm from "../component/LoginForm";
import { Box } from "@material-ui/core";
import Link from "@material-ui/core/Link";
import Grid from "@material-ui/core/Grid";
import axios from "axios";

class Login extends React.Component {
  state = { username: null, password: null, error: "" };
  login = async () => {
    const { username, password } = this.state;
    const response = await axios.post("http://localhost:4000/user/login", {
      username,
      password
    });
    console.log(response.data);
    const { success, information, message } = response.data;
    if (success) {
      const user = information[0];
      this.props.handleLogin(user);
      this.props.history.push("/");
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
          setUsername={username => this.setState({ username })}
          setPassword={password => this.setState({ password })}
          handleLogin={this.login}
          error={error}
        />

        <Box
          color="palette.secondary.main"
          style={{ color: "#bdbdbd", alignSelf: "center", marginTop: 40 }}
        >
          Don’t have an account ?
          <Link
            style={{
              color: "#CE7B91",
              marginLeft: 10,
              textDecoration: "underline"
            }}
            onClick={() => {
              this.props.history.push("/register");
            }}
          >
            Sign Up
          </Link>
        </Box>
      </Grid>
    );
  }
}

export default withRouter(Login);
