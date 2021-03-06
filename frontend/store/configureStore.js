import { createWrapper } from 'next-redux-wrapper';
import { createStore, applyMiddleware, compose } from 'redux';
import { composeWithDevTools } from 'redux-devtools-extension';
import logger from 'redux-logger';
import createSagaMiddleware from 'redux-saga';
import reducer from '../reducers';
import rootSaga from '../sagas';

// 로거 미들웨어
// const loggerMiddleware = ({ dispatch, getState }) => (next) => (action) => {
//   console.log(action);
//   return next(action);
// };

/**
 ** 스토어 설정 및 생성하는 함수
 */
const configureStore = () => {
  const sagaMiddleware = createSagaMiddleware(); // redux-saga
  const middlewares = [sagaMiddleware];
  const enhancer =
    process.env.NODE_ENV === 'development'
      ? composeWithDevTools(applyMiddleware(logger, ...middlewares))
      : compose(applyMiddleware(...middlewares));

  const store = createStore(reducer, enhancer);
  // saga 실행
  store.sagaTask = sagaMiddleware.run(rootSaga);
  return store;
};

/**
 ** Next의 Lifecycle을 Redux에 결합하기 위한 설정
 */
const wrapper = createWrapper(configureStore, {
  // debug: process.env.NODE_ENV === 'development',
  debug: false,
});

export default wrapper;
