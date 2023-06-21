export interface RankingInfo{
  navSize?: number;
  order?: number;
  pageNum?: number;
  pageSize?: number;
}

export interface RankingPage {
  endRow: number;
  hasNextPage: boolean;
  hasPreviousPage: boolean;
  isFirstPage: boolean;
  isLastPage: boolean;
  list: Ranking[];
  navigateFirstPage: number;
  navigateLastPage: number;
  navigatepageNums: number[];
  navigatePages: number;
  nextPage: number;
  pageNum: number;
  pages: number;
  pageSize: number;
  prePage: number;
  size: number;
  startRow: number;
  total: number;
}

export interface Ranking {
  acNum: number;
  acRate: string;
  avatar: string;
  company: string;
  createdTime: string;
  description: string;
  email: string;
  id: number;
  name: string;
  school: string;
  sex: number;
  submitNum: number;
  username: string;
}