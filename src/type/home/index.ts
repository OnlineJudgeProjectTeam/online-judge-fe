interface ProblemRes{
  id: number,
  name: string,
  difficulty: string,
  tags: string[],
  timeLimit:number,
  memoryLimit:number,
  favorite: number,
  isFavorite:number,
  solutions:number,
  status:number
}

interface PageInfo{
  total:number,
  list: ProblemRes[],
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

interface ProblemInfo{
  pageNum: number,
  pageSize: number,
  navSize: number,
  name?: string,
  tags?: string,
  difficulty?: string 
}