import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './page/Register';
import { makeStyles, createMuiTheme } from '@material-ui/core/styles';
import { ThemeProvider } from '@material-ui/core';
import Home from './page/Home';
import Login from './page/Login';
import Profile from './page/Profile';
import DriverProfile from './page/DriverProfile';
import CreateTrip from './page/CreateTrip';
import AdminLogin from './page/AdminLogin';
import DriverRequest from './page/DriverRequest';
import Navigation from './component/Navigation';
import NavigationDesktop from './component/NavigationDesktop';
import ButtonComponent from './page/ButtonComponent';

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
  app: {
    fontFamily: 'Roboto',
    fontSize: '14px',
  },
  body: {
    margin: '30px',
  },
});
const App = () => {
  //for member
  // const [user, setUser] = React.useState({ id: 1 });
  // for admin
  // const [user, setUser] = React.useState({ username: 'focus' });
  const [user, setUser] = React.useState(null);

  const classes = useStyles();
  return (
    <ThemeProvider theme={theme}>
      <div className={classes.app}>
        <Router>
          <Switch>
            {user && user.id && (
              <div>
                <Navigation user={user} handleLogout={() => setUser(null)} />
                <div className={classes.body}>
                  {/* REMOVE */}
                  <Route path="/ButtonComponent">
                    <ButtonComponent />
                  </Route>
                  <Route path="/profile">
                    <Profile user={user} />
                  </Route>
                  <Route path="/create-trip">
                    <CreateTrip user={user} />
                  </Route>
                  <Route path="/driver">
                    <DriverProfile user={user} />
                  </Route>
                  <Route exact path="/">
                    <Home user={user} />
                  </Route>
                  <Redirect to="/" />
                </div>
              </div>
            )}
            {user && !user.id && (
              <div>
                <NavigationDesktop user={user} handleLogout={() => setUser(null)} />
                <Route path="/admin/driver-request">
                  <DriverRequest user={user} />
                </Route>
                <Redirect to="/admin/driver-request" />
              </div>
            )}
            {!user && (
              <div className={classes.body}>
                <Route path="/register">
                  <Register user={user} />
                </Route>
                <Route path="/admin">
                  <AdminLogin user={user} />
                </Route>
                <Route path="/login">
                  <Login user={user} />
                </Route>
              </div>
            )}
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
