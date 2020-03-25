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
import RequestJoin from "../component/RequestJoin";
import LocationDetail from "../component/LocationDetail";
import Rating from "@material-ui/lab/Rating";
import EmptyBox from "../component/EmptyBox";
import ReviewModal from "../component/ReviewModal";
import CreateReviewModal from "../component/CreateReviewModal";
import ConfirmModal from "../component/ConfirmModal";

class ButtonComponent extends React.Component {
  render() {
    return (
      <div>
        <MyHeader>MyHeader</MyHeader>
        <MyTitle>MyTitle</MyTitle>
        {/* data is not empty list => null ไม่แสดงอะไร */}
        <EmptyBox data={[]} />
        <MyHeaderWithArrow goto="">MyHeaderWithArrow</MyHeaderWithArrow>
        <MyLink goto="/my-trip">MyLink</MyLink>
        <MyButton>MyButton</MyButton>
        <div style={{ margin: "10px" }} />
        <MyButton disabled>MyButton_disable</MyButton>
        <div style={{ margin: "10px" }} />
        <MyWhiteButton>MyWhiteButton</MyWhiteButton>
        <div style={{ margin: "10px" }} />
        <MyWhiteButton disabled>MyWhiteButton_disable</MyWhiteButton>
        <div style={{ margin: "10px" }} />
        <MyGreyButton>MyGreyButton</MyGreyButton>
        <div style={{ margin: "10px" }} />
        <MyGreyButton disabled>MyGreyButton_disable</MyGreyButton>
        <div style={{ margin: "10px" }} />
        <MyFullWidthButton>MyFullWidthButton</MyFullWidthButton>
        <div style={{ margin: "10px" }} />
        <MyFullWidthButton disabled>MyFullWidthButton</MyFullWidthButton>
        <div style={{ margin: "10px" }} />
        <MyDisabledFullWidthButton disabled>
          MyDisabledFullWidthButton_disable
        </MyDisabledFullWidthButton>
        <div style={{ margin: "10px" }} />
        <MyModal />
        <RequestJoin />
        <LocationDetail />
        <ReviewModal />
        <Button color="secondary">Button_secondary</Button>
        <Button style={{ color: "#BDBDBD" }}>Button</Button>
        <Rating name="half-rating" defaultValue={2.34} precision={0.01} />
        <ReviewModal/>
        <CreateReviewModal/>
        <ConfirmModal/>
      </div>
    );
  }
}

export default ButtonComponent;
