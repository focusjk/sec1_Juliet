import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import {
  MenuItem,
  TextField,
  Typography,
  ExpansionPanel,
  ExpansionPanelDetails,
  ExpansionPanelSummary,
} from '@material-ui/core';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import TripCard from '../component/TripCard';
import CalendarTodayIcon from '@material-ui/icons/CalendarToday';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import FlagIcon from '@material-ui/icons/Flag';

const useStyles = makeStyles({
  box: { display: 'flex', width: '100%', flexWrap: 'wrap', flexDirection: 'column' },
  panel: { backgroundColor: '#EFEFEF', boxShadow: 'none' },
});
const province = [
  { name: 'none', value: '' },
  { name: 'Bangkok', value: 'Bangkok' },
  { name: 'Sukhothai', value: 'Sukhothai' },
];

const provinceMenuItem = () =>
  province.map(({ name, value }) => (
    <MenuItem key={name} value={value}>
      {name}
    </MenuItem>
  ));
const Home = () => {
  const [tripList, setTripList] = React.useState([
    {
      id: 1,
      departure_detail: 'siam',
      departure_province: 'Bangkok',
      destination_detail: 'hospital',
      destination_province: 'Sukhothai',
      start_datetime: '1999-12-06 13:14:25',
      capacity: 4,
      request: 3,
      status: 'opening',
    },
  ]);
  const [departure, setDeparture] = React.useState('');
  const [destination, setDestination] = React.useState('');
  const [selectedDate, setSelectedDate] = React.useState(null);

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
              onChange={e => setDeparture(e.target.value)}
              InputProps={{
                startAdornment: <LocationOnIcon style={{ marginRight: 16 }} />,
              }}
              style={{ marginBottom: 16 }}
            >
              {provinceMenuItem()}
            </TextField>

            <TextField
              select
              value={destination}
              onChange={e => setDestination(e.target.value)}
              InputProps={{
                startAdornment: <FlagIcon style={{ marginRight: 16 }} />,
              }}
              style={{ marginBottom: 16 }}
            >
              {provinceMenuItem()}
            </TextField>

            <TextField
              type="date"
              variant="standard"
              InputLabelProps={{
                shrink: true,
              }}
              InputProps={{
                startAdornment: <CalendarTodayIcon style={{ marginRight: 16 }} />,
              }}
              value={selectedDate}
              onChange={e => setSelectedDate(e.target.value)}
              style={{ marginBottom: 16 }}
            />
          </div>
        </ExpansionPanelDetails>
      </ExpansionPanel>
      {tripList.map(trip => (
        <TripCard data={trip} />
      ))}
    </div>
  );
};

export default Home;
