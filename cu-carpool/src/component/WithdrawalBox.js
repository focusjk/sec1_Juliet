import React from "react";
import Divider from "@material-ui/core/Divider";

const WithdrawalBox = ({ data }) => {
  return (
    <div>
      {data.map((x, index) => (
        <div
          key={index}
          style={{
            border: "1px solid #BDBDBD",
            padding: "8px 16px",
            flexDirection: "column",
            marginBottom: "10px",
            fontSize: 16
          }}
        >
          <div
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between"
            }}
          >
            <div>Status: {x.status}</div>
            <div style={{ fontSize: 20 }}>{x.amount} ฿</div>
          </div>
          <Divider style={{ margin: "3px 0 8px" }} />
          <div style={{ display: "flex", justifyContent: "flex-start" }}>
            <div
              style={{
                marginBottom: "1px",
                display: "flex",
                flexGrow: 1
              }}
            >
              {x.bank_name}
            </div>
            <div
              style={{
                marginBottom: "1px",
                display: "flex",
                flexGrow: 4
              }}
            >
              {x.account_number}
            </div>
          </div>
          <div style={{ marginBottom: "1px" }}>{x.account_name}</div>
          <div style={{ fontSize: 14, color: "#BDBDBD" }}>{x.created_time}</div>
        </div>
      ))}
    </div>
  );
};
export default WithdrawalBox;
