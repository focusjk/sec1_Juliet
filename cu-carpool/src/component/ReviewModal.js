import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Modal from "@material-ui/core/Modal";
import Rating from '@material-ui/lab/Rating';
import Box from '@material-ui/core/Box';
import CloseIcon from '@material-ui/icons/Close';
import {MyHeader} from "../component/MyTitle";
import {MyButton} from "../component/MyButton"
import Link from "@material-ui/core/Link";

function rand() {
  return Math.round(Math.random() * 20) - 10;
}

function getModalStyle() {
  const top = 50 + rand();
  const left = 50 + rand();

  return {
    top: `${top}%`,
    left: `${left}%`,
    transform: `translate(-${top}%, -${left}%)`
  };
}

const useStyles = makeStyles(theme => ({
  paper: {
    position: "absolute",
    backgroundColor: theme.palette.background.paper,
    boxShadow: theme.shadows[5],
    padding: theme.spacing(2, 4, 3)
  }
}));

  const ReviewModal = ({modeButton}) => {
  // const [value, setValue] = React.useState(2);

  const classes = useStyles();
  // getModalStyle is not a pure function, we roll the style only on the first render
  const [modalStyle] = React.useState(getModalStyle);
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
      {(! modeButton) && (
            <Link onClick={handleOpen} style={{ color: "#C78899", textDecoration: "underline", fontSize: 14}}>
           See driver's review                
            </Link>   )}

      <Modal
        open={open}
        onClose={handleClose}
      >
        <div style={modalStyle} className={classes.paper}>
          <ReviewHeaderWithClose/>
          <div style={{ maxWidth: 306, display: 'flex', flexDirection: 'column', border: "1px solid #C4C4C4", padding: '12px 12px', marginBottom: '5px' }}>
          <div style={{ display: 'flex', flexDirection: 'row'}}>
            <div style={{ display: 'flex', flexDirection: 'row'}}>
              <div style={{ display: 'flex', flexDirection: 'column',/* alignItems: 'center',  flexWrap: 'wrap', /*width: '150px',*/ marginRight: '16px' }}>
                  {/* <img
                    src= "/Users/pimkunut/Downloads/S.png"
                    height={40}
                    width={40}
                    style={{ borderRadius: "100%"}}
                  /> */}
              </div>
              <div style = {{display: 'flex', flexDirection: 'column'}}>
              <div> yinza55+ </div>
                <Box mb={1.25} borderColor="transparent">
                  {/* <Rating name="read-only" value={value} readOnly /> */}
                  <Rating name="read-only" defaultValue={4} readOnly />
                </Box>
              </div>
            </div>
            <div style={{ marginTop: "15px", marginLeft: "50px", display: 'flex', fontSize: 14, color: "#BDBDBD", flexGrow: 1 }}> 22/03/2020 </div>
           </div> 
            <div> comment blah blah blah comment blah blah blah comment blah blah blah comment blah blah blah </div>
          </div>
        </div>
      </Modal>
    </div>
  );
}
export default ReviewModal