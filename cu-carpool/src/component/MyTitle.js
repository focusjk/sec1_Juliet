import React from 'react';
import Typography from "@material-ui/core/Typography";
import { withStyles } from "@material-ui/core/styles";
import { withRouter } from "react-router-dom";
import ArrowBackIcon from '@material-ui/icons/ArrowBack';
const MyHeader = withStyles({
  // Header in center
  root: {
    fontFamily: "Roboto",
    fontSize: "24px",
    display: "flex",
    justifyContent: "center",
    marginBottom: "10px"
  }
})(Typography);

const MyTitle = withStyles({
  // Title (smaller than header)
  root: {
    fontFamily: "Roboto",
    fontSize: "18px",
    display: "flex",
    justifyContent: "flex-start"
    // marginBottom: "10px"
  }
})(Typography);

const MyHeaderWithArrow1 = ({ goto, children, history }) => {
  return (
    <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: "10px" }}>
      <ArrowBackIcon onClick={() => {
        history.push(goto);
      }} />
      <MyHeader style={{ marginBottom: 0 }}>
        {children}
      </MyHeader>
      <div />
    </div>)
}
const MyHeaderWithArrow = withRouter(MyHeaderWithArrow1)

export { MyHeader, MyTitle, MyHeaderWithArrow };
