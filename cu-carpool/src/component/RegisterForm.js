import React from 'react';
import { Input, Box, TextField } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core";
import { typography } from '@material-ui/system';
import { Grid } from "@material-ui/core";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C78899',
    },
    secondary: {
      //light: '#0066ff',
      main: '#CE7B91',
      //contrastText: '#ffcc00',
    },
    //contrastThreshold: 3,
    //tonalOffset: 0.2,
  },
});

const useStyles = makeStyles({
  root: {
    color: "#777777",
    width: 295,
    marginLeft: 40,
    fontSize: 12,
  },
});

const RegisterForm = () => {
  const classes = useStyles();
  return (
    <>
      <ThemeProvider theme={theme}>
        <Grid   container
                direction="column"
                justify="flex-start"
                // alignItems="center"
        >
          <Input placeholder="First Name" className={classes.root}/>
          <Input placeholder="Last Name" className={classes.root}/>
          <Input placeholder="Username" className={classes.root}/>
          <Input placeholder="Password" className={classes.root}/>
          <Input placeholder="Email" className={classes.root}/>
          <Input placeholder="Phone Number" className={classes.root}/>
        </Grid>
      </ThemeProvider>
    </>
  );
};

export default RegisterForm;
