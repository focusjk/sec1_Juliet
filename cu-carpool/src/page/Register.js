// import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import RegisterForm from '../component/RegisterForm';
import { MyFullWidthButton } from '../component/MyButton';
import Upload from '../component/Upload';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
// import Grid from '@material-ui/core/Grid';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';

const useStyles = makeStyles({
  root: {
    color: '#777777',
    marginBottom: 20,
  },
});

const Register = ({ history, user }) => {
  const [form, setForm] = useState({
    first_name: null,
    last_name: null,
    username: null,
    password: null,
    email: null,
    phone_number: null,
  });
  const [error, setError] = useState({
    first_name: false,
    last_name: false,
    username: false,
    password: false,
    email: false,
    phone_number: false,
  });

  const validate = () => {
    setError({
      first_name: !form.first_name,
      last_name: !form.last_name,
      username: !form.username,
      password: !form.password,
      email: !form.email,
      phone_number: !form.phone_number,
    });
    return !(
      error.first_name ||
      error.last_name ||
      error.username ||
      error.password ||
      error.email ||
      error.departure_latitude ||
      error.phone_number
    );
  };

  const handleRegister = async () => {
    if (validate()) {
      try {
        const { id } = user;
        const { time, date, ...data } = form;
        const response = await axios.post('http://localhost:4000/register', {
          ...data,
          owner: id,
          // start_datetime: date + ' ' + time + ':00',
        });
        console.log(response);
        const { success } = response.data;
        if (success) {
          history.push('/');
        } else {
          //   {
          //     "success": false,
          //     "error": "Column 'price' cannot be null",
          //     "message": "CANNOT CREATE TRIP!!!"
          // }
          console.log('ERROR');
        }
      } catch (e) {
        console.log(e.response);
      }
    }
  };


// class Register extends React.Component {
//   render() {
    // const [error, setError] = React.useState(false);

    const classes = useStyles();
    const [password, setPassword] = React.useState('');
    const [showPassword, setShowPassword] = React.useState(false);

    return (
      <Grid container direction="column" alignItems="stretch" justifyContent="center">
        <h1 style={{ marginBottom: 10 }}> Hello,</h1>
        <Box color="palette.secondary.main" style={{ color: '#CE7B91', marginBottom: '40px' }}>
          Sign Up
        </Box>

        {/* <RegisterForm /> */}
        <Grid container direction="column" justify="flex-start" alignItems="stretch">

          <div style={{ marginBottom: 5 }}>FIRST NAME</div>
          <Input fullWidth placeholder="First Name" className={classes.root} 
          // helperText="First Name *"
          value={form.first_name}
          error={error.first_name}
          onChange={e => setForm({ ...form, first_name: e.target.value })}
          />

          <div style={{ marginBottom: 5 }}>LAST NAME</div>
          <Input fullWidth placeholder="Last Name" className={classes.root} 
          value={form.last_name}
          error={error.last_name}
          onChange={e => setForm({ ...form, last_name: e.target.value })}
          />

          <div style={{ marginBottom: 5 }}>USERNAME</div>
          <Input fullWidth placeholder="Username" className={classes.root} 
          value={form.username}
          error={error.username}
          onChange={e => setForm({ ...form, username: e.target.value })}
          />

          <div style={{ marginBottom: 5 }}>PASSWORD</div>
          {/* <Input fullWidth placeholder="Password" className={classes.root} /> */}
          <Input placeholder="Password" className={classes.root}
            id="standard-adornment-password"
            type={showPassword ? 'text' : 'password'}
            value={form.password}
            error={error.password}
            onChange={e => setForm({ ...form, password: e.target.value })}
            onChange={e => setPassword(e.target.value)}
            endAdornment={
              <InputAdornment position="end">
                <IconButton
                  aria-label="toggle password visibility"
                  onClick={() => {
                    setShowPassword( !showPassword );
                  }}
                >
                  {showPassword ? <Visibility /> : <VisibilityOff />}
                </IconButton>
              </InputAdornment>
            }
          />

          <div style={{ marginBottom: 5 }}>EMAIL</div>
          <Input fullWidth placeholder="Email" className={classes.root} 
          value={form.email}
          error={error.email}
          onChange={e => setForm({ ...form, email: e.target.value })}
          />

          <div style={{ marginBottom: 5 }}>PHONE NUMBER</div>
          <Input fullWidth placeholder="Phone Number" className={classes.root} 
          value={form.phone_number}
          error={error.phone_number}
          onChange={e => setForm({ ...form, phone_number: e.target.value })}
          />

          <div style={{ marginBottom: 10 }}>PROFILE PICTURE</div>
        </Grid>
        
        <Upload />
        <MyFullWidthButton style={{ marginTop: 50 }}
          onClick={handleRegister}
          // onClick={() => {
          //   {this.props.user === "" ? (error) => {setError('yes')} : (error) => {setError('no')} }
          //   // this.props.history.push('/');
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
            history.push('/login');
          }}
        >
          Already a member ?
        </Link>
      </Grid>
    );
//   }
// }
};

export default withRouter(Register);
