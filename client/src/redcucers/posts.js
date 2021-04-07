import {
  CREATE,
  FETCH_ALL,
  UPDATE,
  DELETE,
  LIKECOUNT,
} from "../constaints/actionTypes";

const reducers = (posts = [], action) => {
  switch (action.type) {
    case DELETE:
      return posts.filter((item) => item._id !== action.payload);
    case UPDATE:
    case LIKECOUNT:
      return posts.map((post) => {
        return post._id === action.payload._id ? action.payload : post;
      });
    case FETCH_ALL:
      return action.payload;
    case CREATE:
      return [...posts, action.payload];
    default:
      return posts;
  }
};

export default reducers;

//reducer update the store
