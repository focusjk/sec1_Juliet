import React from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { Paper } from "@material-ui/core/";
import { MyHeader,MyTitle } from "../component/MyTitle";
import moment from "moment";
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import { makeStyles,withStyles } from "@material-ui/core/styles";
import EmptyBox from '../component/EmptyBox';
import ExpansionPanel from '@material-ui/core/ExpansionPanel';
import ExpansionPanelDetails from '@material-ui/core/ExpansionPanelDetails';
import ExpansionPanelSummary from '@material-ui/core/ExpansionPanelSummary';
import TripMember from "../component/TripMember";
import LocationDetailModal from "./LocationDetailModal";
import Divider from '@material-ui/core/Divider';

const TripLogBox = ({ history, data }) => {
  const {
    trip_id,driver_id,start_datetime,status,car_brand,plate_license,price,created_at,
    departure_latitude,departure_longtitude,departure_detail,
    destination_latitude,destination_longtitude,destination_detail,
    username,firstname,lastname,photo
  } = data;
  const starttime = moment(start_datetime).format("MMMM Do YYYY h:mm a");
  const createtime = moment(created_at).format("MMMM Do YYYY h:mm a");

  const [state, setState] = React.useState({ list: [] });
  
  const fetchData = async () => {
    const response = await axios.get("http://localhost:4000/admin/tripMember?id="+trip_id);
    const { success, members } = response.data
    if (success) {
      setState({ list: members })
    }
  }

  const useStyles = makeStyles(theme => ({
    paper: {
      display: 'flex',
      justifyContent: "space-between"
    },
    title:{
      fontSize: "20px",
      color: "#FFFFFF",
      marginLeft: "6px",
      marginRight:"6px"
    },
    div:{
      display: 'flex', 
      flexDirection: 'column'
    },
    root: {
      '&:before': {
        display: 'none'
      },
    },  
    summary:{
      borderTop: '1px solid #BDBDBD',
    },
    details: {
      padding: theme.spacing(0,0)
    },
    divider: {
      backgroundColor: '#BDBDBD'
    },
    expanded: {},    
  })); 

  const classes = useStyles();

  const [expanded, setExpanded] = React.useState(false);
    
  const handleClick = async () => {
    if(expanded){
      setExpanded(false)
    }
    else{
      setExpanded(true);
      fetchData();
    }
  }

  return (
    <Paper square variant="outlined" className={classes.paper}
      style={{flexDirection: "column",borderColor: "#BDBDBD",marginBottom: "16px",width:700}}>
        <Paper square elevation={0} className={classes.paper} style={{padding: 3,backgroundColor: "#C78899"}}>
            <MyTitle className={classes.title}>{status}</MyTitle>
            <MyTitle className={classes.title}>{starttime}</MyTitle>
        </Paper>
        <Paper square elevation={0} className={classes.paper} style={{padding: 12,flexDirection: "row"}}>
            <div className={classes.div} style={{ alignItems: 'center', width: '150px', marginRight: '16px' }}>
                <img src={photo} height={100} width={100} 
                     style={{ alignItems: "center", borderRadius: "100%", marginBottom: "16px" }}/>
                <div style={{ alignSelf: "center"}}>{username}</div>
            </div>
            <div className={classes.div} style={{ flexGrow: 1, justifyContent: 'space-between' }}>
                <div> Trip ID: {trip_id}</div>
                <div> Driver's Name: {firstname} {lastname}</div>
                <div> License Plate: {plate_license}</div>
                <div> Car Brand: {car_brand}</div>
                <div> Price: {price} ฿</div>
                <div> Trip Created At: {createtime}</div>
            </div>
            <LocationDetailModal data={{departure_detail,departure_longtitude,departure_latitude, 
                                 destination_detail,destination_longtitude,destination_latitude}}/>
        </Paper>
        <ExpansionPanel square onClick={handleClick} className={classes.root}> 
          <ExpansionPanelSummary className={classes.summary}
            expandIcon={<ExpandMoreIcon fontSize="large" style={{color:"grey"}}/>}>
          </ExpansionPanelSummary>
          <ExpansionPanelDetails className={classes.details}>
            <div className={classes.div}>
              <EmptyBox data={state.list} />
                {state.list.map((members, index) => (
                  <div>
                    <Divider classes={{root: classes.divider}}/>
                    <TripMember key={index} data={members} />
                  </div>
                ))}
            </div>
          </ExpansionPanelDetails>
        </ExpansionPanel>    
    </Paper>
  );
};

export default withRouter(TripLogBox);