import React from 'react';
import CameraAltIcon from '@material-ui/icons/CameraAlt';
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
  label: {
    border: 'none',
    color: '#000000',
    display: 'flex',
    flexDirection: 'column-reverse',
    alignItems: 'center',
    marginTop: 80 
  },
}));

const Upload = () => {
  const classes = useStyles();
  return (
    <div>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file" >
        <div className={classes.label} >
          <CameraAltIcon />
        </div>
      </label>
    </div>
  );
};

export default Upload;
