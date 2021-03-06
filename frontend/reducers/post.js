import shortid from 'shortid';
import faker from 'faker';
import produce from '../util/produce';

//----------------------------------------------------------------------------
//* Action Type
//----------------------------------------------------------------------------

export const ADD_POST_REQUEST = 'post/ADD_POST_REQUEST';
export const ADD_POST_SUCCESS = 'post/ADD_POST_SUCCESS';
export const ADD_POST_FAILURE = 'post/ADD_POST_FAILURE';

export const ADD_COMMENT_REQUEST = 'post/ADD_COMMENT_REQUEST';
export const ADD_COMMENT_SUCCESS = 'post/ADD_COMMENT_SUCCESS';
export const ADD_COMMENT_FAILURE = 'post/ADD_COMMENT_FAILURE';

export const LOAD_POSTS_REQUEST = 'post/LOAD_POSTS_REQUEST';
export const LOAD_POSTS_SUCCESS = 'post/LOAD_POSTS_SUCCESS';
export const LOAD_POSTS_FAILURE = 'post/LOAD_POSTS_FAILURE';

export const LOAD_POST_REQUEST = 'post/LOAD_POST_REQUEST';
export const LOAD_POST_SUCCESS = 'post/LOAD_POST_SUCCESS';
export const LOAD_POST_FAILURE = 'post/LOAD_POST_FAILURE';

export const LOAD_USER_POSTS_REQUEST = 'post/LOAD_USER_POSTS_REQUEST';
export const LOAD_USER_POSTS_SUCCESS = 'post/LOAD_USER_POSTS_SUCCESS';
export const LOAD_USER_POSTS_FAILURE = 'post/LOAD_USER_POSTS_FAILURE';

export const LOAD_HASHTAG_POSTS_REQUEST = 'post/LOAD_HASHTHAG_POSTS_REQUEST';
export const LOAD_HASHTAG_POSTS_SUCCESS = 'post/LOAD_HASHTHAG_POSTS_SUCCESS';
export const LOAD_HASHTAG_POSTS_FAILURE = 'post/LOAD_HASHTHAG_POSTS_FAILURE';

export const REMOVE_POST_REQUEST = 'post/REMOVE_POST_REQUEST';
export const REMOVE_POST_SUCCESS = 'post/REMOVE_POST_SUCCESS';
export const REMOVE_POST_FAILURE = 'post/REMOVE_POST_FAILURE';

export const LIKE_POST_REQUEST = 'post/LIKE_POST_REQUEST';
export const LIKE_POST_SUCCESS = 'post/LIKE_POST_SUCCESS';
export const LIKE_POST_FAILURE = 'post/LIKE_POST_FAILURE';

export const UNLIKE_POST_REQUEST = 'post/UNLIKE_POST_REQUEST';
export const UNLIKE_POST_SUCCESS = 'post/UNLIKE_POST_SUCCESS';
export const UNLIKE_POST_FAILURE = 'post/UNLIKE_POST_FAILURE';

export const UPLOAD_IMAGES_REQUEST = 'post/UPLOAD_IMAGES_REQUEST';
export const UPLOAD_IMAGES_SUCCESS = 'post/UPLOAD_IMAGES_SUCCESS';
export const UPLOAD_IMAGES_FAILURE = 'post/UPLOAD_IMAGES_FAILURE';

export const RETWEET_REQUEST = 'post/RETWEET_REQUEST';
export const RETWEET_SUCCESS = 'post/RETWEET_SUCCESS';
export const RETWEET_FAILURE = 'post/RETWEET_FAILURE';

export const CANCEL_UPLOAD_IMAGE = 'post/CANCEL_UPLOAD_IMAGE'; // ????????? ?????? ??????

// ? User Reducer??? ??????????????? ?????? ?????? ??????
// ? ????????? ??? ????????? ????????? ?????? ????????????
export const ADD_POST_TO_ME = 'post/ADD_POST_TO_ME';
export const REMOVE_POST_OF_ME = 'post/REMOVE_POST_OF_ME';

//----------------------------------------------------------------------------
//* Action Function
//----------------------------------------------------------------------------

export const addCommentRequestAction = (data) => ({
  type: ADD_COMMENT_REQUEST,
  payload: data,
});

export const removePostRequestAction = (postId) => ({
  type: REMOVE_POST_REQUEST,
  payload: postId,
});

// const dummyPost = (data) => ({
//   id: data.id,
//   content: data.content,
//   User: {
//     id: 1,
//     nickname: 'messi',
//   },
//   Images: [],
//   Comments: [],
// });

// const dummyComment = (data) => ({
//   id: shortid.generate(),
//   User: {
//     id: shortid.generate(),
//     nickname: 'messi',
//   },
//   content: data,
// });

/*
  * ????????? ?????? ????????? ?????? ??????
  ? ?????? ?????? ???????????? ???????????? ?????????
  ? ???????????? Sequelize??? ?????? ????????????.
 */
export const generateDummyPost = (number) =>
  Array(number)
    .fill()
    .map(() => ({
      id: shortid.generate(),
      User: {
        id: shortid.generate(),
        nickname: faker.name.findName(),
      },
      content: faker.lorem.paragraph(),
      Images: [
        {
          id: shortid.generate(),
          src: faker.image.image(),
        },
      ],
      Comments: [
        {
          id: shortid.generate(),
          User: {
            nickname: faker.name.findName(),
          },
          content: faker.lorem.sentence(),
        },
      ],
    }));

//----------------------------------------------------------------------------
//* State & Reducer Function
//----------------------------------------------------------------------------

const initialState = {
  mainPosts: [],
  singlePost: null, // ?????? ????????? ??????
  imagePaths: [], // ????????? ??? ????????? ??????
  hasMorePosts: true, // ????????? ???????????? ??? ????????? ??????
  addPostLoading: false,
  addPostDone: false,
  addPostError: null,
  loadPostsLoading: false,
  loadPostsDone: false,
  loadPostsError: null,
  loadPostLoading: false,
  loadPostDone: false,
  loadPostError: null,
  addCommentLoading: false,
  addCommentDone: false,
  addCommentError: null,
  removePostLoading: false,
  removePostDone: false,
  removePostError: null,
  likePostLoading: false,
  likePostDone: false,
  likePostError: null,
  unlikePostLoading: false,
  unlikePostDone: false,
  unlikePostError: null,
  uploadImagesLoading: false,
  uploadImagesDone: false,
  uploadImagesError: null,
  retweetLoading: false,
  retweetDone: false,
  retweetError: null,
};

// Post Reducer
const reducer = (state = initialState, action) =>
  produce(state, (draft) => {
    switch (action.type) {
      // ????????? ????????? ??????
      case CANCEL_UPLOAD_IMAGE:
        draft.imagePaths = draft.imagePaths.filter((image, index) => index !== action.payload);
        break;

      // ????????? ??????
      case LOAD_USER_POSTS_REQUEST:
      case LOAD_HASHTAG_POSTS_REQUEST:
      case LOAD_POSTS_REQUEST:
        draft.loadPostsLoading = true;
        draft.loadPostsDone = false;
        draft.loadPostsError = null;
        break;

      case LOAD_USER_POSTS_SUCCESS:
      case LOAD_HASHTAG_POSTS_SUCCESS:
      case LOAD_POSTS_SUCCESS:
        draft.loadPostsLoading = false;
        draft.loadPostsDone = true;
        draft.mainPosts = draft.mainPosts.concat(action.payload);
        draft.hasMorePosts = action.payload.length === 10; // 10?????? ????????????. 10??? ????????? ?????? ????????? ?????? ??????
        break;

      case LOAD_USER_POSTS_FAILURE:
      case LOAD_HASHTAG_POSTS_FAILURE:
      case LOAD_POSTS_FAILURE:
        draft.loadPostsLoading = false;
        draft.loadPostsError = action.payload;
        break;

      case LOAD_POST_REQUEST:
        draft.loadPostLoading = true;
        draft.loadPostDone = false;
        draft.loadPostError = null;
        break;

      case LOAD_POST_SUCCESS:
        draft.loadPostLoading = false;
        draft.loadPostDone = true;
        draft.singlePost = action.payload;
        break;

      case LOAD_POST_FAILURE:
        draft.loadPostLoading = false;
        draft.loadPostError = action.payload;
        break;

      case ADD_POST_REQUEST:
        draft.addPostLoading = true;
        draft.addPostDone = false;
        draft.addPostError = null;
        break;

      case ADD_POST_SUCCESS:
        draft.addPostLoading = false;
        draft.addPostDone = true;
        draft.mainPosts.unshift(action.payload);
        draft.imagePaths = [];
        break;

      case ADD_POST_FAILURE:
        draft.addPostLoading = false;
        draft.addPostError = action.payload;
        break;

      case REMOVE_POST_REQUEST:
        draft.removePostLoading = true;
        draft.removePostDone = false;
        draft.removePostError = null;
        break;

      case REMOVE_POST_SUCCESS: {
        // ? immer??? ???????????? ???????????? ?????? ????????? ????????? filter ????????? ?????????. (immer ???????????? splice??? ??????)
        draft.mainPosts = draft.mainPosts.filter((post) => post.id !== action.payload.postId);
        draft.removePostLoading = false;
        draft.removePostDone = true;
        break;
      }

      case REMOVE_POST_FAILURE:
        draft.removePostLoading = false;
        draft.removePostError = action.payload;
        break;

      // ?????????
      case LIKE_POST_REQUEST:
        draft.likePostLoading = true;
        draft.likePostDone = false;
        draft.likePostError = null;
        break;

      case LIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((p) => p.id === action.payload.PostId);
        post.Likers.push({ id: action.payload.UserId });
        draft.likePostLoading = false;
        draft.likePostDone = true;
        break;
      }

      case LIKE_POST_FAILURE:
        draft.likePostLoading = false;
        draft.likePostError = action.payload;
        break;

      // ????????? ??????
      case UNLIKE_POST_REQUEST: {
        draft.unlikePostLoading = true;
        draft.unlikePostDone = false;
        draft.unlikePostError = null;
        break;
      }

      case UNLIKE_POST_SUCCESS: {
        const post = draft.mainPosts.find((p) => p.id === action.payload.PostId);
        post.Likers = post.Likers.filter((p) => p.id !== action.payload.UserId);
        draft.unlikePostLoading = false;
        draft.unlikePostDone = true;
        break;
      }

      case UNLIKE_POST_FAILURE:
        draft.unlikePostLoading = false;
        draft.unlikePostError = action.payload;
        break;

      // ?????? ??????

      case ADD_COMMENT_REQUEST:
        draft.addCommentLoading = true;
        draft.addCommentDone = false;
        break;

      case ADD_COMMENT_SUCCESS: {
        const post = draft.mainPosts.find((v) => v.id === action.payload.PostId);
        post.Comments.unshift(action.payload);
        draft.addCommentLoading = false;
        draft.addCommentDone = true;
        break;
      }

      case ADD_COMMENT_FAILURE:
        draft.addCommentLoading = false;
        draft.addPostError = action.payload;
        break;

      case UPLOAD_IMAGES_REQUEST:
        draft.uploadImagesLoading = true;
        draft.uploadImagesDone = false;
        draft.uploadImagesError = null;
        break;

      case UPLOAD_IMAGES_SUCCESS:
        draft.uploadImagesLoading = false;
        draft.uploadImagesDone = true;
        draft.imagePaths = action.payload;
        break;

      case UPLOAD_IMAGES_FAILURE:
        draft.uploadImagesLoading = false;
        draft.uploadImagesError = action.payload;
        break;

      case RETWEET_REQUEST:
        draft.retweetLoading = true;
        draft.retweetDone = false;
        draft.retweetError = null;
        break;

      case RETWEET_SUCCESS:
        draft.retweetLoading = false;
        draft.retweetDone = true;
        draft.mainPosts.unshift(action.payload);
        break;

      case RETWEET_FAILURE:
        draft.retweetLoading = false;
        draft.retweetError = action.payload;
        break;

      default:
        break;
    }
  });

export default reducer;
