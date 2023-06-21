export interface ProblemRes {
  id: number;
  name: string;
  difficulty: string;
  tags: string;
  timeLimit: number;
  memoryLimit: number;
  description: string;
  template: string[];
  isFavorite: number;
  favorites: number;
  solutions: any;
  status: any;
}

export interface SubmitRes {
  message: string;
  timeCost: string;
  memoryCost: string;
  timeBeat: number;
  memoryBeat: number;
}

export interface Status {
  code: string;
  msg: string;
  language: string;
  isShow: boolean;
  timeCost: string;
  memoryCost: string;
  timeBeat: number;
  memoryBeat: number;
}

export interface SubmitListItem {
  id: number;
  problemId: number;
  userId: number;
  language: number;
  pass: number;
  executionTime: string;
  difficulty: number;
  timeCost: string;
  memoryCost: string;
  problemName: string;
  code: string;
  output: string;
  timeBeat: number;
  memoryBeat: number;
}

export interface SubmitListRes {
  total: number;
  list: SubmitListItem[];
  pageNum: number;
  pageSize: number;
  size: number;
  startRow: number;
  endRow: number;
  pages: number;
  prePage: number;
  nexrPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  navigatePages: number;
  navigatepageNums: number[];
  navigateFirstPage: number;
  navigateLastPage: number;
}

export interface SolutionItem {
  id: number;
  userId: number;
  problemId: number;
  likes: number;
  createdTime: string;
  updatedTime: string;
  language: number;
  isLike: boolean;
  content: string;
  problemName: string;
  avatar: string;
  name: string;
}

export interface SolutionRes {
  total: number;
  list: SolutionItem[];
  pageNum: number;
  pageSize: number;
  size: number;
  startRow: number;
  endRow: number;
  pages: number;
  prePage: number;
  nexrPage: number;
  isFirstPage: boolean;
  isLastPage: boolean;
  hasPreviousPage: boolean;
  hasNextPage: boolean;
  navigatePages: number;
  navigatepageNums: number[];
  navigateFirstPage: number;
  navigateLastPage: number;
}
