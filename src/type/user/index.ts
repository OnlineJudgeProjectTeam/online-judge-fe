export interface Token {
  value: string;
  expire?: number;
  _id?: string;
}

export interface PersonRes {
  id: number;
  username: string;
  password: string;
  email: string;
  name: string;
  avatar?: string;
  createdTime?: string;
  school?: string;
  description?: string;
  sex?: number; //0 女 1 男
  company?: string;
  token: string;
}
