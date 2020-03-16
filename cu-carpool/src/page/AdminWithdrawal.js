import React from 'react';
import Grid from '@material-ui/core/Grid';
import axios from 'axios';
import moment from 'moment';
import { MyButton, MyWhiteButton } from '../component/MyButton';
import { MyHeader } from '../component/MyTitle'
import EmptyBox from '../component/EmptyBox';

const formatter = date => moment(date).format('MMMM Do YYYY, h:mm a');
class AdminWithdrawal extends React.Component {
    state = { list: [] }
    componentDidMount() {
        this.fetchData()
    }
    fetchData = async () => {
        // const response = await axios.get("http://localhost:4000/admin/driver");
        // const { success, driver } = response.data
        // if (success) {
        //     this.setState({ list: driver })
        // }
        this.setState({
            list: [
                {
                    id: 1,
                    member_id: 1,
                    amount: 100,
                    created_at: "2020-03-09T03:00:00.000Z",
                    approved_at: null,
                    approved_by: null,
                    rejected_at: null,
                    rejected_by: null,
                    status: "pending",
                    account_name: "jiraphat klll",
                    account_number: "1234567890",
                    bank_name: "kbank",
                    username: "focustsu",
                    image: "",
                    balance: 100,
                    firstname: "jiraphat",
                    lastname: "khuapnit"
                }, {
                    id: 1,
                    member_id: 1,
                    amount: 100,
                    created_at: "2020-03-09T03:00:00.000Z",
                    approved_at: 'admineiei',
                    approved_by: "2020-03-09T03:00:00.000Z",
                    rejected_at: null,
                    rejected_by: null,
                    status: "approving",
                    account_name: "jiraphat klll",
                    account_number: "1234567890",
                    bank_name: "kbank",
                    username: "focustsu",
                    image: "",
                    balance: 100,
                    firstname: "jiraphat",
                    lastname: "khuapnit"
                }, {
                    id: 1,
                    member_id: 1,
                    amount: 100,
                    created_at: "2020-03-09T03:00:00.000Z",
                    approved_at: null,
                    approved_by: null,
                    rejected_at: null,
                    rejected_by: null,
                    status: "pending",
                    account_name: "jiraphat klll",
                    account_number: "1234567890",
                    bank_name: "kbank",
                    username: "focustsu",
                    image: "",
                    balance: 20,
                    firstname: "jiraphat",
                    lastname: "khuapnit"
                },
            ]
        })
    }
    handleApprove = async id => {
        const { username } = this.props.user;
        console.log({ id, admin_name: username })
        // const response = await axios.post("http://localhost:4000/admin/driver-approve", { id, admin_name: username });
        // const { success } = response.data
        // if (success) {
        //     this.fetchData()
        // }
    }

    handleReject = async id => {
        const { username } = this.props.user;
        console.log({ id, admin_name: username })
        // const response = await axios.post("http://localhost:4000/admin/driver-reject", { id, admin_name: username });
        // const { success } = response.data
        // if (success) {
        //     this.fetchData()
        // }
    }
    render() {
        return (
            <Grid container direction="column" justify="center" style={{ width: "100%" }}>
                <MyHeader style={{ justifyContent: 'left' }}>
                    > Withdrawal request log
                </MyHeader>
                <div style={{ margin: "32px 0", alignSelf: 'center' }}>
                    <EmptyBox data={this.state.list} />
                    {this.state.list.map((
                        {
                            id,
                            member_id,
                            amount,
                            created_at,
                            account_name,
                            account_number,
                            bank_name,
                            username,
                            photo,
                            balance,
                            firstname,
                            lastname
                        }
                    ) =>
                        <div key={id} style={{ maxWidth: 740, display: 'flex', border: "1px solid #C4C4C4", padding: '24px 48px', marginBottom: '16px' }}>
                            <div style={{ display: 'flex', flexDirection: 'column', alignItems: 'center', width: '150px', marginRight: '16px' }}>
                                <img
                                    src={photo}
                                    height={100}
                                    width={100}
                                    style={{ alignItems: 'center', borderRadius: "100%", marginBottom: "16px" }}
                                />
                                <div style={{ alignSelf: 'center', marginBottom: "8px" }}>{username}</div>
                                <div style={{ color: "#C78899", border: "1px solid #C78899", padding: "2px 16px" }}>{balance} ฿</div>
                            </div>
                            <div style={{ flexGrow: 4, display: 'flex', flexDirection: 'column', justifyContent: 'space-between' }}>
                                <div> <b>Member ID:</b> {member_id}</div>
                                <div> <b>Name:</b> {firstname} {lastname}</div>
                                <div> <b>Bank account name:</b> {account_name}</div>
                                <div> <b>Bank account number:</b> {account_number}</div>
                                <div> <b>Bank name:</b> {bank_name}</div>
                                <div> <b>Amount:</b> {amount}</div>
                                <div> <b>Created at:</b> {formatter(created_at)}</div>
                            </div>
                            <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', marginLeft: '24px' }}>
                                <MyButton style={{ marginBottom: '16px' }} onClick={() => this.handleApprove(id)}>Approve</MyButton>
                                <MyWhiteButton onClick={() => this.handleReject(id)}>Reject</MyWhiteButton>
                            </div>
                        </div>
                    )}
                </div>
            </Grid>
        )
    }
}

export default AdminWithdrawal;