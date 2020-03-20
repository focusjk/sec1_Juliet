import React from "react";
import { makeStyles } from "@material-ui/core/styles";
import Rating from '@material-ui/lab/Rating';
import moment from "moment";

const ReviewBox = ({ history, data }) => {
    const {
    username,
    rating,
    comment,
    created_at,
    photo
    }=data;
    
    return(
      <div style={{
        display: 'flex', flexDirection: 'column', border: "1px solid #C4C4C4", padding: '12px', marginBottom: "8px"
      }}>
        <div style={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', marginBottom: '16px' }}>
          <div style={{ display: 'flex' }}>
            <img
              src={photo}
              height={40}
              width={40}
              style={{ borderRadius: "100%", marginRight: '16px' }}
            />
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div> {username} </div>
              <Rating name="read-only" defaultValue={rating} readOnly />
            </div>
          </div>
          <div style={{ fontSize: 14, color: "#BDBDBD" }}>
          {moment(created_at).format("DD/MM/YYYY")}
          </div>
        </div>
        <div> {comment} </div>
      </div>
    );
  }

  export default ReviewBox;