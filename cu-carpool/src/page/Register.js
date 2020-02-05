import React from 'react';
import RegisterForm from '../component/RegisterForm';
import MyButton from '../component/MyButton';
import { Box } from "@material-ui/core";

class Register extends React.Component {
  render() {
    return (
      <>
        <h2 style={{ marginLeft: 40, marginBottom: 5 }}
            fontFamily='Roboto' 
        > Hello,</h2>
        <Box color="palette.secondary.main" 
             style={{ marginLeft: 40, color: '#CE7B91' }} 
             fontFamily='Roboto'
        > Sign Up</Box>
        <RegisterForm></RegisterForm>
        <MyButton variant="contained">Sign Up</MyButton>
      </>
    );
  }
}

export default Register;
