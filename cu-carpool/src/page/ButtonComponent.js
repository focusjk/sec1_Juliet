import React from "react";
import {
  MyButton,
  MyWhiteButton,
  MyFullWidthButton,
  MyDisabledFullWidthButton
} from "../component/MyButton";
import { MyHeader, MyTitle, MyHeaderWithArrow } from "../component/MyTitle";
import Button from "@material-ui/core/Button";
import MyModal from "../component/MyModal";
import Rating from "@material-ui/lab/Rating";

class ButtonComponent extends React.Component {
  render() {
    return (
      <div>
        <MyHeader> Hi </MyHeader>
        <MyTitle> Hi </MyTitle>
        <MyHeaderWithArrow goto="">My trip</MyHeaderWithArrow>
        <MyButton>MyButton</MyButton>
        <div style={{ margin: "10px" }} />
        <MyButton disabled>MyButton</MyButton>
        <div style={{ margin: "10px" }} />
        <MyWhiteButton>MyButton</MyWhiteButton>
        <div style={{ margin: "10px" }} />
        <MyWhiteButton disabled>MyButton</MyWhiteButton>
        <div style={{ margin: "10px" }} />
        <MyFullWidthButton>MyFullWidthButton</MyFullWidthButton>
        <div style={{ margin: "10px" }} />
        <MyFullWidthButton disabled>MyFullWidthButton</MyFullWidthButton>
        <div style={{ margin: "10px" }} />
        <MyDisabledFullWidthButton disabled>
          MyDisabledFullWidthButton
        </MyDisabledFullWidthButton>
        <div style={{ margin: "10px" }} />
        <MyModal />
        <Button color="secondary">OK</Button>
        <Button style={{ color: "#BDBDBD" }}>Cancel</Button>
        <Rating name="half-rating" defaultValue={2.34} precision={0.01} />
      </div>
    );
  }
}

export default ButtonComponent;
