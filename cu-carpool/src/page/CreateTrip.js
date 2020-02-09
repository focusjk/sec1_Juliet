import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { makeStyles } from '@material-ui/core/styles';
import { MenuItem, TextField, Typography } from '@material-ui/core';
import { MyFullWidthButton } from '../component/MyButton';
// import { Map, GoogleApiWrapper } from 'google-maps-react';

const useStyles = makeStyles({
  subtopic: { marginTop: 24 },
});

const province = [
  { name: 'none', value: null },
  { name: 'Bangkok', value: 'Bangkok' },
  { name: 'Sukhothai', value: 'Sukhothai' },
];

const provinceMenuItem = () =>
  province.map(({ name, value }) => (
    <MenuItem key={name} value={value}>
      {name}
    </MenuItem>
  ));
const CreateTrip = user => {
  const [form, setForm] = useState({
    departure_latitude: null,
    departure_longtitude: null,
    departure_detail: null,
    departure_province: null,
    destination_latitude: null,
    destination_longtitude: null,
    destination_detail: null,
    destination_province: null,
    start_datetime: null,
    car_brand: null,
    plate_license: null,
    capacity: null,
  });
  const handleCreate = async () => {
    try {
      const { id } = user;
      const response = await axios.post('http://localhost:4000/trip/create', {
        ...form,
        owner: id,
      });
      console.log(response);
    } catch (e) {
      console.log(e.response);
    }
  };

  const classes = useStyles();
  return (
    <div>
      <Typography align="center" variant="h4">
        Create trip
      </Typography>
      <form className={classes.root} noValidate autoComplete="off">
        <Typography variant="h6" className={classes.subtopic}>
          Trip detail
        </Typography>
        <TextField fullWidth required margin="dense" label="License plate" />
        <TextField fullWidth required margin="dense" label="Car brand" />
        <div style={{ display: 'flex' }}>
          <TextField
            required
            type="number"
            margin="dense"
            label="Capacity"
            helperText="Excluding a driver"
          />
          <TextField
            required
            type="number"
            margin="dense"
            label="Price"
            helperText="baht per person"
            style={{ marginLeft: 8 }}
          />
        </div>
        <Typography variant="h6" className={classes.subtopic}>
          Pick up
        </Typography>
        <TextField select fullWidth required margin="dense" label="Province">
          {provinceMenuItem()}
        </TextField>
        <TextField fullWidth required margin="dense" label="Detail" />
        <div style={{ display: 'flex' }}>
          <TextField
            required
            type="date"
            label="Date"
            margin="dense"
            variant="standard"
            InputLabelProps={{ shrink: true }}
          />
          <TextField
            required
            label="Time"
            type="time"
            margin="dense"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            style={{ marginLeft: 8, flexGrow: 1 }}
          />
        </div>
        <Typography variant="h6" className={classes.subtopic}>
          Destination
        </Typography>
        <TextField select required fullWidth margin="dense" label="Province">
          {provinceMenuItem()}
        </TextField>
        <TextField required fullWidth required margin="dense" label="Detail" />
        <MyFullWidthButton style={{ margin: '36px 0' }} onClick={handleCreate}>
          Create
        </MyFullWidthButton>
      </form>
    </div>
  );
};
export default CreateTrip;
// export default GoogleApiWrapper({
//   apiKey: 'TOKEN HERE',
// })(CreateTrip);
