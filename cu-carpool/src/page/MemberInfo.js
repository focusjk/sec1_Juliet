import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import moment from 'moment';
import { MyButton, MyGreyButton } from '../component/MyButton';
import MemberInfoCard  from '../component/MemberInfoCard';
import { MyHeader } from '../component/MyTitle'
import EmptyBox from '../component/EmptyBox';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from "@material-ui/core/styles";
import Textfield from "@material-ui/core/Textfield";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';
const formatter = date => moment(date).format('MMMM Do YYYY, h:mm a');

const MyToggleButton = withStyles({
  root: {
    background: "linear-gradient( white 30%, white 90%)",
    borderRadius: 20,
    border: "1px solid #C78899",
    color: "#C78899",
  },
  label: {
    textTransform: "capitalize",
    fontFamily: "Roboto",
    fontSize: "16px"
  },
  selected: {
    background: "linear-gradient( #C78899 30%, #C78899 90%)",
  },
})(ToggleButton);


class MemberInfo extends React.Component {
  render() {
    return (

      <Grid container direction="column" justify="center" style={{ width: "100%" }}>
        <MyHeader style={{ justifyContent: 'left' }}>
          > Member Info
      </MyHeader>
	<Textfield
	  variant="outlined"
          style={{
    	  alignSelf: "center",
	  width : "50%",
	  marginBottom: 20,   
	  }}
	  placeholder=" Search by ID, name, username"
          InputProps={{
	  border:'transparent',
          endAdornment: (
            <InputAdornment position="end">
              <SearchIcon />
            </InputAdornment>
          ),
        }}
	/>
	
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40 px' }}>
          <ToggleButtonGroup>
            <MyToggleButton style={{ width: '140px', height: '42px', border: "1px solid #C78899", }}> All </MyToggleButton>
            <MyToggleButton style={{ width: '140px', height: '42px', border: "1px solid #C78899", }}> Active </MyToggleButton>
            <MyToggleButton style={{ width: '140px', height: '42px', border: "1px solid #C78899", }}> Banned </MyToggleButton>
          </ToggleButtonGroup>
		<MemberInfoCard />
        </div>
      </Grid>
    )
  }
}


export default MemberInfo;