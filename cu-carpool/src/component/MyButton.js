import React from 'react';
import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const MyButton = withStyles({
  root: {
    background: 'linear-gradient( #C78899 30%, #C78899 90%)',
    borderRadius: 40,
    border: 0,
    color: 'white',
    height: 30,
    width: 200,
    boxShadow: '3 3px 5px 2px rgba(40,40,40)',
    //padding: '0 30px',
  },
  label: {
    fontFamily: 'Roboto' ,
    textTransform: 'capitalize',
    marginTop: -3
  },
})(Button);

export default MyButton;
