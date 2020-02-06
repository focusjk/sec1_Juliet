import { Button } from '@material-ui/core';
import { withStyles } from '@material-ui/core/styles';

const MyButton = withStyles({
  root: {
    background: 'linear-gradient( #C78899 30%, #C78899 90%)',
    borderRadius: 40,
    border: '1px solid white',
    color: 'white',
    paddingRight: '24px',
    paddingLeft: '24px',
  },
  label: {
    fontFamily: 'Roboto',
    textTransform: 'capitalize',
  },
})(Button);

const MyWhiteButton = withStyles({
  root: {
    background: 'linear-gradient( white 30%, white 90%)',
    borderRadius: 40,
    border: '1px solid #C78899',
    color: '#C78899',
    paddingRight: '24px',
    paddingLeft: '24px',
  },
  label: {
    fontFamily: 'Roboto',
    textTransform: 'capitalize',
  },
})(Button);

const MyFullWidthButton = withStyles({
  root: {
    background: 'linear-gradient( #C78899 30%, #C78899 90%)',
    borderRadius: 40,
    border: 0,
    color: 'white',
    width: '100%',
    boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.15)',
  },
  label: {
    fontFamily: 'Roboto',
    textTransform: 'capitalize',
  },
})(Button);

const MyDisabledFullWidthButton = withStyles({
  root: {
    background: 'linear-gradient( #BDBDBD 30%, #BDBDBD 90%)',
    borderRadius: 40,
    border: 0,
    color: 'white',
    width: '100%',
    boxShadow: '0px 3px 3px 0px rgba(0,0,0,0.15)',
  },
  label: {
    fontFamily: 'Roboto',
    textTransform: 'capitalize',
  },
})(Button);

export { MyButton, MyWhiteButton, MyFullWidthButton, MyDisabledFullWidthButton };
