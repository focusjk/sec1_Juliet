import React from "react";
import { MyHeader, MyTitle } from "../component/MyTitle";
import { Link, Divider, Paper, Typography } from "@material-ui/core/";
import TripBox from "../component/TripBox";

class MyTrip extends React.Component {
  render() {
    return (
      <div>
        <MyHeader style={{ marginBottom: "30px" }}>My trip</MyHeader>
        <div>
          <Paper
            square
            variant="outlined"
            style={{
              display: "flex",
              justifyContent: "space-between",
              flexDirection: "column",
              borderInlineColor: "#BDBDBD"
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
                  marginLeft: "8px"
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
                justifyContent: "space-between"
              }}
            >
              <MyTitle
                style={{
                  color: "#C78899"
                }}
              >
                Status:
              </MyTitle>
            </Paper>
          </Paper>
        </div>
        {/* <TripBox /> */}
      </div>
    );
  }
}

export default MyTrip;
