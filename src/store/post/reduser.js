import { GET_POSTS_SUCCESS, GET_POSTS_FAIL } from "./actionTypes";

const INIT_STATE = {
  posts: [],
  error: null,
};

const postsReducer = (state = INIT_STATE, action) => {
  switch (action.type) {
    case GET_POSTS_SUCCESS:
      return {
        ...state,
        posts: action.payload,
        error: null,
      };
    case GET_POSTS_FAIL:
      return {
        ...state,
        error: action.payload,
      };
    default:
      return state;
  }
};

export default postsReducer;
