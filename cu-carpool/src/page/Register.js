import React from 'react';
import RegisterForm from '../component/RegisterForm';
import MyButton from '../component/MyButton';
import Photo from '../component/Photo';
import { Box } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';
import Typography from '@material-ui/core/Typography';

class Register extends React.Component {
  render() {
    const preventDefault = event => event.preventDefault();
    return (
      <>
        <h2 style={{ marginLeft: 40, marginBottom: 10, marginTop: 40}}
        > Hello,</h2>
        <Box color="palette.secondary.main" 
            style={{ marginLeft: 40, color: '#CE7B91', marginBottom: 40 }} 
            fontFamily='Roboto'
        > Sign Up</Box>

        <Grid   container
                direction="column"
                justify="flex-start"
                alignItems="center"
        >
          <RegisterForm></RegisterForm>
          <Photo></Photo>
          <MyButton variant="contained" style={{ marginTop: 40 }} >Sign Up</MyButton>

          <Link href="#" onClick={preventDefault} fontStyle="underline"
                style={{ color: '#bdbdbd', fontSize: 13, marginTop: 17, marginBottom: 50, borderBottom: '1px solid #bdbdbd' }} >
            Already a member ?
          </Link>
        </Grid>

      </>
    );
  }
}

export default Register;
