import React from 'react';
import RegisterForm from '../component/RegisterForm';
import MyButton from '../component/MyButton';

class Register extends React.Component {
  render() {
    return (
      <>
        <div>Hello,</div>
        <div>Sign up</div>
        <MyButton variant="contained">Sign Up</MyButton>
      </>
    );
  }
}

export default Register;
