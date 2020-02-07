import React from 'react';
import { Input, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles({
  root: {
    color: '#777777',
    marginBottom: 20,
  },
});

const LoginForm = () => {
  const classes = useStyles();
  return (
    <Grid container direction="column" justify="flex-start">
      <div style={{ marginBottom: 5 }}> USERNAME </div>
      <Input placeholder="Username" className={classes.root} />

      <div style={{ marginBottom: 5 }}> PASSWORD </div>
      <Input placeholder="Password" className={classes.root} />
    </Grid>
  );
};

export default LoginForm;
