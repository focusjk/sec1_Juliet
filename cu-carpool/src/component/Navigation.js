import React from "react";
import { withRouter } from "react-router-dom";
import { makeStyles } from "@material-ui/core/styles";
import logo from "../logo.png";
import {
  AppBar,
  Toolbar,
  Drawer,
  List,
  ListItem,
  ListItemText,
  ListItemIcon,
  Icon,
  IconButton,
  Divider
} from "@material-ui/core/";

const listPath = {
  user: [
    { name: "Home", path: "/", icon: "home" },
    { name: "Profile", path: "/profile", icon: "person" },
    { name: "Driver", path: "/driver", icon: "assignment_ind" },
    { name: "Test", path: "/ButtonComponent", icon: "assignment_ind" }
  ],
  driver: [
    { name: "Home", path: "/", icon: "home" },
    { name: "Profile", path: "/profile", icon: "person" },
    { name: "Driver", path: "/driver", icon: "assignment_ind" },
    { name: "My Trip", path: "/my-trip", icon: "library_books" },
    { name: "Create trip", path: "/create-trip", icon: "emoji_transportation" },
    // { name: "Trip History", path: "/my-trip", icon: "history" },
    { name: "Test", path: "/ButtonComponent", icon: "assignment_ind" }
  ]
};
const useStyles = makeStyles({
  list: {
    width: 250
  },
  barSection: { flexGrow: 1 },
  barItem: { cursor: "pointer" }
});

const Navigation = ({ history, user, handleLogout }) => {
  const classes = useStyles();
  const [open, setOpen] = React.useState(false);
  const listSelecter =
    user && user.driver_status == "approved" ? "driver" : "user";
  const sideList = (
    <div className={classes.list} role="presentation">
      <List>
        {listPath[listSelecter].map(({ name, path, icon }) => (
          <ListItem
            button
            key={name}
            onClick={() => {
              history.push(path);
              setOpen(false);
            }}
          >
            <ListItemIcon>
              <Icon>{icon}</Icon>
            </ListItemIcon>
            <ListItemText primary={name} />
          </ListItem>
        ))}
        <Divider />
        <ListItem
          button
          key="logout"
          onClick={() => {
            history.push("/login");
            handleLogout();
            setOpen(false);
          }}
        >
          <ListItemIcon>
            <Icon>exit_to_app</Icon>
          </ListItemIcon>
          <ListItemText primary="Sign out" />
        </ListItem>
      </List>
    </div>
  );
  return (
    <AppBar position="static" style={{ backgroundColor: "#C78899" }}>
      <Toolbar>
        <div className={classes.barSection}>
          <img
            className={classes.barItem}
            src={logo}
            height={40}
            onClick={() => {
              history.push("/");
            }}
          />
        </div>
        <IconButton
          edge="start"
          color="inherit"
          aria-label="menu"
          onClick={() => {
            setOpen(true);
          }}
          style={{ color: "white" }}
        >
          <Icon>menu</Icon>
        </IconButton>
      </Toolbar>
      <Drawer
        anchor="right"
        open={open}
        onClose={() => {
          setOpen(false);
        }}
      >
        {sideList}
      </Drawer>
    </AppBar>
  );
};

export default withRouter(Navigation);
