import { GET_POSTS, GET_POSTS_SUCCESS, GET_POSTS_FAIL } from "./actionTypes";

export const fetchPosts = () => ({
  type: GET_POSTS,
});

export const fetchPostsSuccess = (posts) => ({
  type: GET_POSTS_SUCCESS,
  payload: posts,
});

export const fetchPostsFail = (error) => ({
  type: GET_POSTS_FAIL,
  payload: error,
});
