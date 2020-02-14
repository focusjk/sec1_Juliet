import React from 'react';
import { withRouter } from 'react-router-dom';
import { makeStyles } from '@material-ui/core/styles';
import { MyButton } from '../component/MyButton';
import LocationOnIcon from '@material-ui/icons/LocationOn';
import ScheduleIcon from '@material-ui/icons/Schedule';
import GroupIcon from '@material-ui/icons/Group';
import FlagIcon from '@material-ui/icons/Flag';
import moment from 'moment'
import {
  Link,
  Divider,
  Paper,
  Typography,
} from '@material-ui/core/';

const useStyles = makeStyles({
  list: {
    width: 250,
  },
  barSection: { flexGrow: 1 },
  barItem: { cursor: 'pointer' },
});

const TripCard = ({ history, data }) => {
  const classes = useStyles();
  const {
    id,
    departure_detail,
    departure_province,
    destination_detail,
    destination_province,
    start_datetime,
    capacity,
    request,
    status,
    price
  } = data;
  const date = moment(start_datetime).format('MMMM Do YYYY');
  const time = moment(start_datetime).format('h:mm a');
  return (
    <Paper
      square
      variant="outlined"
      key={id}
      style={{
        marginTop: '16px',
        padding: 8,
        display: 'flex',
        justifyContent: 'space-between',
      }}
    >
      <Typography style={{ display: 'flex', flexDirection: 'column' }}>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <LocationOnIcon fontSize="small" style={{ marginRight: '8px' }} />
          <Typography style={{ display: 'flex', alignItems: 'flex-end' }}>
            {departure_detail}
            <div style={{ fontSize: 14, color: '#BDBDBD', marginLeft: '8px' }}>
              ({departure_province})
            </div>
          </Typography>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <FlagIcon fontSize="small" style={{ marginRight: '8px' }} />
          <div style={{ display: 'flex', alignItems: 'flex-end' }}>
            {destination_detail}
            <div style={{ fontSize: 14, color: '#BDBDBD', marginLeft: '8px' }}>
              ({destination_province})
            </div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'flex-start' }}>
          <ScheduleIcon fontSize="small" style={{ marginRight: '8px' }} />
          <div>
            <div>{date}</div><div>{time}</div>
          </div>
        </div>
        <div style={{ display: 'flex', alignItems: 'center' }}>
          <GroupIcon fontSize="small" style={{ marginRight: '8px' }} />
          {request}/{capacity}
        </div>
        <Link
          href="#"
          style={{
            color: '#bdbdbd',
            textDecoration: 'underline',
            fontSize: 12,
          }}
        >
          More detail...
        </Link>
      </Typography>
      <Typography
        style={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'flex-end',
          justifyContent: 'space-between',
        }}
      >
        <div style={{ fontSize: '20px' }}>{price} ฿</div>
        <MyButton>Join</MyButton>
      </Typography>
    </Paper>
  );
};

export default withRouter(TripCard);
