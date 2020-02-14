import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { TextField } from "@material-ui/core";
import { MyFullWidthButton } from "../component/MyButton";
import { MyHeader, MyTitle } from "../component/MyTitle";
import { ProvinceMenuItem } from "../component/ProvinceMenuItem"

const CreateTrip = ({ history, user }) => {
  const [errorMessage, setErrorMessage] = useState('')
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
  const validate = () => {
    return form.car_brand && form.plate_license &&
      (form.capacity && form.capacity > 0 && form.capacity < 50) &&
      (form.capacity && form.capacity > 0) &&
      form.departure_detail &&
      form.departure_province &&
      form.destination_latitude &&
      form.destination_longtitude &&
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
        console.log(e.response);
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
            onChange={e => {
              setForm({ ...form, time: e.target.value });
              setErrorMessage('')
            }}
          />
        </div>
        <MyTitle style={{ marginTop: "30px" }}>Destination</MyTitle>
        <TextField
          select
          required
          fullWidth
          label="Province"
          value={form.destination_province}
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
          onChange={e => {
            setForm({ ...form, destination_detail: e.target.value });
            setErrorMessage('')
          }}
        />
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
