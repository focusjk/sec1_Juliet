import React from 'react';
import {
  MyButton,
  MyWhiteButton,
  MyFullWidthButton,
  MyDisabledFullWidthButton,
} from '../component/MyButton';

class ButtonComponent extends React.Component {
  render() {
    return (
      <div>
        <MyButton>MyButton</MyButton>
        <div style={{ margin: '10px' }} />
        <MyWhiteButton>MyButton</MyWhiteButton>
        <div style={{ margin: '10px' }} />
        <MyFullWidthButton>MyFullWidthButton</MyFullWidthButton>
        <div style={{ margin: '10px' }} />
        <MyDisabledFullWidthButton disabled>MyDisabledFullWidthButton</MyDisabledFullWidthButton>
        <div style={{ margin: '10px' }} />
      </div>
    );
  }
}

export default ButtonComponent;
