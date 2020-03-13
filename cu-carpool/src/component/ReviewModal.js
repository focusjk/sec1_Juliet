import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { useHistory } from 'react-router-dom';
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Button from "@material-ui/core/Button";
import { TextField } from "@material-ui/core";
import { MyHeader } from "../component/MyTitle";
import { MyButton, MyGreyButton } from "../component/MyButton";
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

const ReviewModal = ({ trip_id, member_id, history }) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [err, setErr] = React.useState(null);
  //const [joined,setJoined] = React.useState(false);
  const [form, setForm] = useState({
    comment: "",  
    rating: 0.00  
  });

  const handleOpen = () => {
    setOpen(true);
  };

// Click 'Cancel' button
  const handleClose = () => {
    setOpen(false);
  };
  //TO-DO check duplicate request
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
    //   const response = await axios.post("http://localhost:4000/request", { trip_id, member_id, ...data });
    //   const { success, message } = response.data;
    //   console.log(response.data)
    //   if (success) {
    //     setOpen(false);
    //     console.log('ficus')
    //     const path = '/trip-history';
    //     history.push(path);
    //   } else {
    //     setErr(message)
    //   }
    } catch (e) {
      setErr('Cannot access database')
      console.log(e);
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
          <div style={{marginBottom: "1px", marginLeft:"auto", marginRight:"auto"}}>
            <Rating name="sizeLarge" 
              defaultValue={form.rating} 
              precision={0.01} 
              size="large"
              /*emptyIcon={<StarBorderIcon fontSize="inherit"/>}*/ 
              onChange={(event, newValue) => {
                setForm({...form, rating:newValue});
              }}
            />
          </div>
          <TextField
            label="Comment"
            className={classes.margin}
            // value="Hello"
            value={form.comment}
            multiline
            // InputProps={{
            //     readOnly: true,
            //   }}
            onChange={e => {
              setForm({...form, comment: e.target.value });
              setErr(null)
            }}
          />
          {err !== "" && <div style={{ color: "red", marginTop: '16px' }}>{err}</div>}
          <div style={{ marginTop: "0px", display: 'flex' }}>
            <Button onClick={review} color="secondary" style={{ fontSize: 16, flexGrow: 1 }}>OK</Button>
            <Button onClick={handleClose} style={{ color: "#BDBDBD", fontSize: 16, flexGrow: 1 }}>Cancel</Button>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default withRouter(ReviewModal)