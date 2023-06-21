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

export interface PwdGate {
  code : String;
  password : String;
  email : String;
}

export interface RecordGate{
  pageNum: number,
  pageSize: number,
  navSize: number,
  userId?: number,
  startTime?: any,
  endTime?: any,
}

export interface Record{
  id: number,
  problemId: number,
  userId: number,
  language: number,
  pass: number,
  executionTime: string,
  difficulty: string,
  timecost: string,
  memoryCost: string,
  foldername: string,
  problemName: string,
  code: string,
}

export interface RecordInfo{
  total:number,
  list: Record[],
  pageNum: number,
  pageSize: number,
  size: number,
  startRow: number,
  endRow: number,
  pages:number,
  prePage:number,
  nexrPage:number,
  isFirstPage:boolean,
  isLastPage:boolean,
  hasPreviousPage:boolean,
  hasNextPage:boolean,
  navigatePages:number,
  navigatepageNums:number[],
  navigateFirstPage:number,
  navigateLastPage: number
}