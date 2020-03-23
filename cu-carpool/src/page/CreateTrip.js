import React, { useState } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { MyFullWidthButton } from "../component/MyButton";
import { MyHeader, MyTitle } from "../component/MyTitle";
import { ProvinceMenuItem } from "../component/ProvinceMenuItem"
import Map from "../component/Map"

const CreateTrip = ({ history, user }) => {
  const [errorMessage, setErrorMessage] = useState('')
  const [form, setForm] = useState({
    departure_latitude: 13.769059,
    departure_longitude: 100.493117,
    departure_detail: null,
    departure_province: null,
    destination_latitude: 13.769059,
    destination_longitude: 100.493117,
    destination_detail: null,
    destination_province: null,
    date: null,
    time: null,
    car_brand: null,
    plate_license: null,
    capacity: null,
    price: null
  });
  const [error, setError] = useState({
    car_brand: false,
    plate_license: false,
    capacity: false,
    price: false,
    departure_detail: false,
    departure_province: false,
    destination_detail: false,
    destination_province: false,
    date: false,
    time: false
  })
  const validate = () => {
    setError({
      car_brand: !form.car_brand,
      plate_license: !form.plate_license,
      capacity: !form.capacity,
      price: !form.price,
      departure_detail: !form.departure_detail,
      departure_province: !form.departure_province,
      destination_detail: !form.destination_detail,
      destination_province: !form.destination_province,
      date: !form.date,
      time: !form.time
    })
    return form.car_brand &&
      form.plate_license &&
      form.capacity &&
      form.price &&
      form.departure_detail &&
      form.departure_province &&
      form.destination_latitude &&
      form.destination_longitude &&
      form.destination_detail &&
      form.destination_province &&
      form.date &&
      form.time
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
        const { success, message } = response.data;
        if (success) {
          history.push("/my-trip");
        } else {
          setErrorMessage(message)
        }
      } catch (e) {
        setErrorMessage("Invalid data, please check your input again")
      }
    } else {
      setErrorMessage("Please fill all inputs with valid data")
    }
  };

  return (
    <div>
      <MyHeader>Create trip</MyHeader>
      <form autoComplete="off">
        <MyTitle>Trip detail</MyTitle>
        <TextField
          fullWidth
          required
          label="License plate"
          value={form.plate_license}
          error={error.plate_license}
          onChange={e => {
            setForm({ ...form, plate_license: e.target.value });
            setErrorMessage('')
          }}
        />
        <TextField
          fullWidth
          required
          label="Car brand"
          value={form.car_brand}
          error={error.car_brand}
          onChange={e => {
            setForm({ ...form, car_brand: e.target.value });
            setErrorMessage('')
          }}
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
            onChange={e => {
              setForm({ ...form, capacity: e.target.value });
              setErrorMessage('')
            }}
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
            onChange={e => {
              setForm({ ...form, price: e.target.value });
              setErrorMessage('')
            }}

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
          onChange={e => {
            setForm({ ...form, departure_province: e.target.value });
            setErrorMessage('')
          }}
        >
          {ProvinceMenuItem()}
        </TextField>
        <TextField
          fullWidth
          required
          label="Detail"
          value={form.departure_detail}
          error={error.departure_detail}
          onChange={e => {
            setForm({ ...form, departure_detail: e.target.value });
            setErrorMessage('')
          }}
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
            onChange={e => {
              setForm({ ...form, date: e.target.value });
              setErrorMessage('')
            }}
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
            onChange={e => {
              setForm({ ...form, time: e.target.value });
              setErrorMessage('')
            }}
          />
        </div>
        <Map setLocation={(departure_longitude, departure_latitude) => setForm({ ...form, departure_longitude, departure_latitude })} />
        <MyTitle style={{ marginTop: "30px" }}>Destination</MyTitle>
        <TextField
          select
          required
          fullWidth
          label="Province"
          value={form.destination_province}
          error={error.destination_province}
          onChange={e => {
            setForm({ ...form, destination_province: e.target.value })
            setErrorMessage('')
          }}
        >
          {ProvinceMenuItem()}
        </TextField>
        <TextField
          fullWidth
          required
          label="Detail"
          value={form.destination_detail}
          error={error.destination_detail}
          onChange={e => {
            setForm({ ...form, destination_detail: e.target.value });
            setErrorMessage('')
          }}
        />
        <Map setLocation={(destination_longitude, destination_latitude) => setForm({ ...form, destination_longitude, destination_latitude })} />
        <MyFullWidthButton style={{ margin: "40px 0 10px 0" }} onClick={handleCreate}>
          Create
        </MyFullWidthButton>
        {errorMessage !== "" && (
          <div style={{ color: "red" }}>{errorMessage}</div>
        )}
      </form>
    </div>
  );
};
export default withRouter(CreateTrip);
