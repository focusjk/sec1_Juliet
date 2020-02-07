import React from 'react';
import { Input } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import Grid from '@material-ui/core/Grid';

const useStyles = makeStyles({
  root: {
    color: '#777777',
    marginBottom: 20,
  },
});

const RegisterForm = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="flex-start" alignItems="stretch">
      <div style={{ marginBottom: 5 }}>FIRST NAME</div>
      <Input fullWidth placeholder="First Name" className={classes.root} />

      <div style={{ marginBottom: 5 }}>LAST NAME</div>
      <Input fullWidth placeholder="Last Name" className={classes.root} />

      <div style={{ marginBottom: 5 }}>USERNAME</div>
      <Input fullWidth placeholder="Username" className={classes.root} />

      <div style={{ marginBottom: 5 }}>PASSWORD</div>
      <Input fullWidth placeholder="Password" className={classes.root} />

      <div style={{ marginBottom: 5 }}>EMAIL</div>
      <Input fullWidth placeholder="Email" className={classes.root} />

      <div style={{ marginBottom: 5 }}>PHONE NUMBER</div>
      <Input fullWidth placeholder="Phone Number" className={classes.root} />

      <div style={{ marginBottom: 10 }}>PROFILE PICTURE</div>
    </Grid>
  );
};

export default RegisterForm;
