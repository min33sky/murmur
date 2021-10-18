import { atom } from 'recoil';
import { IPost } from '../typings/posts';
import faker from 'faker';
import { nanoid } from 'nanoid';

export function dummyData(): IPost[] {
  return Array(10)
    .fill(null)
    .map((el) => ({
      id: nanoid(),
      content: faker.lorem.lines(),
      likes: [1, 2],
      Comments: [
        {
          id: nanoid(),
          content: faker.lorem.lines(),
          User: {
            id: nanoid(),
            nickname: faker.internet.userName(),
          },
        },
      ],
      Images: [{ src: faker.image.image() }],
      User: {
        id: nanoid(),
        email: faker.internet.email(),
        nickname: faker.internet.userName(),
      },
    }));
}

export const postsListState = atom<IPost[]>({
  key: 'postsList',
  default: [
    {
      id: '1',
      content: '첫 번째 게시물 #해시태그 #리액트',
      likes: [1, 2],
      User: {
        id: '1',
        nickname: 'messi',
        email: 'messi@naver.com',
      },
      Images: [
        {
          src: 'https://images.unsplash.com/photo-1634016793183-c3a5a5c3a48a?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1170&q=80',
        },
        {
          src: 'https://images.unsplash.com/photo-1633885278462-f6e52e3081fb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=687&q=80',
        },
        {
          src: 'https://images.unsplash.com/photo-1633969438604-c36dba0c2dbd?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=764&q=80',
        },
      ],
      Comments: [
        {
          id: '1',
          content: '댓글 1등',
          User: {
            id: '2',
            nickname: 'ronaldo',
          },
        },
        {
          id: '2',
          content: '쇼오오오오메이커!!!!',
          User: {
            id: '3',
            nickname: 'faker',
          },
        },
      ],
    },
    //* 더미 데이터
    ...dummyData(),
  ],
});
