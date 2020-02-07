import React from 'react';
import Grid from '@material-ui/core/Grid';
import profile from '../profile.jpg';

class ProfileLog extends React.Component {
  render() {
    return (
     <Grid container direction="column" justify="flex-start">
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
    <h1> Driver's form </h1>
    </div>
     <img
            src={profile}
            height={80}
	    width={80}
	    style={{ alignSelf: 'center',borderRadius: 400/ 2 }}
          />
     </Grid>
     )
  }
}

export default ProfileLog;
