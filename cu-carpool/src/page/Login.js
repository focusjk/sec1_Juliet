import React from 'react';
import MyButton from '../component/MyButton';

class Login extends React.Component {
  render() {
    return (
      <>
        <div>Welcome,</div>
        <div>Sign In</div>
        <MyButton variant="contained">Sign Up</MyButton>
      </>
    );
  }
}

export default Login;
