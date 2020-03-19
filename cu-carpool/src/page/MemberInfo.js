import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import moment from 'moment';
import MemberInfoCard from '../component/MemberInfoCard';
import { MyHeader } from '../component/MyTitle'
import EmptyBox from '../component/EmptyBox';
import ToggleButton from '@material-ui/lab/ToggleButton';
import ToggleButtonGroup from '@material-ui/lab/ToggleButtonGroup';
import { withStyles } from "@material-ui/core/styles";
import Textfield from "@material-ui/core/Textfield";
import SearchIcon from '@material-ui/icons/Search';
import InputAdornment from '@material-ui/core/InputAdornment';

const MyToggleButton = withStyles({
  root: {
    background: "linear-gradient( white 30%, white 90%)",
    borderRadius: 20,
    border: "1px solid #C78899",
    color: "#C78899",
    width: '140px',
    height: '40px'
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
  state = { list: [], filteredList: [], mode: 0, search:null}
  fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/admin/member");
      const { success, member } = response.data;
      if (success) {
        this.setState({ list: member });
      }
      this.filter(this.state.mode)
    } catch (e) {
      console.log(e);
    }
  }
  handleMode = (e,value) => {
    if (value !== null) {
      this.setState({ mode: value })
      this.filter(value,this.state.search)
    }
  }

  handleSearch = (e,value) => {
     if (e.target.value !== null) {
      this.setState({ search: e.target.value })
      this.filter(this.state.mode,e.target.value)
     }
  }

  filter = (mode,search) => {
    const { list } = this.state
    let filteredList = []
    if (mode == 0) {
      filteredList = list
    } else if (mode == 1) {
      filteredList = list.filter(({ banned_at }) => banned_at == null) 
    } else {
      filteredList = list.filter(({ banned_at }) => banned_at != null)      
    }
    if(search != null ){
    filteredList = filteredList.filter(({username,firstname,id}) => (username.includes(search))||(firstname.includes(search))||(id == search))
    }
    this.setState({ filteredList })
  }
  componentDidMount() {
    this.fetchData();
  }
  render() {
    return (

      <Grid container direction="column" justify="center" style={{ width: "100%" }}>
        <MyHeader style={{ justifyContent: 'left' }}>
          > Member Info
        </MyHeader>
        <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', padding: '40px' }}>
          <Textfield
            variant="outlined"
            size="small"
            style={{
              width: "418px",
              marginBottom: 20,
            }}
            onChange={this.handleSearch}
            placeholder=" Search by ID, name, username"
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <SearchIcon color="primary" />
                </InputAdornment>
              ),
            }}
          />
          <ToggleButtonGroup exclusive value={this.state.mode} onChange={this.handleMode}>
            <MyToggleButton value={0} style={{ border: "1px solid #C78899", }}> All </MyToggleButton>
            <MyToggleButton value={1} style={{ border: "1px solid #C78899", }}> Active </MyToggleButton>
            <MyToggleButton value={2} style={{ border: "1px solid #C78899", }}> Banned </MyToggleButton>
          </ToggleButtonGroup>
          <EmptyBox data={this.state.filteredList} />
          {this.state.filteredList.map((member, index) =>
            <MemberInfoCard key={index} data={member} admin_name={this.props.user.username} fetchData={this.fetchData} />
          )}
        </div>
      </Grid>
    )
  }
}


export default MemberInfo;