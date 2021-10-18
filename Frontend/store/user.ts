import { atom } from 'recoil';
import { IUser } from '../typings/user';

export const userState = atom<IUser | null>({
  key: 'loggedInUser',
  default: null,
});
