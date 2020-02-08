import React from 'react';
import { Input, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import InputAdornment from '@material-ui/core/InputAdornment';
import IconButton from '@material-ui/core/IconButton';
import Visibility from '@material-ui/icons/Visibility';
import VisibilityOff from '@material-ui/icons/VisibilityOff';
import { withRouter } from 'react-router-dom';

const useStyles = makeStyles({
  root: {
    color: '#777777',
    marginBottom: 20,
  },
});

const LoginForm = () => {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  const [password, setPassword] = React.useState('');
  const [showPassword, setShowPassword] = React.useState(false);

  return (
    <Grid container direction="column" justify="flex-start">
      <div style={{ marginBottom: 5 }}> USERNAME </div>
      <Input placeholder="Username" className={classes.root} 
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <div style={{ marginBottom: 5 }}> PASSWORD </div>
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
                setShowPassword( !showPassword );
              }}
            >
              {showPassword ? <Visibility /> : <VisibilityOff />}
            </IconButton>
          </InputAdornment>
        }
      />

    </Grid>
  );
};

export default withRouter(LoginForm);
