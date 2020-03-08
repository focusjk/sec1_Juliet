import React from "react";
import Button from '@material-ui/core/Button';
import { MyFullWidthButton, MyGreyButton } from "../component/MyButton";
import { MyHeader, MyTitle } from "../component/MyTitle";
import { Input } from "@material-ui/core";
import Grid from "@material-ui/core/Grid";
import { Box } from "@material-ui/core";

class MemberReport extends React.Component {
  render() {
    return (
      <Grid container direction="column" justify="flex-direction">
      <div style={{ display: "flex", flexDirection: "column" ,height:80}}>
      <MyHeader>Report</MyHeader>
      <Input
          fullWidth
          placeholder="Topic"
      />
       <Input
          fullWidth
          multiline
          placeholder="Comment"
      />
       <MyFullWidthButton style={{ border:"350px 0" }} >
          Send
        </MyFullWidthButton>
     
      
      
      </div>
      </Grid>
    );
  }
}
export default MemberReport;
