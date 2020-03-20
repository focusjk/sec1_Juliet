import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import CloseIcon from '@material-ui/icons/Close';
import { MyHeader } from "../component/MyTitle";
import { MyButton } from "../component/MyButton"
import Link from "@material-ui/core/Link";
import axios from "axios";
import ReviewBox from "../component/ReviewBox";
import EmptyBox from "../component/EmptyBox";

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

const ReviewModal = ({ modeButton,isTrip,id }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const [state, setState] = React.useState({ list: [] });

  const handleOpen = () => {
    setOpen(true);
    fetchData();
  };

  const handleClose = () => {
    setOpen(false);
  };

  const fetchData = async () => {
    let response
    if(isTrip){
       response = await axios.get("http://localhost:4000/review/trip?trip_id="+id);
    }
    else{
      response = await axios.get("http://localhost:4000/review/getAllReviewOfDriver?driver_id="+id);
      }
    const { success, review } = response.data
    if(success){
      setState({ list: review })
    }
  };

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
        open={open}
        onClose={handleClose}
        style={{ display: 'flex', justifyContent: 'center', alignItems: 'center' }}
      >
        <div className={classes.paper}>
          <ReviewHeaderWithClose />
          <EmptyBox data={state.list} />
          {state.list.map((review, index) => (
                <ReviewBox key={index} data={review}/>
            ))}
        </div>
      </Modal>
    </div>
  );
}
export default ReviewModal