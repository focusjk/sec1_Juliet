import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import { MyButton } from "./MyButton";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import { MyTitle } from "./MyTitle";

const TripBoxHis = ({ history, data }) => {
  //   const {
  //     id,
  //     departure_detail,
  //     departure_province,
  //     destination_detail,
  //     destination_province,
  //     start_datetime,
  //     capacity,
  //     request,
  //     status,
  //     price
  //   } = data;
  //   const date = moment(start_datetime).format("MMMM Do YYYY");
  //   const time = moment(start_datetime).format("h:mm a");
  return (
    <Paper
      square
      variant="outlined"
      style={{
        display: "flex",
        justifyContent: "space-between",
        flexDirection: "column",
        borderColor: "#BDBDBD"
      }}
    >
      <Paper
        square
        // key={id}
        elevation={0}
        style={{
          padding: 3,
          display: "flex",
          justifyContent: "space-between",
          backgroundColor: "#C78899"
        }}
      >
        <MyTitle
          style={{
            fontSize: "20px",
            color: "#FFFFFF",
            marginLeft: "6px"
          }}
        >
          Hi header
        </MyTitle>
      </Paper>

      <Paper
        square
        elevation={0}
        style={{
          padding: 12,
          display: "flex",
          justifyContent: "space-between",
          flexDirection: "column"
        }}
      >
        <MyTitle
          style={{
            color: "#C78899",
            marginBottom: "8px"
          }}
        >
          Status:
        </MyTitle>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between"
          }}
        >
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column"
            }}
          >
            <div>Driver:</div>
            <div>License plate:</div>
            <div>Pick up:</div>
            <div>Destination:</div>
          </div>
          <div
            style={{
              display: "flex",
              justifyContent: "flex-start",
              flexDirection: "column"
            }}
          >
            <div
              style={{
                fontSize: 20,
                display: "flex",
                justifyContent: "flex-end"
              }}
            >
              price ฿
            </div>
            <Link
              style={{
                color: "#C78899",
                textDecoration: "underline",
                fontSize: 14,
                display: "flex",
                justifyContent: "flex-end"
              }}
              onClick={() => {
                history.push("/");
              }}
            >
              see request
            </Link>
            <Link
              style={{
                color: "#C78899",
                textDecoration: "underline",
                fontSize: 14,
                display: "flex",
                justifyContent: "flex-end"
              }}
              onClick={() => {
                history.push("/");
              }}
            >
              see trip member
            </Link>
          </div>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-around",
            marginTop: "12px"
          }}
        >
          <MyButton>Cancel</MyButton>
          <MyButton>Payment</MyButton>
          <MyButton>Review</MyButton>
        </div>
      </Paper>
    </Paper>
  );
};

export default withRouter(TripBoxHis);
