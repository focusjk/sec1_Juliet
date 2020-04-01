import React from "react";
import Divider from "@material-ui/core/Divider";
import moment from "moment"

const formatter = a => {
  let b = a
  b.sort((i, j) => {
    const ii = new moment('23 Mar 2555 ' + i.created_time, 'DD MMM YYYY h:mm a').format('x')
    const jj = new moment('23 Mar 2555 ' + j.created_time, 'DD MMM YYYY h:mm a').format('x')
    return jj - ii;
  });
  return b
}
const WithdrawalBox = ({ data }) => {
  return (
    <div>
      {formatter(data).map((x, index) => (
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
          <Divider style={{ margin: "8px 0" }} />
          <div style={{ display: "flex", justifyContent: "space-between" }}>
            <div>{x.bank_name}</div>
            <div>{x.account_number}</div>
          </div>
          <div>{x.account_name}</div>
          <div style={{ fontSize: 14, color: "#BDBDBD" }}>{x.created_time}</div>
        </div>
      ))}
    </div>
  );
};
export default WithdrawalBox;
