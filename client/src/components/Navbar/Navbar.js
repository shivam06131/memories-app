import React, { useEffect, useState } from "react";
import { AppBar, Avatar, Button, Typography, Toolbar } from "@material-ui/core";
import useStyles from "./styles";
import memories from "../../images/memories.png";
import { Link, useHistory, useLocation } from "react-router-dom";
import { useDispatch } from "react-redux";
import decode from "jwt-decode";

const Navbar = () => {
  const history = useHistory();
  const location = useLocation();
  const dispatch = useDispatch();
  const classes = useStyles();
  const [user, setUser] = useState(JSON.parse(localStorage.getItem("profile")));
  console.log("user ", user);

  const logout = () => {
    dispatch({ type: "LOGOUT" });
    history.push("/");
    setUser(null);
  };

  useEffect(() => {
    const token = user?.token;

    //JWT
    if (token) {
      const decodedToken = token;

      //!decondedToken.exp * 1000 = expiry time in milliSecond
      //new Data().getTime() is the current time in milliSecond
      if (decodedToken.exp < new Date().getTime() / 1000) {
        logout();
      } else {
        console.log("token has not expired");
      }
    }
    setUser(JSON.parse(localStorage.getItem("profile")));
  }, [location]);
  return (
    <AppBar className={classes.appBar} position="static" color="inherit">
      <div className={classes.brandContainer}>
        <Typography
          component={Link}
          to="/"
          className={classes.heading}
          variant="h2"
          align="center"
        >
          Memories
        </Typography>
        <img
          className={classes.image}
          src={memories}
          alt="memories"
          height="60"
        />
      </div>
      <Toolbar className={classes.toolbar}>
        {user ? (
          <div className={classes.profile}>
            <Avatar
              className={classes.purple}
              alt={user.result.name}
              src={user.result.imageUrl}
            >
              {user.result.name.charAt(0)}
            </Avatar>
            <Typography className={classes.userName} varient="h6">
              {user.result.name}
            </Typography>
            <Button
              variant="contained"
              color="secondary"
              className={classes.logout}
              onClick={logout}
            >
              LogOut
            </Button>
          </div>
        ) : (
          <Button
            component={Link}
            to="/auth"
            variant="contained"
            color="primary"
          >
            SignIn
          </Button>
        )}
      </Toolbar>
    </AppBar>
  );
};

export default Navbar;
