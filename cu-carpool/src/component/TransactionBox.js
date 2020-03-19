import React from "react";

const TransactionBox = ({ data }) => {
    const {
        created_time,
        transaction_id,
        amount,
        withdrawal_id,
        type,
        note
    }=data;
    return (
            <div style={{ display: "flex",border: '1px solid #BDBDBD',padding: "8px 16px",flexDirection:"row",justifyContent:"space-between",alignItems:"center"}}>
                    <div style={{ display: "flex",flexDirection:"column"}}>
                        <div style={{fontSize:16}}>
                            {type}
                        </div>
                        <div style={{fontSize:14,color:'#BDBDBD'}}>
                            {created_time}
                        </div>
                    </div>
                    <div style={{fontSize:20}}>
                        {amount} ฿
                    </div>
            </div>   
    );   
};
export default TransactionBox;