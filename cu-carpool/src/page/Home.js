import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import {
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
  Link,
} from "@material-ui/core";
import ExpandMoreIcon from "@material-ui/icons/ExpandMore";
import TripCard from "../component/TripCard";
import CalendarTodayIcon from "@material-ui/icons/CalendarToday";
import LocationOnIcon from "@material-ui/icons/LocationOn";
import FlagIcon from "@material-ui/icons/Flag";
import { ProvinceMenuItem } from "../component/ProvinceMenuItem";
import EmptyBox from "../component/EmptyBox";
import backend from "../ip";
const useStyles = makeStyles({
  box: {
    display: "flex",
    width: "100%",
    flexWrap: "wrap",
    flexDirection: "column",
  },
  panel: { backgroundColor: "#EFEFEF", boxShadow: "none" },
});

const Home = ({ user }) => {
  const [tripList, setTripList] = useState([]);
  const [departure, setDeparture] = useState("");
  const [destination, setDestination] = useState("");
  const [selectedDate, setSelectedDate] = useState("");
  const fetchData = async () => {
    try {
      const response = await axios.post(backend + "/trip", {
        departure,
        destination,
        selectedDate,
      });
      const { trip } = response.data;
      setTripList(trip);
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    fetchData();
  }, [departure, destination, selectedDate]);

  const classes = useStyles();
  return (
    <div>
      <ExpansionPanel className={classes.panel}>
        <ExpansionPanelSummary expandIcon={<ExpandMoreIcon />}>
          <Typography variant="h6">Search</Typography>
        </ExpansionPanelSummary>
        <ExpansionPanelDetails>
          <div className={classes.box}>
            <TextField
              id="departure"
              select
              value={departure}
              onChange={(e) => setDeparture(e.target.value)}
              InputProps={{
                startAdornment: <LocationOnIcon style={{ marginRight: 16 }} />,
              }}
              style={{ marginBottom: 16 }}
            >
              {ProvinceMenuItem()}
            </TextField>

            <TextField
              select
              value={destination}
              onChange={(e) => setDestination(e.target.value)}
              InputProps={{
                startAdornment: <FlagIcon style={{ marginRight: 16 }} />,
              }}
              style={{ marginBottom: 16 }}
            >
              {ProvinceMenuItem()}
            </TextField>

            <TextField
              type="date"
              required
              variant="standard"
              InputLabelProps={{ shrink: true }}
              InputProps={{
                startAdornment: (
                  <CalendarTodayIcon style={{ marginRight: 16 }} />
                ),
              }}
              value={selectedDate}
              onChange={(e) => setSelectedDate(e.target.value)}
              style={{ marginBottom: 16 }}
            />
            <Link
              onClick={() => {
                setSelectedDate("");
                setDeparture("");
                setDestination("");
              }}
            >
              reset
            </Link>
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      <EmptyBox data={tripList} />
      {tripList.map((trip, index) => (
        <TripCard key={index} data={trip} user={user} />
      ))}
    </div>
  );
};

export default Home;
