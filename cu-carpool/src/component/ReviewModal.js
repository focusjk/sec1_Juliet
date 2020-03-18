import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Rating from '@material-ui/lab/Rating';
import CloseIcon from '@material-ui/icons/Close';
import { MyHeader } from "../component/MyTitle";
import { MyButton } from "../component/MyButton"
import Link from "@material-ui/core/Link";

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

const ReviewModal = ({ modeButton }) => {

  const classes = useStyles();
  const [open, setOpen] = React.useState(false);

  const handleOpen = () => {
    setOpen(true);
  };

  const handleClose = () => {
    setOpen(false);
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
          <div style={{
            display: 'flex', flexDirection: 'column', border: "1px solid #C4C4C4", padding: '12px', marginBottom: "8px"
          }}>
            <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
              <div style={{ display: 'flex' }}>
                <img
                  height={40}
                  width={40}
                  style={{ borderRadius: "100%", marginRight: '16px' }}
                />
                <div style={{ display: 'flex', flexDirection: 'column' }}>
                  <div> yinza55+ </div>
                  <Rating name="read-only" defaultValue={4} readOnly />
                </div>
              </div>
              <div style={{ fontSize: 14, color: "#BDBDBD" }}>
                22/03/2020
              </div>
            </div>
            <div> comment blah blah blah comment blah blah blah comment blah blah blah comment blah blah blah </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default ReviewModal