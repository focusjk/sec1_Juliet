import React from "react";
import {
  MyButton,
  MyWhiteButton,
  MyFullWidthButton,
  MyDisabledFullWidthButton
} from "../component/MyButton";
import { MyHeader, MyTitle } from "../component/MyTitle";
import Button from "@material-ui/core/Button";

class ButtonComponent extends React.Component {
  render() {
    return (
      <div>
        <MyHeader> Hi </MyHeader>
        <MyTitle> Hi </MyTitle>
        <MyButton>MyButton</MyButton>
        <div style={{ margin: "10px" }} />
        <MyWhiteButton>MyButton</MyWhiteButton>
        <div style={{ margin: "10px" }} />
        <MyFullWidthButton>MyFullWidthButton</MyFullWidthButton>
        <div style={{ margin: "10px" }} />
        <MyDisabledFullWidthButton disabled>
          MyDisabledFullWidthButton
        </MyDisabledFullWidthButton>
        <div style={{ margin: "10px" }} />

        <Button color="secondary">OK</Button>
        <Button style={{ color: "#BDBDBD" }}>Cancel</Button>
      </div>
    );
  }
}

export default ButtonComponent;
