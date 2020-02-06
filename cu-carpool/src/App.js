import React from 'react';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import Register from './page/Register';
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
class App extends React.Component {
  state = {
    //TODO : remove mock data
    user: { id: 1, driver_status: null },
    // user: { username: 'focus' },
  };

  handleEditUser = user => {
    this.setState({ user: user });
  };

  render() {
    const { user } = this.state;
    return (
      <Router>
        <Switch>
          {/* REMOVE */}
          <Route path="/ButtonComponent">
            <ButtonComponent />
          </Route>
          {user && user.id && (
            <div>
              <Navigation user={user} handleLogout={() => this.setState({ user: null })} />
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
          )}
          {user && !user.id && (
            <div>
              <NavigationDesktop user={user} handleLogout={() => this.setState({ user: null })} />
              <Route path="/admin/driver-request">
                <DriverRequest user={user} />
              </Route>
              <Redirect to="/admin/driver-request" />
            </div>
          )}
          {!user && (
            <div>
              <Route path="/register">
                <Register user={user} />
              </Route>
              <Route path="/admin">
                <AdminLogin user={user} />
              </Route>
              <Route path="/login">
                <Login user={user} />
              </Route>
              <Redirect to="/login" />
            </div>
          )}
        </Switch>
      </Router>
    );
  }
}
export default App;
