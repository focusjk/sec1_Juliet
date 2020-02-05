import React from 'react';
import MyButton from '../component/MyButton';
import { Box } from "@material-ui/core";

class Login extends React.Component {
  render() {
    return (
      <>
        <h2 style={{ marginLeft: 40, marginBottom: 5 }}
            fontFamily='Roboto' 
        > Welcome,</h2>
        <Box color="palette.secondary.main" 
            style={{ marginLeft: 40, color: '#CE7B91' }} 
            fontFamily='Roboto'
        > Sign In</Box>
        <MyButton variant="contained">Sign In</MyButton>
      </>
    );
  }
}

export default Login;
