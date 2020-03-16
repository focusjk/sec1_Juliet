import React, { useState, useEffect } from "react";
import axios from "axios";
import { MyButton } from "../component/MyButton";


const MemberInfoCard = ({ data }) => {
  const {
    username,
    firstname,
    lastname,
    phone_number,
    photo,
    email
  } = data;
  return (
    <div style={{ display: 'flex', alignItems: 'center', border: "1px solid #C4C4C4", padding: '16px 48px', margin: '16px 0' }}>
      <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', flexWrap: 'wrap', width: '150px', marginRight: '16px' }}>
        <img
          src={photo}
          height={100}
          width={100}
          style={{ borderRadius: "100%", marginBottom: "16px" }}
        />
        <div>{username}</div>
      </div>
      <div style={{ width: 300, display: 'flex', flexDirection: 'column' }}>
        <div> <b> Member ID:</b> 0</div>
        <div> <b>Name:</b> {firstname} {lastname}</div>
        <div> <b>Email:</b> {email}</div>
        <div> <b>Phone number:</b> {phone_number}</div>
        <div> <b>BannedAt:</b> dd/mm/yyy</div>
        <div> <b>BannedBy:</b> Admin Z</div>
      </div>
      <MyButton>Ban</MyButton>
    </div>
  );
};

export default MemberInfoCard;
