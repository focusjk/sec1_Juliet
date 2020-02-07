import React from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import Register from './page/Register';
import Home from './page/Home';
import Login from './page/Login';
import Profile from './page/Profile';
import DriverProfile from './page/DriverProfile';
import CreateTrip from './page/CreateTrip';
import AdminLogin from './page/AdminLogin';
import DriverRequest from './page/DriverRequest';
import Navigation from './component/Navigation';

class App extends React.Component {
  state = {
    user: null,
  };

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
  // for member
  // const [user, setUser] = React.useState({ id: 1 });
  // for admin
  // const [user, setUser] = React.useState({ username: 'focus' });
  const [user, setUser] = React.useState(null);

  render() {
    const { user } = this.state;
    return (
      <Router>
        <Navigation user={user} />

        <Switch>
          <Route path="/register">
            <Register user={user} />
          </Route>
          <Route path="/login">
            <Login user={user} />
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
          <Route path="/admin">
            <AdminLogin user={user} />
          </Route>
          <Route path="/admin/driver-request">
            <DriverRequest user={user} />
          </Route>
          <Route path="/">
            <Home user={user} />
          </Route>
        </Switch>
      </Router>
    );
  }
}
export default App;
