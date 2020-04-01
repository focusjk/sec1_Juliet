import React from "react";
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
const TransactionBox = ({ data }) => {
  return (
    <div>
      {formatter(data).map((x, index) => (
        <div
          key={index}
          style={{
            display: "flex",
            border: "1px solid #BDBDBD",
            padding: "8px 16px",
            justifyContent: "space-between",
            alignItems: "center",
            marginBottom: "10px"
          }}
        >
          <div style={{ display: "flex", flexDirection: "column" }}>
            <div style={{ fontSize: 16 }}>{x.type}</div>
            <div style={{ fontSize: 14, color: "#BDBDBD" }}>
              {x.created_time}
            </div>
          </div>
          <div style={{ fontSize: 20 }}>{x.amount} ฿</div>
        </div>
      ))}
    </div>
  );
};
export default TransactionBox;
