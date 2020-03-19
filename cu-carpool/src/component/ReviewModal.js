import React, {useState} from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Rating from '@material-ui/lab/Rating';
import CloseIcon from '@material-ui/icons/Close';
import { MyHeader } from "../component/MyTitle";
import { MyButton } from "../component/MyButton"
import Link from "@material-ui/core/Link";
import moment from "moment";
import axios from "axios";

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3),
    height: "350px",
    width: "300px",
    overflow: "scroll"
  }
}));

const ReviewModal = ({ modeButton, driver_id, trip_id }) => {
  
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [form, setForm] = useState({
    comment: "",
    rating: 0,
    username: "",
    photo: "",
    created_at: ""
  });
  
  const handleOpen = async () => {
    await handleModal();
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
  };

  const handleModal = async () => {
    try  {
      var response;
      if(modeButton == false){
      console.log("link")
      console.log(driver_id)
      response = await axios.get("http://localhost:4000/review/getAllReviewOfDriver", { params: { driver_id } });
      console.log(modeButton)
      }
      else{
        console.log("button")
        console.log(trip_id)
      response = await axios.get("http://localhost:4000/review/trip", { params: { trip_id } });
        console.log(modeButton)
      }
      const { success, review } = response.data;
      if (success) {
      const date = moment(review[0].created_at).format('DD/MM/YYYY');

        setForm({comment: review[0].comment,rating: review[0].rating,username: review[0].username,photo:review[0].photo,date:date});
        
        console.log('comment = ',form.comment)
        console.log('rating =' ,form.rating)
        console.log('username =' , form.username)
        console.log("created_at= " , form.date)
      } 
    } catch (e) {
      console.log(e);
    }
  }

  const ReviewHeaderWithClose = () => {
    return (
      <div
        style={{
          display: "flex",
          justifyContent: "space-between",
          alignItems: "center",
          marginBottom: "10px"
        }}
      >
        <CloseIcon onClick={handleClose} />
        <MyHeader style={{ marginBottom: 0 }}>Review</MyHeader>
        <CloseIcon style={{ visibility: "hidden" }} />
      </div>
    );
  };

  return (
    <div>
      {(modeButton) && (
        <MyButton type="button" onClick={handleOpen}> Review </MyButton>
      )}
      {(!modeButton) && (
        <Link onClick={handleOpen} style={{ color: "#C78899", textDecoration: "underline", fontSize: 14 }}>
          See driver's review
        </Link>)}

      <Modal
        // handleModal = {handleModal}
        open={open}
        onOpen={handleModal}
        onClose={handleClose}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className={classes.paper}>
          <ReviewHeaderWithClose />
          <div style={{
            display: 'flex', flexDirection: 'column', border: "1px solid #C4C4C4", padding: '12px', marginBottom: "8px"
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex' }}>
                <img
                  src={form.photo}
                  height={40}
                  width={40}
                  style={{ borderRadius: "100%", marginRight: '16px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div> {form.username} </div>
                  <Rating name="read-only" defaultValue={form.rating} readOnly />
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#BDBDBD" }}>
                  {form.date}
              </div>
            </div>
            <div> {form.comment} </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default ReviewModal