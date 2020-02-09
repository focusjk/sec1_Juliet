import React from 'react';
import { withRouter } from 'react-router-dom';
import { Input, Grid } from '@material-ui/core';
import { makeStyles } from '@material-ui/core/styles';
import { MyFullWidthButton } from '../component/MyButton';

const useStyles = makeStyles({
  root: {
    color: '#777777',
    marginBottom: 20,
    marginRight: '30px', marginLeft:'30px'
  },
});

const AdminLogin = () => {
  const classes = useStyles();
  const [username, setUsername] = React.useState('');
  return (
    <div style={{ display: 'flex', flexDirection:'column', alignContent: 'center',
      marginRight: '50px', marginLeft:'50px' }}>

      <h1 style={{ marginBottom: 10, marginTop: 50 }}> Welcome,</h1>

      <div style={{ display: 'flex', marginTop: 30, marginBottom: 5, marginLeft:'30px' }}> USERNAME </div>
      <Input placeholder="Username" className={classes.root} 
        value={username}
        onChange={e => setUsername(e.target.value)}
      />

      <div style={{ display: 'flex', marginRight: '500px', marginLeft:'500px' }}>
      <MyFullWidthButton style={{ marginTop: 60 }} 
        onClick={() => {
          this.props.history.push('/');
        }}
      > Sign In </MyFullWidthButton>
      </div>

    </div>
  );
};

export default withRouter(AdminLogin);
