import React, { useState, useEffect } from "react";
import axios from "axios";
import { withRouter } from "react-router-dom";
import { MyHeader } from "../component/MyTitle";
import { MyLink } from "../component/MyTitle";
import { MyFullWidthButton } from "../component/MyButton";

const Wallet = ({ history, user, updateUser }) => {
  const [amount, setAmount] = useState(0);
  const getMoney = async () => {
    try {
      const response = await axios.get("http://localhost:4000/user/wallet", {
        params: { id: user.id }
      });
      const { success, amount } = response.data;
      if (success) {
        setAmount(amount);
        updateUser(amount)
      }
    } catch (e) {
      console.log(e);
    }
  };
  useEffect(() => {
    getMoney();
  }, []);

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
        onClick={() => history.push("/transactionLog")}
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
          {amount}
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
          onClick={() => history.push("/withdrawal")}
        >
          Withdraw
        </MyFullWidthButton>
        <MyLink
          style={{
            display: "flex",
            justifyContent: "center"
          }}
          goto={"/withdrawalLog"}
        >
          See withdrawal history
        </MyLink>
      </div>
    </div>
  );
};

export default withRouter(Wallet);
