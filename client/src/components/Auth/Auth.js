import React, { useState } from "react";
import {
  Avatar,
  Button,
  Paper,
  Grid,
  Typography,
  Container,
  Icon,
} from "@material-ui/core";
import useStyles from "./styles";
import LockOutlinedIcon from "@material-ui/icons/LockOutlined";
import Input from "./Input";
import { GoogleLogin } from "react-google-login";
import SearchIcon from "@material-ui/icons/Search";
import { useDispatch } from "react-redux";
import { useHistory } from "react-router-dom";
import {signin , signup} from '../../actions/auth'

const initialState = {
  firstName: "",
  lastName: "",
  email: "",
  password: "",
  confirmPassword: "",
};

const Auth = () => {
  const dispatch = useDispatch();
  const [formData, setFormData] = useState(initialState);
  const history = useHistory();
  const [isSignup, setIsSignup] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const handleShowPassword = () => {
    setShowPassword((prevState) => !prevState);
  };
  const classes = useStyles();
  const handleSubmit = (e) => {
    e.preventDefault();
    if(isSignup){
      dispatch(signup(formData , history))
    }else{
      dispatch(signin(formData , history))

    }
  };
  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };
  const switchMode = () => {
    setIsSignup((oldState) => !oldState);
    setShowPassword(false);
  };
  const googleSuccess = async (res) => {
    //sometimes there will be no response so we used special operator (optional chaning operator) "?." so that it will not throw any error
    const result = res?.profileObj;
    const token = res?.tokenId;
    console.log(res);
    try {
      dispatch({ type: "AUTH", data: { result, token } });

      history.push("/"); //Redirecting to main page after the login
    } catch (error) {
      console.log(error);
    }
  };
  const googleFailure = (err) => {
    console.log("Google sign in was unsucessfull. Try again", err);
  };
  return (
    <Container maxWidth="xs" component="main">
      <Paper className={classes.paper} elevation={3}>
        <Avatar className={classes.avatar}>
          <LockOutlinedIcon />
        </Avatar>
        <Typography variant="h5">{isSignup ? "SignUP " : "SignIn"}</Typography>
        <form className={classes.form} onSubmit={handleSubmit}>
          <Grid container spacing={2}>
            {isSignup && (
              <>
                <Input
                  label="FirstName"
                  name="firstName"
                  handleChange={handleChange}
                  autoFocus
                  half
                />
                <Input
                  label="LastName"
                  name="lastName"
                  handleChange={handleChange}
                  half
                />
              </>
            )}
            <Input
              name="email"
              label="Email Address"
              handleChange={handleChange}
              type="email"
            />
            <Input
              name="password"
              label="Password"
              handleChange={handleChange}
              type={showPassword ? "text" : "password"}
              handleShowPassword={handleShowPassword}
            />
            {isSignup && (
              <Input
                name="confirmPassword"
                label="Repeat Password"
                handleChange={handleChange}
                type="password"
              />
            )}

            <Button
              fullWidth
              type="submit"
              variant="contained"
              color="primary"
              className={classes.submit}
            >
              {isSignup ? "Sign Up" : "Sign In"}
            </Button>
            <GoogleLogin
              clientId="251232720794-9s3r845ue1g8encuugfotmemraopl0cr.apps.googleusercontent.com"
              render={(renderProps) => (
                <Button
                  className={classes.googleButton}
                  color="primary"
                  fullWidth
                  onClick={renderProps.onClick}
                  disabled={renderProps.disabled}
                  startIcon={
                    <Icon>
                      <SearchIcon />
                    </Icon>
                  }
                  variant="contained"
                >
                  Google Sign In
                </Button>
              )}
              onSuccess={googleSuccess}
              onFailure={googleFailure}
              cookiePolicy="single_host_origin"
            />
            <Grid container justify="center">
              <Grid item>
                <Button onClick={switchMode}>
                  {isSignup
                    ? "Already have an account? Signin"
                    : "Don't have an account? SignUp"}
                </Button>
              </Grid>
            </Grid>
          </Grid>
        </form>
      </Paper>
    </Container>
  );
};

export default Auth;
