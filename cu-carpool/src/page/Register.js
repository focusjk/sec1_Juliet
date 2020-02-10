import React from 'react';
import { withRouter } from 'react-router-dom';
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
        <MyFullWidthButton style={{ marginTop: 50 }}
          // onClick={() => {
          //   this.props.history.push('/login');
          // }}
        >
          Sign Up
        </MyFullWidthButton>

        <Link
          style={{
            color: '#bdbdbd',
            marginTop: 25,
            textDecoration: 'underline',
            alignSelf: 'center',
          }}
          onClick={() => {
            this.props.history.push('/login');
          }}
        >
          Already a member ?
        </Link>
      </Grid>
    );
  }
}

export default withRouter(Register);
