import React from 'react';
import Grid from '@material-ui/core/Grid';
import profile from '../profile.jpg';
import { Box } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { MyFullWidthButton,MyDisabledFullWidthButton } from '../component/MyButton';
import NoteIcon from '@material-ui/icons/Note';
import {IconButton,Icon} from '@material-ui/core/';
import { BrowserRouter as Router, Switch, Route, Redirect } from 'react-router-dom';

class DriverRequest extends React.Component {
  constructor(props) {
    super(props);
    this.state = {change: false};
  }
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
	<h2  style={{ marginLeft:10 }} > Name Name </h2>
	</Grid>
	<Box style={{ backgroundColor:'#F8F8F8',marginBottom: '40px' ,alignSelf: 'center',height:'15vh',width:'55vh'}}>
	<h2 style={{ marginLeft:10 }}>Driver's Info</h2>
	<div style={{border:'1px',solid:'#DDD'}}>
    	< NoteIcon style={{ marginLeft: 10}}/>

	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="Driving License No." onChange={() => {
              this.setState({change:true});
            }}/>	
	</div>
        </Box>
	 <Switch>
	 {!this.state.change && (
		<MyDisabledFullWidthButton style={{ marginTop: 10,marginButtom: 10,width:'60vh',alignSelf: 'center' }} disabled={true}>Request</MyDisabledFullWidthButton>
            )}
	 {this.state.change && (
		<MyFullWidthButton style={{ marginTop: 10,marginButtom: 10,width:'60vh',alignSelf: 'center' }} onClick={() => {
              this.setState({change:false});
            }}>Request</MyFullWidthButton>
            )}
	 </Switch>
     </Grid>
     )
  }
}

export default DriverRequest;
