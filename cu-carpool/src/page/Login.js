import React from 'react';

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


        <Box color="palette.secondary.main" style={{ color: '#bdbdbd', alignSelf: 'center', marginTop: 40 }}>
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
