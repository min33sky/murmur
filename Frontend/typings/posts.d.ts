export type CommentType = {
  id: number;
  content: string;
  User: {
    id: number;
    nickname: string;
  };
};

export interface IPost {
  id: number;
  content: string;
  likes: number[]; //? 좋아요를 누른 사람들의 아이디
  User: {
    id: number;
    nickname: string;
  }; // 포스트 작성자
  Images: { src: string }[]; // 포스트에 포함된 이미지들
  Comments: CommentType[];
}
