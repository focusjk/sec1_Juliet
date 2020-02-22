import React from 'react'
import InboxIcon from '@material-ui/icons/Inbox';

const EmptyBox = ({ data }) => {
    if (!!data && data.length === 0) {
        return <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', margin: 48 }}>
            <InboxIcon color="disabled" style={{ fontSize: 48 }} />
            <div style={{ color: "#c4c4c4", fontSize: 24 }}>no data</div>
        </div>
    } else {
        return null
    }
}
export default EmptyBox