import { IPost } from './posts';

/**
 * 로그인 한 유저의 타입
 */
export interface IUser {
  id: string;
  email: string;
  nickname: string;
  profile_image?: string; // 임시
  Posts: IPost[];
  Followers: IUser[];
  Follwings: IUser[];
}
