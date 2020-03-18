import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import logo from '../logo.png';
import { AppBar, Toolbar, Button, Typography } from '@material-ui/core/';
import { MyButton } from './MyButton';

const listPath = [
  { name: 'Member info', path: '/admin/member' },
  { name: 'Driver info', path: '/admin/driver' },
  { name: 'Withdrawal', path: '/admin/withdrawal' },
  { name: 'Report', path: '/admin/report' },
];
const useStyles = makeStyles({
  list: {
    width: 250,
  },
  bar: { backgroundColor: '#C78899' },
  barSection: { flexGrow: 1, display: 'flex' },
  barItem: { marginRight: '36px', cursor: 'pointer', color: 'white' },
});

const NavigationDesktop = ({ history, user, handleLogout }) => {
  const classes = useStyles();
  return (
    <AppBar className={classes.bar} position="static">
      <Toolbar>
        <div className={classes.barSection}>
          <img
            className={classes.barItem}
            src={logo}
            height={50}
            onClick={() => {
              history.push('/');
            }}
          />
          {listPath.map(({ name, path }) => (
            <Button
              key={name}
              className={classes.barItem}
              onClick={() => {
                history.push(path);
              }}
            >
              {name}
            </Button>
          ))}
        </div>
        <Typography className={classes.barItem}>
          Hello, {user && user.username ? user.username : 'anonymous'}
        </Typography>
        <MyButton
          onClick={() => {
            history.push('/admin/login');
            handleLogout();
          }}
        >
          Sign out
        </MyButton>
      </Toolbar>
    </AppBar>
  );
};

export default withRouter(NavigationDesktop);
