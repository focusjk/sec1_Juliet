import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MenuItem, TextField, Typography } from "@material-ui/core";
import { MyFullWidthButton } from "../component/MyButton";
// import { Map, GoogleApiWrapper } from 'google-maps-react';
import province from "../province";
import { MyHeader, MyTitle } from "../component/MyTitle";

const provinceMenuItem = () =>
  province.map(({ name, value }) => (
    <MenuItem key={name} value={value}>
      {name}
    </MenuItem>
  ));
const CreateTrip = ({ history, user }) => {
  const [form, setForm] = useState({
    departure_latitude: 111,
    departure_longtitude: 111,
    departure_detail: null,
    departure_province: null,
    destination_latitude: 111,
    destination_longtitude: 111,
    destination_detail: null,
    destination_province: null,
    date: null,
    time: null,
    car_brand: null,
    plate_license: null,
    capacity: null
  });
  const [error, setError] = useState({
    departure_latitude: false,
    departure_longtitude: false,
    departure_detail: false,
    departure_province: false,
    destination_latitude: false,
    destination_longtitude: false,
    destination_detail: false,
    destination_province: false,
    date: false,
    time: false,
    car_brand: false,
    plate_license: false,
    capacity: false
  });

  const validate = () => {
    setError({
      car_brand: !form.car_brand,
      plate_license: !form.plate_license,
      capacity: !(form.capacity && form.capacity > 0 && form.capacity < 50),
      price: !(form.capacity && form.capacity > 0),
      departure_detail: !form.departure_detail,
      departure_province: !form.departure_province,
      destination_latitude: !form.destination_latitude,
      destination_longtitude: !form.destination_longtitude,
      destination_detail: !form.destination_detail,
      destination_province: !form.destination_province,
      date: !form.date,
      time: !form.time
    });
    return !(
      error.car_brand ||
      error.plate_license ||
      error.capacity ||
      error.price ||
      error.departure_detail ||
      error.departure_latitude ||
      error.departure_longtitude ||
      error.departure_province ||
      error.destination_detail ||
      error.destination_latitude ||
      error.destination_longtitude ||
      error.destination_province ||
      error.date ||
      error.time
    );
  };
  const handleCreate = async () => {
    if (validate()) {
      try {
        const { id } = user;
        const { time, date, ...data } = form;
        const response = await axios.post("http://localhost:4000/trip/create", {
          ...data,
          owner: id,
          start_datetime: date + " " + time + ":00"
        });
        console.log(response);
        const { success } = response.data;
        if (success) {
          history.push("/my-trip");
        } else {
          //   {
          //     "success": false,
          //     "error": "Column 'price' cannot be null",
          //     "message": "CANNOT CREATE TRIP!!!"
          // }
          console.log("ERROR");
        }
      } catch (e) {
        console.log(e.response);
      }
    }
  };

  return (
    <div>
      <MyHeader>Create trip</MyHeader>
      <form noValidate autoComplete="off">
        <MyTitle>Trip detail</MyTitle>
        <TextField
          fullWidth
          required
          label="License plate"
          value={form.plate_license}
          error={error.plate_license}
          onChange={e => setForm({ ...form, plate_license: e.target.value })}
        />
        <TextField
          fullWidth
          required
          label="Car brand"
          value={form.car_brand}
          error={error.car_brand}
          onChange={e => setForm({ ...form, car_brand: e.target.value })}
        />
        <div style={{ display: "flex" }}>
          <TextField
            required
            min={0}
            max={50}
            type="number"
            label="Capacity"
            helperText="Excluding a driver"
            value={form.capacity}
            error={error.capacity}
            onChange={e => setForm({ ...form, capacity: e.target.value })}
          />
          <TextField
            required
            min={1}
            type="number"
            label="Price"
            helperText="baht per person"
            style={{ marginLeft: 8 }}
            value={form.price}
            error={error.price}
            onChange={e => setForm({ ...form, price: e.target.value })}
          />
        </div>
        <MyTitle style={{ marginTop: "30px" }}>Pick Up</MyTitle>
        <TextField
          select
          fullWidth
          required
          label="Province"
          value={form.departure_province}
          error={error.departure_province}
          onChange={e =>
            setForm({ ...form, departure_province: e.target.value })
          }
        >
          {provinceMenuItem()}
        </TextField>
        <TextField
          fullWidth
          required
          label="Detail"
          value={form.departure_detail}
          error={error.departure_detail}
          onChange={e => setForm({ ...form, departure_detail: e.target.value })}
        />
        <div style={{ display: "flex" }}>
          <TextField
            required
            type="date"
            label="Date"
            variant="standard"
            InputLabelProps={{ shrink: true }}
            value={form.date}
            error={error.date}
            onChange={e => setForm({ ...form, date: e.target.value })}
          />
          <TextField
            required
            label="Time"
            type="time"
            InputLabelProps={{ shrink: true }}
            inputProps={{ step: 300 }}
            style={{ marginLeft: 8, flexGrow: 1 }}
            value={form.time}
            error={error.time}
            onChange={e => setForm({ ...form, time: e.target.value })}
          />
        </div>
        <MyTitle style={{ marginTop: "30px" }}>Destination</MyTitle>
        <TextField
          select
          required
          fullWidth
          label="Province"
          value={form.destination_province}
          error={error.destination_province}
          onChange={e =>
            setForm({ ...form, destination_province: e.target.value })
          }
        >
          {provinceMenuItem()}
        </TextField>
        <TextField
          fullWidth
          required
          label="Detail"
          value={form.destination_detail}
          error={error.destination_detail}
          onChange={e =>
            setForm({ ...form, destination_detail: e.target.value })
          }
        />
        <MyFullWidthButton style={{ margin: "42px 0" }} onClick={handleCreate}>
          Create
        </MyFullWidthButton>
      </form>
    </div>
  );
};
export default withRouter(CreateTrip);
// export default GoogleApiWrapper({
//   apiKey: 'TOKEN HERE',
// })(CreateTrip);
