import { all, fork, takeLatest, put, throttle, call } from 'redux-saga/effects';
import axios from 'axios';
import {
  ADD_POST_REQUEST,
  ADD_POST_SUCCESS,
  ADD_POST_FAILURE,
  ADD_COMMENT_REQUEST,
  ADD_COMMENT_SUCCESS,
  ADD_COMMENT_FAILURE,
  ADD_POST_TO_ME,
  REMOVE_POST_REQUEST,
  REMOVE_POST_SUCCESS,
  REMOVE_POST_FAILURE,
  REMOVE_POST_OF_ME,
  LOAD_POSTS_REQUEST,
  LOAD_POSTS_SUCCESS,
  LOAD_POSTS_FAILURE,
  LIKE_POST_REQUEST,
  UNLIKE_POST_REQUEST,
  LIKE_POST_FAILURE,
  UNLIKE_POST_SUCCESS,
  UNLIKE_POST_FAILURE,
  LIKE_POST_SUCCESS,
  UPLOAD_IMAGES_REQUEST,
  UPLOAD_IMAGES_SUCCESS,
  RETWEET_REQUEST,
  RETWEET_SUCCESS,
  RETWEET_FAILURE,
  LOAD_POST_REQUEST,
  LOAD_POST_SUCCESS,
  LOAD_POST_FAILURE,
  LOAD_USER_POSTS_REQUEST,
  LOAD_HASHTAG_POSTS_REQUEST,
  LOAD_USER_POSTS_SUCCESS,
  LOAD_USER_POSTS_FAILURE,
  LOAD_HASHTAG_POSTS_SUCCESS,
  LOAD_HASHTAG_POSTS_FAILURE,
} from '../reducers/post';

function addPostApi(formData) {
  return axios.post('/post', formData); // FormData(imagePath, text)
}

/**
 * 게시물 등록
 * @param {Object} action 게시물 등록 액션
 */
function* addPost(action) {
  try {
    const response = yield call(addPostApi, action.payload);

    yield put({
      type: ADD_POST_SUCCESS,
      payload: response.data,
    });

    // User Reducer도 업데이트
    yield put({
      type: ADD_POST_TO_ME,
      payload: response.data.id,
    });
  } catch (error) {
    yield put({
      type: ADD_POST_FAILURE,
      payload: error.response.data,
    });
  }
}

function loadPostsApi(lastId) {
  return axios.get(`/posts?lastId=${lastId || 0}`);
}

/**
 * 전체 게시물 불러오기
 * @param {Object} action 게시물들을 불러오는 액션
 */
function* loadPosts(action) {
  try {
    const response = yield call(loadPostsApi, action.payload);

    yield put({
      type: LOAD_POSTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POSTS_FAILURE,
      payload: error.response.data,
    });
  }
}

function removePostApi(postId) {
  return axios.delete(`/post/${postId}`);
}

/**
 * 게시물 삭제
 * @param {Object} action 게시물 삭제 액션
 */
function* removePost(action) {
  try {
    const response = yield call(removePostApi, action.payload);

    yield put({
      type: REMOVE_POST_SUCCESS,
      payload: response.data,
    });

    yield put({
      type: REMOVE_POST_OF_ME,
      payload: action.payload,
    });
  } catch (error) {
    yield put({
      type: REMOVE_POST_FAILURE,
      payload: error.response.data,
    });
  }
}

function addCommentApi(commentData) {
  return axios.post(`/post/${commentData.postId}/comment`, commentData);
}

function* addComment(action) {
  try {
    const response = yield call(addCommentApi, action.payload);
    yield put({
      type: ADD_COMMENT_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: ADD_COMMENT_FAILURE,
      payload: error.response.data,
    });
  }
}

function likePostApi(postId) {
  return axios.patch(`/post/${postId}/like`);
}

/**
 * 게시물 좋아요 기능
 * @param {Object} action 좋아요 액션
 */
function* likePost(action) {
  try {
    const response = yield call(likePostApi, action.payload);

    yield put({
      type: LIKE_POST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    put({
      type: LIKE_POST_FAILURE,
      payload: error.response.data,
    });
  }
}

function unlikePostApi(postId) {
  return axios.delete(`/post/${postId}/like`);
}

/**
 * 게시물 좋아요 취소 기능
 * @param {Object} action 좋아요 취소 액션
 */
function* unlikePost(action) {
  try {
    const response = yield call(unlikePostApi, action.payload);

    yield put({
      type: UNLIKE_POST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    put({
      type: UNLIKE_POST_FAILURE,
      payload: error.response.data,
    });
  }
}

function uploadImageApi(images) {
  return axios.post('/post/images', images); // multer에서 처리하므로 JSON 형식으로 보내지 않는다. {key : value}
}

/**
 * 이미지 업로드
 * @param {Object} action 이미지 업로드 액션
 */
function* uploadImage(action) {
  try {
    const response = yield call(uploadImageApi, action.payload);

    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: UPLOAD_IMAGES_SUCCESS,
    });
  }
}

function retweetApi(postId) {
  return axios.post(`/post/${postId}/retweet`);
}

/**
 * 리트윗
 * @param {Object} action 리트윗 액션
 */
function* retweet(action) {
  try {
    const response = yield call(retweetApi, action.payload);

    yield put({
      type: RETWEET_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: RETWEET_FAILURE,
      payload: error.response.data,
    });
  }
}

function loadPostApi(postId) {
  return axios.get(`/post/${postId}`);
}

/**
 * 게시물 불러오기
 * @param {Object} action 게시물 불러오기 액션
 */
function* loadPost(action) {
  try {
    const response = yield call(loadPostApi, action.payload);

    yield put({
      type: LOAD_POST_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_POST_FAILURE,
      payload: error.response.data,
    });
  }
}

function loadUserPostsApi(data) {
  return axios.get(`/user/${data.userId}/posts?lastId=${data.lastId || 0}`);
}

/**
 * 특성 유저가 작성한 글을 불러오기
 * @param {Object} action 특정 유저의 게시물들 불러오는 액션
 */
function* loadUserPosts(action) {
  try {
    const response = yield call(loadUserPostsApi, action.payload);

    yield put({
      type: LOAD_USER_POSTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_USER_POSTS_FAILURE,
      payload: error.response.data,
    });
  }
}

function loadHashtagPostsApi(data) {
  // ? 한글 해시태그를 정상적으로 전달하기 위해 태그를 인코딩 해준다.
  return axios.get(`/hashtag/${encodeURIComponent(data.tag)}/posts?lastId=${data.lastId || 0}`);
}

/**
 * 해시태그로 게시물들 불러오기
 * @param {Object} action 해쉬태그 게시물 요청 액션
 */
function* loadHashtagPosts(action) {
  try {
    const response = yield call(loadHashtagPostsApi, action.payload);
    yield put({
      type: LOAD_HASHTAG_POSTS_SUCCESS,
      payload: response.data,
    });
  } catch (error) {
    console.error(error);
    yield put({
      type: LOAD_HASHTAG_POSTS_FAILURE,
      payload: error.response.data,
    });
  }
}

//----------------------------------------------------------------------------
//* Watch
//----------------------------------------------------------------------------

function* watchAddPost() {
  /**
   *? takeLatest:
   *! 요청이 취소되는 것이 아니라 응답이 취소되는 것이다.
   *! 그래서 같은 요청인지 체크를 서버에서 해줘야 한다.
   */
  yield takeLatest(ADD_POST_REQUEST, addPost);
}

function* watchLoadPosts() {
  // ? 지속적인 요청을 막기위해 throttle을 적용 (단, 이것만으로는 완전 해결 불가능)
  yield throttle(5000, LOAD_POSTS_REQUEST, loadPosts);
}

function* watchRemovePost() {
  yield takeLatest(REMOVE_POST_REQUEST, removePost);
}

function* watchAddComment() {
  yield takeLatest(ADD_COMMENT_REQUEST, addComment);
}

function* watchLikePost() {
  yield takeLatest(LIKE_POST_REQUEST, likePost);
}

function* watchUnlikePost() {
  yield takeLatest(UNLIKE_POST_REQUEST, unlikePost);
}

function* watchUploadImage() {
  yield takeLatest(UPLOAD_IMAGES_REQUEST, uploadImage);
}

function* watchRetweet() {
  yield takeLatest(RETWEET_REQUEST, retweet);
}

function* watchLoadPost() {
  yield takeLatest(LOAD_POST_REQUEST, loadPost);
}

function* watchLoadUserPosts() {
  yield takeLatest(LOAD_USER_POSTS_REQUEST, loadUserPosts);
}

function* watchLoadHashtagPosts() {
  yield takeLatest(LOAD_HASHTAG_POSTS_REQUEST, loadHashtagPosts);
}

export default function* postSaga() {
  yield all([
    fork(watchAddPost),
    fork(watchAddComment),
    fork(watchRemovePost),
    fork(watchLoadPost),
    fork(watchLoadPosts),
    fork(watchLikePost),
    fork(watchUnlikePost),
    fork(watchUploadImage),
    fork(watchRetweet),
    fork(watchLoadHashtagPosts),
    fork(watchLoadUserPosts),
  ]);
}
