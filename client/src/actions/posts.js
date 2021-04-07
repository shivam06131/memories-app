import * as api from "../api/index";
import {
  CREATE,
  FETCH_ALL,
  UPDATE,
  DELETE,
  LIKECOUNT,
} from "../constaints/actionTypes";

export const getPosts = () => async (dispatch) => {
  try {
    //this data is the response sended by the backend as a response
    const { data } = await api.fetchPost();

    console.log("post received from backend", data);
    dispatch({ type: FETCH_ALL, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const createPost = (newPost) => async (dispatch) => {
  try {
    const { data } = await api.createPost(newPost);
    dispatch({ type: CREATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const updatePost = (id, post) => async (dispatch) => {
  try {
    // console.log("id received at action : ", id);
    // console.log("post received at action : ", post);
    // axios fetch the data so it take some time and it you don't use await so it will instantly return undifined and errors will start occouring
    const { data } = await api.updatePost(id, post);
    console.log("payload dispatched: ", data);
    dispatch({ type: UPDATE, payload: data });
  } catch (error) {
    console.log(error);
  }
};

export const deletePost = (id) => async (dispatch) => {
  try {
    await api.deletePost(id);
    // console.log(`inside action post and id is`, id);
    dispatch({ type: DELETE, payload: id });
  } catch (error) {
    console.log(error);
  }
};

export const likePost = (id) => async (dispatch) => {
  try {
    const { data } = await api.likePost(id);
    dispatch({ type: LIKECOUNT, payload: data });
  } catch (error) {
    console.log(error);
  }
};
