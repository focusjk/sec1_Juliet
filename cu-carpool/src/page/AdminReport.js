import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import moment from 'moment';
import { MyButton, MyGreyButton } from '../component/MyButton';
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

class AdminReport extends React.Component {

  state = { list: [], mode: 0 }
  componentDidMount() {
    this.fetchData()
  }
  fetchData = async () => {
    const response = await axios.get("http://localhost:4000/admin/report");
    const { success, report } = response.data
    console.log(response.data)
    if (success) {
      this.setState({ list: report })
    }
  }
  handleRead = async (id,is_read) => {
    const { username } = this.props.user;
    console.log({ id, admin_name: username })
    const response = await axios.post("http://localhost:4000//admin/report/read", { id, is_read: !is_read });
    const { success } = response.data
    if (success) {
      this.fetchData()
    }
  }


  render() {
    return (
      <Grid container direction="column" justify="center" style={{ width: "100%" }}>
      <MyHeader style={{ justifyContent: 'left' }}>
        > Report Log
      </MyHeader>

      <div style={{display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40 px'}}>
      <ToggleButtonGroup value={this.state.mode}>
        <MyToggleButton style = {{width: '140px', height: '42px', border: "1px solid #C78899",}} value={0}> All </MyToggleButton>
        <MyToggleButton style = {{width: '140px', height: '42px', border: "1px solid #C78899",}} value={1}> Read </MyToggleButton>
        <MyToggleButton style = {{width: '140px', height: '42px', border: "1px solid #C78899",}} value={2}> Unread </MyToggleButton>
      </ToggleButtonGroup>
      </div>
  
      <div style={{ margin: "32px 0", alignSelf: 'center' }}>
         <EmptyBox data={this.state.list} />
         {this.state.list.map(({id, member_id, username, firstname, lastname, topic, comment,photo, created_at, is_read }) =>
          <div style={{ maxWidth: 740, display: 'flex', flexDirection: 'column', border: "1px solid #C4C4C4", padding: '16px 48px', marginBottom: '16px'}}>
            <div style={{ display: 'flex', alignItems: 'center', marginRight: '16px' }}>
              <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center',flexWrap: 'wrap', width: '150px', marginRight: '16px' }}>
                 <img
                  src={photo}
                  height={100}
                  width={100}
                  style={{ alignItems: 'center', borderRadius: "100%", marginBottom: "16px" }}
                />
                <div style={{ alignSelf: 'center' }}> {username} </div>
              </div>
              <div style={{ maxWidth: 407, display: 'flex', flexDirection: 'column', justifyContent: 'space-between'}}>
                <div> <b> Member ID:</b> {member_id}</div>
                <div> <b>Name:</b> {firstname} {lastname}</div>
                <div> <b>Topic:</b> {topic}</div>
                <div> <b>Comment:</b> </div>
                <div style={{  wordBreak: "break-word", textIndent: "50px"}} >  {comment} </div>
                <div> <b>Created at :</b> {created_at} </div>
              </div>
              </div>
            <div style={{ display: 'flex', justifyContent: 'center', marginTop: '16px'}}>
                {!!is_read && <MyGreyButton onClick={()=> this.handleRead(id,is_read)}>Read</MyGreyButton>}
                {!is_read && <MyButton onClick={()=> this.handleRead(id,is_read)}>Read</MyButton>}

            </div>
          </div>
           )}
      </div>
    </Grid>
     )
     }
}


export default AdminReport;