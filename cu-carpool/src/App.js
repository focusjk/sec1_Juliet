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
import AdminWithdrawal from "./page/AdminWithdrawal";
import DriverRequest from "./page/DriverRequest";
import TripMemberforMember from "./page/TripMemberforMember";
import TripMemberforDriver from "./page/TripMemberforDriver";
import Navigation from "./component/Navigation";
import NavigationDesktop from "./component/NavigationDesktop";
import ButtonComponent from "./page/ButtonComponent";
import MemberReport from "./page/MemberReport";
import TripDetail from "./page/TripDetail";
import TripRequest from "./page/TripRequest";
import TripHistory from "./page/TripHistory";
import AdminReport from "./page/AdminReport";
import MemberInfo from "./page/MemberInfo";
import Payment from "./page/Payment";
import AdminTrip from "./page/AdminTrip";
import CreateWtihdrawal from "./page/CreateWithdrawal";
import Wallet from "./page/Wallet";
import TransactionLog from "./page/TransactionLog";
import WithdrawalLog from "./page/WithdrawalLog";

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
  // for member
  const [user, setUser] = React.useState({ id: 1, driver_status: "approved" });
  // for admin
  //const [user, setUser] = React.useState({ username: 'admin' });
  // for other
  // const [user, setUser] = React.useState(null);

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
                    <Route path="/report" exact>
                      <MemberReport user={user} />
                    </Route>
                    <Route path="/trip/:trip_id/detail" exact>
                      <TripDetail joinable path="/" user={user} />
                    </Route>
                    <Route path="/trip-history/:trip_id/detail" exact>
                      <TripDetail path="/trip-history" user={user} />
                    </Route>
                    <Route path="/trip/:trip_id/detail" exact>
                      <TripDetail joinable path="/" user={user} />
                    </Route>
                    <Route path="/trip-history/:trip_id/detail" exact>
                      <TripDetail path="/trip-history" user={user} />
                    </Route>
                    <Route path="/trip-history/:trip_id/member" exact>
                      <TripMemberforMember user={user} />
                    </Route>
                    <Route path="/my-trip/:trip_id/member" exact>
                      <TripMemberforDriver user={user} />
                    </Route>
                    <Route path="/trip-history" exact>
                      <TripHistory user={user} />
                    </Route>
                    <Route path="/my-trip/:trip_id/request" exact>
                      <TripRequest user={user} />
                    </Route>
                    <Route path="/payment/:request_id/request" exact>
                      <Payment user={user} />
                    </Route>
                    <Route path="/driver" exact>
                      <DriverProfile
                        user={user}
                        updateUser={data => setUser({ ...user, ...data })}
                      />
                    </Route>
                    <Route path="/wallet" exact>
                      <Wallet user={user} />
                    </Route>
                    <Route path="/withdrawal" exact>                   
                      <CreateWtihdrawal user={user} />                  
                    </Route>
                    <Route path="/transactionlog" exact>
                      <TransactionLog user={user} />
                    </Route>
                    <Route path="/withdrawallog" exact>
                      <WithdrawalLog user={user} />
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
                    <Route path="/admin/report" exact>
                      <AdminReport user={user} />
                    </Route>
                    <Route path="/admin/trip" exact>
                      <AdminTrip user={user} />
                    </Route>
                    <Route path="/admin/member" exact>
                      <MemberInfo user={user} />
                    </Route>
                    <Route path="/admin/withdrawal" exact>
                      <AdminWithdrawal user={user} />
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
                  <Redirect to="/login" />
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
