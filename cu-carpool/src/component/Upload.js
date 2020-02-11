import React from 'react';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
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
    border: '1px dashed #BDBDBD',
    color: '#BDBDBD',
    padding: '20px',
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'center',
  },
}));

const Upload = () => {
  const classes = useStyles();
  return (
    <div>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <div className={classes.label}>
          <AddAPhotoRoundedIcon />
          <div>Upload image</div>
        </div>
      </label>
    </div>
  );
};

export default Upload;
