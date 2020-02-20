import React from "react";
import { MyButton } from "../component/MyButton";
import { MyHeader, MyTitle } from "../component/MyTitle";
import Box from "@material-ui/core/Box";
import Typography from "@material-ui/core/Typography";
import Container from "@material-ui/core/Container";

class MyTrip extends React.Component {
  render() {
    return (
      <div>
        <MyHeader> My Trip </MyHeader>
        <div>
          <Typography
            style={{
              backgroundColor: "#C78899",
              height: "4.5vh"
            }}
          >
            <MyTitle
              style={{ fontSize: "20px", color: "#FFFFFF", marginLeft: "6px" }}
            >
              Hi
            </MyTitle>
          </Typography>
        </div>
        {/* <MyButton disabled={request === capacity}>MyButton</MyButton> */}
      </div>
    );
  }
}

export default MyTrip;
