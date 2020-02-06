import React from 'react';
import LoginForm from '../component/LoginForm';
import { MyButton } from '../component/MyButton';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class Login extends React.Component {
  render() {
    const preventDefault = event => event.preventDefault();
    return (
      <div>
        <h2 style={{ marginLeft: 40, marginBottom: 10, marginTop: 40 }}> Welcome,</h2>
        <Box
          color="palette.secondary.main"
          style={{ marginLeft: 40, color: '#CE7B91', marginBottom: 40 }}
          fontFamily="Roboto"
        >
          Sign In
        </Box>

        <Grid container direction="column" justify="flex-start" alignItems="center">
          <LoginForm></LoginForm>
          <MyButton variant="contained" style={{ marginTop: 40 }}>
            Sign In
          </MyButton>

          <Link
            href="#"
            onClick={preventDefault}
            style={{ color: '#bdbdbd', fontSize: 13, marginTop: 30, marginBottom: 10 }}
          >
            Forgot Password ?
          </Link>
          <Grid container direction="row" justify="center" alignItems="center">
            <Box
              color="palette.secondary.main"
              style={{ color: '#bdbdbd', fontSize: 13 }}
              fontFamily="Roboto"
            >
              Don’t have an account ?
            </Box>
            <Link
              href="#"
              onClick={preventDefault}
              style={{ color: '#CE7B91', fontSize: 13, marginLeft: 10 }}
            >
              Sign Up
            </Link>
          </Grid>
        </Grid>
      </div>
    );
  }
}

export default Login;
