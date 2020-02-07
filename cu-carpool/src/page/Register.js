import React from 'react';
import RegisterForm from '../component/RegisterForm';
import { MyFullWidthButton } from '../component/MyButton';
import Upload from '../component/Upload';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

class Register extends React.Component {
  render() {
    return (
      <Grid container direction="column" alignItems="stretch" justifyContent="center">
        <h1 style={{ marginBottom: 10 }}> Hello,</h1>
        <Box color="palette.secondary.main" style={{ color: '#CE7B91', marginBottom: '40px' }}>
          Sign Up
        </Box>

        <RegisterForm />
        <Upload />
        <MyFullWidthButton style={{ marginTop: 40 }}>Sign Up</MyFullWidthButton>

        <Link
          href="#"
          style={{
            color: '#bdbdbd',
            marginTop: 30,
            textDecoration: 'underline',
            alignSelf: 'center',
          }}
        >
          Already a member ?
        </Link>
      </Grid>
    );
  }
}

export default Register;
