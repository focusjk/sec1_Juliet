import React from 'react';
import LoginForm from '../component/LoginForm';
import MyButton from '../component/MyButton';
import { Box } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class Login extends React.Component {
  render() {
    return (
      <>
        <h2 style={{ marginLeft: 40, marginBottom: 10, marginTop: 40}}
        > Welcome,</h2>
        <Box color="palette.secondary.main" 
            style={{ marginLeft: 40, color: '#CE7B91', marginBottom: 40 }} 
            fontFamily='Roboto'
        > Sign In</Box>
        <MyButton variant="contained" style={{ marginTop: 40 }} >Sign In</MyButton>
      </>
    );
  }
}

export default Login;
