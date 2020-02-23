import React from "react";
import {
  MyButton,
  MyGreyButton,
  MyWhiteButton,
  MyFullWidthButton,
  MyDisabledFullWidthButton
} from "../component/MyButton";
import { MyHeader, MyTitle, MyHeaderWithArrow, MyLink } from "../component/MyTitle";
import Button from "@material-ui/core/Button";
import MyModal from "../component/MyModal";
import Rating from "@material-ui/lab/Rating";
import EmptyBox from "../component/EmptyBox";

class ButtonComponent extends React.Component {
  render() {
    return (
      <div>
        <MyHeader> Hi </MyHeader>
        <MyTitle> Hi </MyTitle>
        {/* data is not empty list => null ไม่แสดงอะไร */}
        <EmptyBox data={[]} />
        <MyHeaderWithArrow goto="">My trip</MyHeaderWithArrow>
        <MyLink goto="/my-trip">My trip</MyLink>
        <MyButton>MyButton</MyButton>
        <div style={{ margin: "10px" }} />
        <MyButton disabled>MyButton</MyButton>
        <div style={{ margin: "10px" }} />
        <MyWhiteButton>MyButton</MyWhiteButton>
        <div style={{ margin: "10px" }} />
	<MyGreyButton>MyButton</MyGreyButton>
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
