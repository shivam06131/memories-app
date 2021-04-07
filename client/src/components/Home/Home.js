import React, { useState, useEffect } from "react";
import { Container, Grow, Grid } from "@material-ui/core";
import Form from "../Form/Form";
import Posts from "../Posts/Posts";
import { useDispatch } from "react-redux";
import { getPosts } from "../../actions/posts";

const Home = () => {
  const dispatch = useDispatch();
  const [currentId, setCurrentId] = useState(null);
  // console.log("normal current id in app.js", currentId);

  useEffect(() => {
    // console.log(
    //   "dispatch for getPosts trigered",
    //   "new current id in app.js",
    //   currentId
    // );
    dispatch(getPosts());
  }, [dispatch]);
  return (
    <Grow in>
      <Container>
        <Grid
          container
          justify="space-between"
          alignItems="stretch"
          spacing={3}
        >
          <Grid item xs={12} sm={7}>
            <Posts setCurrentId={setCurrentId} currentId={currentId} />
          </Grid>
          <Grid item xs={12} sm={4}>
            <Form currentId={currentId} setCurrentId={setCurrentId} />
          </Grid>
        </Grid>
      </Container>
    </Grow>
  );
};

export default Home;
