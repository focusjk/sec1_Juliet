import React from "react";
import {
  BrowserRouter as Router,
  Switch,
  Route,
  Redirect
} from "react-router-dom";
import Register from "./page/Register";
import { makeStyles, createMuiTheme } from "@material-ui/core/styles";
import { ThemeProvider } from "@material-ui/core";
import Home from "./page/Home";
import Login from "./page/Login";
import Profile from "./page/Profile";
import DriverProfile from "./page/DriverProfile";
import CreateTrip from "./page/CreateTrip";
import MyTrip from "./page/MyTrip";
import AdminLogin from "./page/AdminLogin";
import DriverRequest from "./page/DriverRequest";
import Navigation from "./component/Navigation";
import NavigationDesktop from "./component/NavigationDesktop";
import ButtonComponent from "./page/ButtonComponent";

const theme = createMuiTheme({
  palette: {
    primary: {
      main: "#C78899" //pink base
    },
    secondary: {
      main: "#CE7B91" // pink text
    }
  }
});

const useStyles = makeStyles({
  app: {
    fontFamily: "Roboto",
    fontSize: "16px"
  },
  body: {
    padding: "30px",
    maxWidth: "414px",
    margin: "auto",
    right: 0
  },
  admin: {
    margin: "32px 64px"
  }
});
const App = () => {
  //for member
  // const [user, setUser] = React.useState({ id: 1, driver_status: "approved" });
  // for admin
  // const [user, setUser] = React.useState({ username: 'admin' });
  // for other
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
                  <Switch>
                    <Route path="/ButtonComponent" exact>
                      <ButtonComponent />
                    </Route>
                    <Route path="/profile" exact>
                      <Profile
                        user={user}
                        updateUser={data => setUser({ ...user, ...data })}
                      />
                    </Route>
                    {user.driver_status === "approved" && (
                      <Route path="/create-trip" exact>
                        <CreateTrip user={user} />
                      </Route>
                    )}
                    <Route path="/my-trip" exact>
                      <MyTrip user={user} />
                    </Route>
                    <Route path="/driver" exact>
                      <DriverProfile
                        user={user}
                        updateUser={data => setUser({ ...user, ...data })}
                      />
                    </Route>
                    <Route exact path="/">
                      <Home user={user} />
                    </Route>
                    <Redirect to="/" />
                  </Switch>
                </div>
              </div>
            )}
            {user && !user.id && (
              <div>
                <NavigationDesktop
                  user={user}
                  handleLogout={() => setUser(null)}
                />
                <div className={classes.admin}>
                  <Switch>
                    <Route path="/admin/driver" exact>
                      <DriverRequest user={user} />
                    </Route>
                    <Redirect to="/admin/driver" />
                  </Switch>
                </div>
              </div>
            )}
            {!user && (
              <div className={classes.body}>
                <Switch>
                  <Route path="/ButtonComponent" exact>
                    <ButtonComponent />
                  </Route>
                  <Route path="/register" exact>
                    <Register handleLogin={user => setUser(user)} />
                  </Route>
                  <Route path="/admin/login" exact>
                    <AdminLogin handleLogin={user => setUser(user)} />
                  </Route>
                  <Route path="/login" exact>
                    <Login handleLogin={user => setUser(user)} />
                  </Route>
                  <Redirect to="/register" />
                </Switch>
              </div>
            )}
          </Switch>
        </Router>
      </div>
    </ThemeProvider>
  );
};

export default App;
