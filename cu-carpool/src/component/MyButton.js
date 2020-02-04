import React from 'react';
import { styled } from '@material-ui/core/styles';
import { Button } from '@material-ui/core';

const MyButton = styled(Button)({
  background: 'linear-gradient(#C78899 30%, #C78899 90%)',
  //background: '#C78899',
  border: 0,
  borderRadius: 40,
  boxShadow: '2 3px 5px 2px rgba(40, 40, 40)',
  color: 'white',
  height: 30,
  width: 200,
  //marginTop: 0
  //padding: '0 30px',
});

export default MyButton;
