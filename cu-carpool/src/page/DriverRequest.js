import React from "react";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import moment from "moment";
import { MyHeader } from "../component/MyTitle";
import EmptyBox from "../component/EmptyBox";
import ConfirmModal from "../component/ConfirmModal";
import backend from "../ip";
const formatter = (date) => moment(date).format("MMMM Do YYYY, h:mm a");
class DriverRequest extends React.Component {
  state = { list: [] };
  componentDidMount() {
    this.fetchData();
  }
  fetchData = async () => {
    const response = await axios.get(backend + "/admin/driver");
    const { success, driver } = response.data;
    if (success) {
      this.setState({ list: driver });
    }
  };
  handleApprove = async (id) => {
    const { username } = this.props.user;
    const response = await axios.post(backend + "/admin/driver-approve", {
      id,
      admin_name: username,
    });
    const { success } = response.data;
    if (success) {
      this.fetchData();
    }
  };

  handleReject = async (id) => {
    const { username } = this.props.user;
    const response = await axios.post(backend + "/admin/driver-reject", {
      id,
      admin_name: username,
    });
    const { success } = response.data;
    if (success) {
      this.fetchData();
    }
  };
  render() {
    return (
      <Grid
        container
        direction="column"
        justify="center"
        style={{ width: "100%" }}
      >
        <MyHeader style={{ justifyContent: "left" }}>
          > Driver's request
        </MyHeader>
        <div style={{ margin: "32px 0", alignSelf: "center" }}>
          <EmptyBox data={this.state.list} />
          {this.state.list.map(
            ({
              id,
              username,
              firstname,
              lastname,
              phone_number,
              email,
              photo,
              driving_license,
              edited_at,
            }) => (
              <div
                key={id}
                style={{
                  maxWidth: 740,
                  display: "flex",
                  border: "1px solid #C4C4C4",
                  padding: "16px 48px",
                  marginBottom: "16px",
                }}
              >
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    alignItems: "center",
                    width: "150px",
                    marginRight: "16px",
                  }}
                >
                  <img
                    src={photo || ""}
                    height={100}
                    width={100}
                    style={{
                      alignItems: "center",
                      borderRadius: "100%",
                      marginBottom: "16px",
                    }}
                  />
                  <div style={{ alignSelf: "center" }}>{username}</div>
                </div>
                <div
                  style={{
                    flexGrow: 4,
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "space-between",
                  }}
                >
                  <div> Member ID: {id}</div>
                  <div>
                    {" "}
                    Name: {firstname} {lastname}
                  </div>
                  <div> Email: {email}</div>
                  <div> Phone number: {phone_number}</div>
                  <div> Driving license: {driving_license}</div>
                  <div> Modified at : {formatter(edited_at)}</div>
                </div>
                <div
                  style={{
                    display: "flex",
                    flexDirection: "column",
                    justifyContent: "center",
                    marginLeft: "16px",
                  }}
                >
                  <ConfirmModal
                    onConfirm={() => this.handleApprove(id)}
                    btn="0"
                    width="120px"
                    action="Approve"
                    message="Are you sure you want to approve driver's request of this member  ?"
                    confirm="OK"
                    cancel="Cancel"
                  />
                  <div style={{ marginBottom: "16px" }} />
                  <ConfirmModal
                    onConfirm={() => this.handleReject(id)}
                    btn="2"
                    width="120px"
                    action="Reject"
                    message="Are you sure you want to reject driver's request of this member ?"
                    confirm="OK"
                    cancel="Cancel"
                  />
                </div>
              </div>
            )
          )}
        </div>
      </Grid>
    );
  }
}

export default DriverRequest;
