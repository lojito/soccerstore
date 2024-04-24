import { IFavorite } from "./favorite";

export interface IUser {
  _id?: string;
  email: string;
  name: string;
  password: string;
  favorites: IFavorite[];
}
