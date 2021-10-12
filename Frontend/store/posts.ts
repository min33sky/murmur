import { atom } from 'recoil';

export interface IPost {
  id: number;
  content: string;
  User: {
    id: number;
    nickname: string;
  };
  Images: { src: string }[];
  Comments: {
    id: number;
    content: string;
    User: {
      id: number;
      nickname: string;
    };
  }[];
}

export const postsListState = atom<IPost[]>({
  key: 'postsList',
  default: [
    {
      id: 1,
      content: '첫 번째 게시물 #해시태그 #리액트',
      User: {
        id: 1,
        nickname: 'messi',
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
          id: 1,
          content: '댓글 1등',
          User: {
            id: 2,
            nickname: 'ronaldo',
          },
        },
      ],
    },
  ],
});
