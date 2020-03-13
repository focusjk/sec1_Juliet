import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import moment from 'moment';
import { MyButton, MyGreyButton } from '../component/MyButton';
import { MemberInfoCard } from '../component/MemberInfoCard';
import { MyHeader } from '../component/MyTitle'
import EmptyBox from '../component/EmptyBox';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from "@material-ui/core/styles";


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

  state = { list: [], filteredList: [], mode: 0 }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = async () => {
    const response = await axios.get("http://localhost:4000/admin/report");
    const { success, report } = response.data
    if (success) {
      this.setState({ list: report })
    }
    this.filter(this.state.mode)
  }
 
  handleMode = (e, value) => {
    if (value !== null) {
      this.setState({ mode: value })
      this.filter(value)
    }
  }

  filter = mode => {
    const { list } = this.state
    let filteredList = []
    filteredList = list
    this.setState({ filteredList })
  }
  render() {
    return (

      <Grid container direction="column" justify="center" style={{ width: "100%" }}>
        <MyHeader style={{ justifyContent: 'left' }}>
          > Member Info
      </MyHeader>

        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40 px' }}>
          <ToggleButtonGroup exclusive value={this.state.mode} onChange={this.handleMode}>
            <MyToggleButton style={{ width: '140px', height: '42px', border: "1px solid #C78899", }} value={0}> All </MyToggleButton>
            <MyToggleButton style={{ width: '140px', height: '42px', border: "1px solid #C78899", }} value={1}> Active </MyToggleButton>
            <MyToggleButton style={{ width: '140px', height: '42px', border: "1px solid #C78899", }} value={2}> Banned </MyToggleButton>
          </ToggleButtonGroup>
	  <MemberInfo />
        </div>
      </Grid>
    )
  }
}


export default MemberInfo;