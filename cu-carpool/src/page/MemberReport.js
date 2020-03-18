import React from "react";
import Button from "@material-ui/core/Button";
import { MyFullWidthButton, MyGreyButton } from "../component/MyButton";
import { MyHeader, MyTitle,MyHeaderWithArrow } from "../component/MyTitle";
import { TextField } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";
import axios from "axios";

class MemberReport extends React.Component {
  state = {
    topic: null,
    comment: null,
    msg: null
  };
  handleSend = async () => {
    const { topic, comment } = this.state;
    try {
      const response = await axios.post("http://localhost:4000/report/create", {
        id: this.props.user.id,
        topic,
        comment
      });
      console.log(response);
      const { success } = response.data;
      if (success) {
        this.setState({ topic: "", comment: "", msg: "successfully" });
      }
    } catch (e) {
      console.log(e.response);
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
            justifyContent: "space-between"
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
              onChange={e => {
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
              onChange={e => {
                this.setState({ comment: e.target.value, msg: null });
              }}
            />
          </div>
          <div>
            {!!msg && (
              <div style={{ color: "green", marginBottom: 8 }}>{msg}</div>
            )}
            <MyFullWidthButton
              style={{ display: "flex" }}
              onClick={this.handleSend}
              disabled={!topic || !comment}
            >
              Send
            </MyFullWidthButton>
          </div>
        </div>
      </Grid>
    );
  }
}
export default MemberReport;
