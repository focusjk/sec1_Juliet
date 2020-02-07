import React from 'react';
import Grid from '@material-ui/core/Grid';
import profile from '../profile.jpg';
import { Box } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { MyFullWidthButton } from '../component/MyButton';

class DriverRequest extends React.Component {
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
	    style={{ alignSelf: 'center',borderRadius: 400/ 2,marginBottom: 50  }}
          />
	<Box style={{ backgroundColor:'#C4C4C4',marginBottom: '40px' ,alignSelf: 'center',height:'30vh',width:'60vh'}}>
         <h2>Driver's Info</h2>
	<Input fullWidth placeholder="Driving License No." />	
	<Input fullWidth placeholder="License Plate" />
	<Input fullWidth placeholder="Car Brand" />
	<Input fullWidth placeholder="Capacity" />
        </Box>
	<MyFullWidthButton style={{ marginTop: 10,marginButtom: 10,width:'60vh',alignSelf: 'center' }}>Request</MyFullWidthButton>
     </Grid>
     )
  }
}

export default DriverRequest;
