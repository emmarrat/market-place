export interface RegisterMutation {
  username: string;
  password: string;
  displayUsername: string;
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
