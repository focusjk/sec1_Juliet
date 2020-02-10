import React from 'react';
import { withRouter } from 'react-router-dom';
// import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import LoginForm from '../component/LoginForm';
import { MyFullWidthButton } from '../component/MyButton';
// import Navigation from '../component/Navigation';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class Login extends React.Component {
  render() {
    const preventDefault = event => event.preventDefault();
    // const [user, setUser] = React.useState('');
    return (
      <Grid container direction="column" justify="flex-start" >
        <h1 style={{ marginBottom: 10 }}> Welcome,</h1>
        <Box color="palette.secondary.main" style={{ color: '#CE7B91', marginBottom: 40 }}>
          Sign In
        </Box>

        <LoginForm />
        <MyFullWidthButton style={{ marginTop: 40 }}
          onClick={() => {
            this.props.history.push('/');
          }}
        >
          Sign In 
          {/* <Navigation handleLogin = {(user) => {setUser(user)}} /> */}
        </MyFullWidthButton>

        <Box color="palette.secondary.main" style={{ color: '#bdbdbd', alignSelf: 'center', marginTop: 40 }}>
          Don’t have an account ?
          <Link style={{ color: '#CE7B91', marginLeft: 10, textDecoration: 'underline' }}
            onClick={() => {
              this.props.history.push('/register');
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
