import { takeEvery, put, call } from "redux-saga/effects";
import { GET_POSTS } from "./actionTypes";
import { fetchPostsSuccess, fetchPostsFail } from "./actions";
import { getPosts } from "../../helpers/fakebackend_helper";

function* fetchPostsSaga() {
  try {
    const response = yield call(getPosts);
    yield put(fetchPostsSuccess(response));
  } catch (error) {
    yield put(fetchPostsFail(error));
  }
}

function* watchFetchPosts() {
  yield takeEvery(GET_POSTS, fetchPostsSaga);
}
export default watchFetchPosts;
