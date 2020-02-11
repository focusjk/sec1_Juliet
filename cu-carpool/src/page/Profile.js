import React from 'react';
import profile from '../profile.jpg';
import PersonIcon from '@material-ui/icons/Person';
import MailIcon from '@material-ui/icons/Mail';
import PhoneIcon from '@material-ui/icons/Phone';
import CreditCardIcon from '@material-ui/icons/CreditCard';
import LockIcon from '@material-ui/icons/Lock';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import { Box, Input, Grid } from '@material-ui/core';
import { MyFullWidthButton, MyDisabledFullWidthButton } from '../component/MyButton';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';
import UploadIcon from '../component/UploadIcon';

class Profile extends React.Component {
  state = { change: false };

  render() {
    return (
      <div>
        <div style={{ display: 'flex', justifyContent: 'center' }}>
          <h1> My Profile </h1>
        </div>
        <Grid
          container
          direction="row"
          justify="center"
          alignItems="center"
          style={{ marginBottom: '40px' }}
        >
          <div style={{ display: 'flex' }}>
            <img
              src={profile}
              height={100}
              width={100}
              style={{ alignSelf: 'center', borderRadius: '100%' }}
            />
            <UploadIcon />
          </div>
          <h2 style={{ margin: 0 }}> Name Name </h2>
        </Grid>
        <Box
          style={{
            backgroundColor: '#F8F8F8',
            marginBottom: '40px',
            alignSelf: 'center',
            padding: '8px 24px 24px 24px',
          }}
        >
          <h2> Personal Info</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <PersonIcon />
            <Input
              style={{ marginLeft: '8px' }}
              fullWidth
              placeholder="First Name"
              onChange={() => {
                this.setState({ change: true });
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <PersonIcon />
            <Input
              style={{ marginLeft: '8px' }}
              fullWidth
              placeholder="Last Name"
              onChange={() => {
                this.setState({ change: true });
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <MailIcon />
            <Input
              style={{ marginLeft: '8px' }}
              fullWidth
              placeholder="Email"
              onChange={() => {
                this.setState({ change: true });
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <PhoneIcon />
            <Input
              style={{ marginLeft: '8px' }}
              fullWidth
              placeholder="Telephone No."
              onChange={() => {
                this.setState({ change: true });
              }}
            />
          </div>
        </Box>
        <Box
          style={{
            backgroundColor: '#F8F8F8',
            marginBottom: '40px',
            alignSelf: 'center',
            padding: '8px 24px 24px 24px',
          }}
        >
          <h2> Credit Card Info</h2>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <PersonIcon />
            <Input
              style={{ marginLeft: '8px' }}
              fullWidth
              placeholder="Cardholder Name"
              onChange={() => {
                this.setState({ change: true });
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <CreditCardIcon />
            <Input
              style={{ marginLeft: '8px' }}
              fullWidth
              placeholder="Card Number"
              onChange={() => {
                this.setState({ change: true });
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <CalendarTodayIcon />
            <Input
              style={{ marginLeft: '8px' }}
              fullWidth
              placeholder="Expiry date"
              onChange={() => {
                this.setState({ change: true });
              }}
            />
          </div>
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            <LockIcon />
            <Input
              style={{ marginLeft: '8px' }}
              fullWidth
              placeholder="Security Code"
              onChange={() => {
                this.setState({ change: true });
              }}
            />
          </div>
        </Box>
        <Switch>
          {!this.state.change && (
            <MyDisabledFullWidthButton style={{ margin: '10px 0' }} disabled={true}>
              Save
            </MyDisabledFullWidthButton>
          )}
          {this.state.change && (
            <MyFullWidthButton
              style={{ margin: '10px 0' }}
              onClick={() => {
                this.setState({ change: false });
              }}
            >
              Save
            </MyFullWidthButton>
          )}
        </Switch>
      </div>
    );
  }
}

export default Profile;
