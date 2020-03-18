import React from "react";
import { withRouter } from "react-router-dom";
import { MyHeader } from "../component/MyTitle";
import { MyLink } from "../component/MyTitle";
import { MyFullWidthButton } from "../component/MyButton";

const Wallet = ({ history, user }) => {
  return (
    <div
      style={{
        display: "flex",
        flexDirection: "column",
        justifyContent: "space-between",
        height: "80vh"
      }}
    >
      <MyHeader>My Wallet</MyHeader>
      <div
        style={{
          display: "flex",
          flexDirection: "column",
          alignSelf: "center",
          justifyContent: "space-around",
          borderRadius: "100%",
          border: "1px solid #BDBDBD",
          height: "165px",
          width: "165px"
        }}
        onClick={() => history.push("/")} // TODO link to transaction history page
      >
        <div
          style={{
            color: "#BDBDBD",
            fontSize: 16,
            display: "flex",
            justifyContent: "center",
            marginTop: "32px"
          }}
        >
          Balance
        </div>
        <div
          style={{
            color: "#C78899",
            fontSize: 50,
            display: "flex",
            justifyContent: "center"
          }}
        >
          {user.amount}
        </div>
        <div
          style={{
            color: "#BDBDBD",
            fontSize: 20,
            display: "flex",
            justifyContent: "center",
            marginBottom: "32px"
          }}
        >
          THB
        </div>
      </div>
      <div>
        <MyFullWidthButton
          style={{ marginBottom: "16px" }}
          onClick={() => history.push("/")} // TODO link to withdrawal request form page
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
    </div>
  );
};

export default withRouter(Wallet);
