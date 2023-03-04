export interface RegisterMutation {
  username: string;
  password: string;
  displayUsername: string;
  phone: string;
}

export interface User {
  _id: string;
  username: string;
  displayUsername: string;
  phone: string;
  token: string;
}

export interface RegisterResponse {
  message: string;
  user: User;
}

export interface ValidationError {
  errors: {
    [key: string]: {
      name: string;
      message: string;
    }
  },
  message: string;
  name: string;
  _name: string;
}

export interface LoginMutation {
  username: string;
  password: string;
}

export interface GlobalError {
  error: string;
}

export interface Product {
  _id: string;
  title: string;
  price: number;
  image: string;
}

export interface Category {
  _id: string;
  title: string;
}

export interface FullProduct extends Product {
  customer: {
    _id: string;
    displayUsername: string;
    phone: string;
  },
  category: {
    _id: string;
    title: string;
  },
  description: string;
}

export interface ProductMutation {
  category: string;
  title: string;
  price: number;
  image: File | null;
  description: string;
}

export interface ProductToData  extends ProductMutation{
  price: string;
}
