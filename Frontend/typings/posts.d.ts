export type CommentType = {
  id: string;
  content: string;
  User: {
    id: string;
    nickname: string;
  };
};

export interface IPost {
  id: string;
  content: string;
  likes: number[]; //? 좋아요를 누른 사람들의 아이디
  User: {
    id: string;
    nickname: string;
    email: string;
  }; // 포스트 작성자
  Images: { src: string }[]; // 포스트에 포함된 이미지들
  Comments: CommentType[];
}
