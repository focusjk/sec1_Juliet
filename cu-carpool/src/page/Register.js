// import React from 'react';
import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { withRouter } from 'react-router-dom';
import { MyFullWidthButton } from '../component/MyButton';
import Upload from '../component/Upload';
import { Box } from '@material-ui/core';
import Grid from '@material-ui/core/Grid';
import Link from '@material-ui/core/Link';

import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
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

const Register = ({ history, handleLogin, handleUpload }) => {
  const [form, setForm] = useState({
    firstname: null,
    lastname: null,
    username: null,
    password: null,
    email: null,
    phone_number: null,
    photo: null
  });
  const [error, setError] = useState({
    firstname: false,
    lastname: false,
    username: false,
    password: false,
    email: false,
    phone_number: false,
  });

  const validate = () => {
    setError({
      firstname: !form.firstname,
      lastname: !form.lastname,
      username: !form.username,
      password: !form.password,
      email: !form.email,
      phone_number: !form.phone_number,
    });
    return !(
      error.firstname ||
      error.lastname ||
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
        console.log(form)
        const response = await axios.post('http://localhost:4000/user/register', form);
        console.log(response);
        const { success, information } = response.data;
        if (success) {
          handleLogin(information);
          history.push('/');
        } else {
          console.log('ERROR');
        }
      } catch (e) {
        console.log(e);
      }
    }
  };

    const classes = useStyles();

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
          value={form.firstname}
          error={error.firstname}
          onChange={e => setForm({ ...form, firstname: e.target.value })}
          />

          <div style={{ marginBottom: 5 }}>LAST NAME</div>
          <Input fullWidth placeholder="Last Name" className={classes.root} 
          value={form.lastname}
          error={error.lastname}
          onChange={e => setForm({ ...form, lastname: e.target.value })}
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
        
        <Upload 
        value={form.photo}
        // onChange={e => setForm({ ...form, photo: e.target.value })} 
        // handleLogin={(user) => setUser(user)}
        onChange={e => handleUpload}
        />
        <MyFullWidthButton style={{ marginTop: 50 }}
          onClick={handleRegister}
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
