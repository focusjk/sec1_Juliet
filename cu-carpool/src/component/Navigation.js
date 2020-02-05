import React from 'react';
import { BrowserRouter as Link } from 'react-router-dom';

import { makeStyles } from '@material-ui/core/styles';
import AppBar from '@material-ui/core/AppBar';
import Toolbar from '@material-ui/core/Toolbar';
import Typography from '@material-ui/core/Typography';
import Button from '@material-ui/core/Button';
import IconButton from '@material-ui/core/IconButton';
import MenuIcon from '@material-ui/icons/Menu';

class Navigation extends React.Component {
  state = { open: false };

  // const classes = useStyles();
  render() {
    const { open } = this.state;
    return (
      <AppBar position="static" style={{ backgroundColor: '#C78899' }}>
        <Toolbar>
          <Typography variant="h6" style={{ flexGrow: 1 }}>
            News
          </Typography>
          <IconButton
            edge="start"
            color="inherit"
            aria-label="menu"
            onClick={() => this.setState({ open: !open })}
          >
            <MenuIcon />
          </IconButton>
        </Toolbar>
      </AppBar>
    );
  }
}

export default Navigation;

// const Navigation = () => {
//   return (
//     <nav>
//       <ul>
//         <li>
//           <Link to="/">Home</Link>
//         </li>
//         <li>
//           <Link to="/about">About</Link>
//         </li>
//         <li>
//           <Link to="/users">Users</Link>
//         </li>
//       </ul>
//     </nav>
//   );
// };
