import React, { useState, useEffect } from "react";
import axios from "axios";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { MyHeader } from "./MyTitle";
import { MyButton } from "./MyButton";
import Rating from "@material-ui/lab/Rating";
import StarBorderIcon from '@material-ui/icons/StarBorder';

function getModalStyle() {
  const top = 50;
  const left = 50;

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}


const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    display: 'flex',
    flexDirection: 'column',
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 2),
    width: '300px'
  },
  margin: {
    marginBottom: 16
  }
}));

const CreateReviewModal = ({request_id, review_id, passenger_id, driver_id}) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(null);
  const [form, setForm] = useState({
    comment: "",
    rating: 0.00
  });


  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };


  const reviewed = false; //have already review? <check from database> TODO

  //TO-DO check if reviewed =>get review =>if null => mean not review yet
  /*const fetchData = async () => {
    try {
      const response = await axios.get("http://localhost:4000/trip/passenger", { params: { trip_id } });
      const { success, passenger } = response.data;
      if (success) {
         setJoined(passenger.filter(i => i.id == member_id)[0]!=null);
      }
    } catch (e) {
      console.log(e);
    }
  };
   useEffect(() => {
    fetchData();
  }, []);
  */


  //   TODO: create review => waiting for backend
  //Click 'OK' button
  const review = async () => {
    try {
      const { ...data } = form;
      const response = await axios.post("http://locahost:4000/review/create", {passenger_id, driver_id, request_id, data});
      console.log(response);
      const { success, message } = response.data;
      if (success) {
        setOpen(false);
        console.log('review success');
      } else {
        setErr(message);
      }
    } catch (e) {
      setErr('Cannot access database')
    }
  };

  return (
    <div>
      <MyButton type="button" onClick={handleOpen}>
        Review
       </MyButton>
      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={getModalStyle()} className={classes.paper}>
          <MyHeader>Review</MyHeader>
          <div style={{ margin: "0 auto" }}>
            <Rating name="sizeLarge"
              defaultValue={form.rating}
              precision={1}
              size="large"
              emptyIcon={<StarBorderIcon fontSize="inherit" />}
              onChange={(event, newValue) => {
                setForm({ ...form, rating: newValue });
              }}
            />
          </div>
          <TextField
            label="Comment"
            className={classes.margin}
            value={form.comment}
            multiline
            InputProps={{
              readOnly: review_id != null,
            }}
            onChange={e => {
              setForm({ ...form, comment: e.target.value });
              setErr(null)
            }}
          />
          {err !== "" && <div style={{ color: "red", marginTop: '16px' }}>{err}</div>}
          <div style={{ marginTop: "0px", display: 'flex' }}>
            {review_id ? (<Button onClick={handleClose} color="secondary" style={{ fontSize: 16, flexGrow: 1 }}>OK</Button>) :
              <React.Fragment>
                <Button onClick={review} color="secondary" style={{ fontSize: 16, flexGrow: 1 }}>OK</Button>
                <Button onClick={handleClose} style={{ color: "#BDBDBD", fontSize: 16, flexGrow: 1 }}>Cancel</Button>
              </React.Fragment>
            }
          </div>
        </div>
      </Modal>
    </div>
  );
}

export default CreateReviewModal

