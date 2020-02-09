import React from 'react';
import Grid from '@material-ui/core/Grid';
import profile from '../profile.jpg';
import { Box } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { MyFullWidthButton } from '../component/MyButton';
import note from '../icon/note.png';
import plate from '../icon/plate.png';
import car from '../icon/car.png';
import group from '../icon/group.png';
import {IconButton,Icon} from '@material-ui/core/';

class DriverRequest extends React.Component {
  render() {
    return (
     <Grid container direction="column" justify="flex-start">
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
    <h1> Driver's form </h1>
    </div>
     <Grid container direction="row" justify="center" >
	<img
            src={profile}
            height={100}
	    width={100}
	    style={{ alignSelf: 'center',borderRadius: 400/ 2,marginBottom: 50  }}
          />
	<h1  style={{ marginLeft:10 }} > Name Name </h1>
	</Grid>
	<Box style={{ backgroundColor:'#F8F8F8',marginBottom: '40px' ,alignSelf: 'center',height:'15vh',width:'55vh'}}>
	<h2 style={{ marginLeft:10 }}>Driver's Info</h2>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<img src={note} style={{ marginLeft: 10 ,width:'2vh'}}/>
	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="Driving License No." />	
	</div>
        </Box>
	<MyFullWidthButton style={{ marginTop: 10,marginButtom: 10,width:'60vh',alignSelf: 'center' }}>Request</MyFullWidthButton>
     </Grid>
     )
  }
}

export default DriverRequest;
