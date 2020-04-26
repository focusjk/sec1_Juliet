import React from "react";
import { MyHeader } from "../component/MyTitle";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import axios from "axios";
import ConfirmModal from "../component/ConfirmModal";
import backend from "../ip";
class MemberReport extends React.Component {
  state = {
    topic: null,
    comment: null,
    msg: null,
  };
  handleSend = async () => {
    const { topic, comment } = this.state;
    try {
      const response = await axios.post(backend + "/report/create", {
        id: this.props.user.id,
        topic,
        comment,
      });
      const { success } = response.data;
      if (success) {
        this.setState({ topic: "", comment: "", msg: "successfully" });
      }
    } catch (e) {
      console.log(e);
    }
  };
  render() {
    const { topic, comment, msg } = this.state;
    return (
      <Grid container direction="column" justify="flex-direction">
        <div
          style={{
            display: "flex",
            flexDirection: "column",
            height: "80vh",
            justifyContent: "space-between",
          }}
        >
          <div>
            <MyHeader>Report</MyHeader>
            <TextField
              fullWidth
              label="Topic"
              style={{ margin: "8px 0" }}
              required
              value={topic}
              onChange={(e) => {
                this.setState({ topic: e.target.value, msg: null });
              }}
            />
            <TextField
              fullWidth
              multiline
              label="Comment"
              required
              value={comment}
              style={{ margin: "8px 0" }}
              onChange={(e) => {
                this.setState({ comment: e.target.value, msg: null });
              }}
            />
          </div>
          <div>
            {!!msg && (
              <div style={{ color: "green", marginBottom: 8 }}>{msg}</div>
            )}
            <ConfirmModal
              onConfirm={this.handleSend}
              disabled={!topic || !comment}
              btn="1"
              action="Send"
              message="Are you sure you want to send this report to admin ?"
              confirm="OK"
              cancel="Cancel"
            />
          </div>
        </div>
      </Grid>
    );
  }
}
export default MemberReport;
