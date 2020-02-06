import React from 'react';
import LoginForm from '../component/LoginForm';
import { MyFullWidthButton } from '../component/MyButton';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class Login extends React.Component {
  render() {
    const preventDefault = event => event.preventDefault();
    return (
      <Grid container direction="column" justify="flex-start">
        <h1 style={{ marginBottom: 10 }}> Welcome,</h1>
        <Box color="palette.secondary.main" style={{ color: '#CE7B91', marginBottom: 40 }}>
          Sign In
        </Box>

        <LoginForm />
        <MyFullWidthButton style={{ marginTop: 40 }}>Sign In</MyFullWidthButton>

        <Link
          href="#"
          onClick={preventDefault}
          style={{
            color: '#bdbdbd',
            marginTop: 30,
            marginBottom: 10,
            alignSelf: 'center',
            textDecoration: 'underline',
          }}
        >
          Forgot Password ?
        </Link>
        <Box color="palette.secondary.main" style={{ color: '#bdbdbd', alignSelf: 'center' }}>
          Don’t have an account ?
          <Link href="#" style={{ color: '#CE7B91', marginLeft: 10, textDecoration: 'underline' }}>
            Sign Up
          </Link>
        </Box>
      </Grid>
    );
  }
}

export default Login;
