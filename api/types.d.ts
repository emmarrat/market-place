export interface IUser {
  username: string;
  displayUsername: string;
  phone: string;
  password: string;
  token: string;
}

export interface ICategory {
  _id: Type.ObjectId;
  title: string;
}