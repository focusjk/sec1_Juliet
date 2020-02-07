import React from 'react';
import { makeStyles } from '@material-ui/core/styles';
import { Paper, InputBase, IconButton, Avatar } from '@material-ui/core';
import SearchIcon from '@material-ui/icons/Search';
import ArrowDropDownIcon from '@material-ui/icons/ArrowDropDown';
import ArrowDropUpIcon from '@material-ui/icons/ArrowDropUp';
const useStyles = makeStyles({
  root: {
    display: 'flex',
    // border: '1px solid #BDBDBD',
    borderRadius: '48px',
    boxShadow: 'none',
    padding: '0 16px',
    flex: 1,
  },
  input: {
    flex: 1,
  },
  iconButton: {
    padding: 0,
    marginLeft: '8px',
  },
});

const Home = () => {
  const [tripList, setTripList] = React.useState([
    {
      id: 1,
      departure_detail: 'Bangkok',
      destination_detail: 'Sukhothai',
      start_datetime: null,
      owner: { id: 2, photo: null, username: 'asdasdad' },
      capacity: 4,
      request: 3,
      status: 'opening',
    },
  ]);
  const [keyword, setKeyword] = React.useState('');
  const [openFilter, setOpenFilter] = React.useState(false);

  const classes = useStyles();
  return (
    <div>
      <div style={{ display: 'flex', marginBottom: '16px' }}>
        <Paper variant="outlined" component="form" className={classes.root}>
          <InputBase
            className={classes.input}
            placeholder="Search..."
            value={keyword}
            onChange={e => setKeyword(e.target.value)}
          />
          <IconButton type="submit" className={classes.iconButton}>
            <SearchIcon />
          </IconButton>
        </Paper>
        <IconButton
          type="submit"
          className={classes.iconButton}
          onClick={() => setOpenFilter(!openFilter)}
        >
          {!openFilter && <ArrowDropDownIcon />}
          {openFilter && <ArrowDropUpIcon />}
        </IconButton>
      </div>
      {openFilter && <div>Filter jaaa</div>}

      {tripList.map(
        ({
          id,
          departure_detail,
          destination_detail,
          start_datetime,
          owner,
          capacity,
          request,
          status,
        }) => (
          <Paper
            square
            variant="outlined"
            key={id}
            style={{
              marginTop: '16px',
              padding: 8,
              display: 'flex',
              justifyContent: 'space-between',
            }}
          >
            {/* <Avatar alt="Remy Sharp" src="/static/images/avatar/1.jpg" className={classes.large} /> */}

            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>From Bangkok</div>
              <div>To Sukhothai</div>
              <div>2/2/2020 12.00</div>
              <div>Capacity: 3/5</div>
            </div>
            <div style={{ display: 'flex', flexDirection: 'column' }}>
              <div>200 baht</div>
              <div>More detail...</div>
            </div>
          </Paper>
        )
      )}
    </div>
  );
};

export default Home;
