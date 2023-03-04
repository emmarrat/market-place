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

export interface IProduct {
  customer: Type.ObjectId;
  category: Type.ObjectId;
  title: string;
  description: string;
  price: number;
  image: string;
}