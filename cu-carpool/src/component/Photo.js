import React from 'react';
import IconButton from '@material-ui/core/IconButton';
import AddAPhotoRoundedIcon from '@material-ui/icons/AddAPhotoRounded';
import { makeStyles } from '@material-ui/core/styles';
import { Box } from "@material-ui/core";

const useStyles = makeStyles(theme => ({
  root: {
    '& > *': {
      margin: theme.spacing(1),
    },
  },
  input: {
    display: 'none',
  },
}));

const defaultProps = {
  bgcolor: 'background.paper',
  m: 1.5,
  border: 1,
  marginTop: -9.2,
  style: { width: 220, height: 80 },
};

const Photo = () => {
  const classes = useStyles();
  return (
    <>
      <input accept="image/*" className={classes.input} id="icon-button-file" type="file" />
      <label htmlFor="icon-button-file">
        <IconButton color="#bdbdbd" aria-label="upload picture" component="span">
          <AddAPhotoRoundedIcon style={{ marginLeft:30}}/>
          <div style={{ fontSize: 13, marginTop: 45, marginLeft:-53}} color="#bdbdbd">
            Upload image
          </div>
        </IconButton>
      </label>
      <Box display="flex" justifyContent="center">
        <Box borderColor="#bdbdbd" {...defaultProps} />
      </Box>
    </>
  );
};

export default Photo;
