import React from "react";
import Divider from '@material-ui/core/Divider';

const WithdrawalBox = ({ data }) => {
    const {
        created_time,
        withdrawal_id,
        amount,
        status,
        account_number,
        account_name,
        bank_name
  } = data;
    return (
        <div>
            {data.map((x, index) => (
                 <div style={{ border: '1px solid #BDBDBD',padding: "20px 16px",flexDirection:"column",alignItems:"flex-start"}}>
                 <div style={{ display: "flex",flexDirection:"row",justifyContent:"space-between"}}>
                     <div style={{fontSize:16,marginTop:'6px',marginBottom:'6px'}}>
                         Status: {x.status}
                     </div>
                     <div style={{fontSize:20}}>
                        {x.amount} ฿
                     </div>
                 </div>
                 <Divider/>
                 <div style={{fontSize:16,marginTop:'6px'}}>
                     {x.bank_name}    {x.account_number}
                 </div>
                 <div style={{fontSize:16}}>
                     {x.account_name}
                 </div>
                 <div style={{fontSize:14,color:'#BDBDBD'}}>
                     {x.created_time}
                 </div>
             </div>
            ))}
        </div>   
    );   
};
export default WithdrawalBox;