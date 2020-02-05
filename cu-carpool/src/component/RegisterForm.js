import React from 'react';
import { Input } from "@material-ui/core";
import { makeStyles } from "@material-ui/core/styles";
import { createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from "@material-ui/core";
import Grid from '@material-ui/core/Grid';

const theme = createMuiTheme({
  palette: {
    primary: {
      main: '#C78899', //pink base
    },
    secondary: {
      main: '#CE7B91', // pink text
    },
  },
});

const useStyles = makeStyles({
  root: {
    color: "#777777", // very light grey
    width: 295,
    marginLeft: 40,
    marginBottom: 20,
    fontSize: 12,
    fontFamily: 'Roboto',
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
          <div style={{ marginLeft: 40, marginBottom: 5, fontSize: 13, }}
            fontFamily='Roboto'
          > FIRST NAME </div>
          <Input placeholder="First Name" className={classes.root}/>

          <div style={{ marginLeft: 40, marginBottom: 5, fontSize: 13, }}
            fontFamily='Roboto'
          > LAST NAME </div>
          <Input placeholder="Last Name" className={classes.root}/>

          <div style={{ marginLeft: 40, marginBottom: 5, fontSize: 13, }}
            fontFamily='Roboto'
          > USERNAME </div>
          <Input placeholder="Username" className={classes.root}/>

          <div style={{ marginLeft: 40, marginBottom: 5, fontSize: 13, }}
            fontFamily='Roboto'
          > PASSWORD </div>
          <Input placeholder="Password" className={classes.root}/>

          <div style={{ marginLeft: 40, marginBottom: 5, fontSize: 13, }}
            fontFamily='Roboto'
          > EMAIL </div>
          <Input placeholder="Email" className={classes.root}/>

          <div style={{ marginLeft: 40, marginBottom: 5, fontSize: 13, }}
            fontFamily='Roboto'
          > PHONE NUMBER </div>
          <Input placeholder="Phone Number" className={classes.root}/>

          <div style={{ marginLeft: 40, marginBottom: 5, fontSize: 13, }}
            fontFamily='Roboto'
          > PROFILE PICTURE </div>

        </Grid>
      </ThemeProvider>
    </>
  );
};

export default RegisterForm;
