import React from 'react';
import Grid from '@material-ui/core/Grid';
import profile from '../profile.jpg';
import person from '../icon/person.png';
import mail from '../icon/mail.png';
import phone from '../icon/phone.png';
import card from '../icon/creditcard.png';
import lock from '../icon/lock.png';
import calendar from '../icon/calendar.png';
import { Box } from '@material-ui/core';
import { Input } from '@material-ui/core';
import { MyFullWidthButton } from '../component/MyButton';

class Profile extends React.Component {
  render() {
     return(
    <Grid container direction="column" justify="flex-start">
    <div style={{display: 'flex',  justifyContent:'center', alignItems:'center', height: '20vh'}}>
    <h1> My Profile </h1>
    </div>
     <Grid container direction="row" justify="center" >
	<img
            src={profile}
            height={80}
	    width={80}
	    style={{ alignSelf: 'center',borderRadius: 400/ 2,marginBottom: 50  }}
          />
	<h1  style={{ marginLeft:10 }} > Name Name </h1>
	</Grid>
	<Box style={{ backgroundColor:'#F8F8F8',marginBottom: '40px' ,alignSelf: 'center',height:'35vh',width:'60vh'}}>
         <h2 style={{ marginLeft: 10}} > Personal Info</h2>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<img src={person} style={{ marginLeft: 10 ,width:'2vh'}}/>
	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="First Name" />	
	</div>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<img src={person} style={{ marginLeft: 10 ,width:'2vh'}}/>
	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="Last Name" />	
	</div>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<img src={mail} style={{ marginLeft: 10 ,width:'2vh'}}/>
	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="Email" />	
	</div>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<img src={phone} style={{ marginLeft: 10 ,width:'2vh'}}/>
	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="Telephone No." />	
	</div>
        </Box>
	<Box style={{ backgroundColor:'#F8F8F8',marginBottom: '40px' ,alignSelf: 'center',height:'35vh',width:'60vh'}}>
         <h2 style={{ marginLeft: 10}} > Credit Card Info</h2>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<img src={person} style={{ marginLeft: 10 ,width:'2vh'}}/>
	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="Cardholder Name" />	
	</div>
	<div style={{border:'1px',solid:'#DDD'}}>
    	<img src={card} style={{ marginLeft: 10 ,width:'2vh'}}/>
	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="Card Number" />	
	</div>	
	<div style={{border:'1px',solid:'#DDD'}}>
    	<img src={calendar} style={{ marginLeft: 10 ,width:'2vh'}}/>
	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="Expiry date" />	
	</div>	
	<div style={{border:'1px',solid:'#DDD'}}>
    	<img src={lock} style={{ marginLeft: 10 ,width:'2vh'}}/>
	<Input style={{ marginLeft: 20, width:'45vh'}}  fullWidth placeholder="Security Code" />	
	</div>	
        </Box>
	<MyFullWidthButton style={{ marginTop: 10,marginButtom: 10,width:'60vh',alignSelf: 'center' }}>Save</MyFullWidthButton>
     </Grid>
	)  
}
}

export default Profile;
