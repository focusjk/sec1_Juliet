import React from "react";
// import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeader } from "../component/MyTitle";
import { MyLink } from "../component/MyTitle";
import { MyFullWidthButton } from "../component/MyButton";

class Wallet extends React.Component {
  render() {
    return (
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          justifyContent: "space-between"
        }}
      >
        <MyHeader>Wallet</MyHeader>
        <div
          style={{
            display: "flex",
            justifyContent: "center",
            borderRadius: "100%",
            border: "1px solid",
            borderColor: "#BDBDBD"
          }}
        ></div>
        <MyFullWidthButton
          style={{ marginTop: "16px", marginBottom: "16px" }}
          onClick={() => this.props.history.push("/")} // TODO link to withdrawal request form page
        >
          Withdraw
        </MyFullWidthButton>
        <MyLink
          style={{
            display: "flex",
            justifyContent: "center"
          }}
          goto={"/"} // TODO link to withdrawal history page
        >
          See withdrawal history
        </MyLink>
      </div>
    );
  }
}

export default withRouter(Wallet);
