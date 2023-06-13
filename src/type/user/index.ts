import internal from "stream";

export interface Token {
  value: string;
  expire: number;
  _id?: string;
}

export interface Person{
  username: string;
  email: string;
  name: string;
  avatar?: string;
  createdTime?: Date;
  school?: string;
  description?: string;
  sex?: internal; //0 女 1 男
  company?: string;
}