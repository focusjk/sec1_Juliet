import React from 'react';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';
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

const RegisterForm = () => {
  const classes = useStyles();
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch">

      <div style={{ marginBottom: 5 }}>FIRST NAME</div>
      <Input fullWidth placeholder="First Name" className={classes.root} />

      <div style={{ marginBottom: 5 }}>LAST NAME</div>
      <Input fullWidth placeholder="Last Name" className={classes.root} />

      <div style={{ marginBottom: 5 }}>USERNAME</div>
      <Input fullWidth placeholder="Username" className={classes.root} />

      <div style={{ marginBottom: 5 }}>PASSWORD</div>
      <Input placeholder="Password" className={classes.root}
        id="standard-adornment-password"
        type={showPassword ? 'text' : 'password'}
        value={password}
        onChange={e => setPassword(e.target.value)}
        endAdornment={
          <InputAdornment position="end">
            <IconButton
              aria-label="toggle password visibility"
              onClick={() => {
                setShowPassword(!showPassword);
              }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />

      <div style={{ marginBottom: 5 }}>EMAIL</div>
      <Input fullWidth placeholder="Email" className={classes.root} />

      <div style={{ marginBottom: 5 }}>PHONE NUMBER</div>
      <Input fullWidth placeholder="Phone Number" className={classes.root} />

      <div style={{ marginBottom: 10 }}>PROFILE PICTURE</div>
    </Grid>
  );
};

export default RegisterForm;
