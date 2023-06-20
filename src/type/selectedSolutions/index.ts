export interface SolutionsInfo{
  navSize: number;
  pageNum: number;
  pageSize: number;
  problemId?: number;
  userId?: number;
}

export interface Solutions{
  avatar: string;
  content?: string;
  createdTime?: string;
  id?: number;
  isLike?: boolean;
  language?: number;
  likes?: number;
  name: string;
  problemId?: number;
  problemName?: string;
  updatedTime?: string;
  userId?: number;
}

export interface Page{
  /**
     * 结束行
     */
  endRow: number;
  /**
   * 有没有下一页
   */
  hasNextPage: boolean;
  /**
   * 有没有上一页
   */
  hasPreviousPage: boolean;
  /**
   * 是否是第一页
   */
  isFirstPage: boolean;
  /**
   * 是否是最后一页
   */
  isLastPage: boolean;
  /**
   * 数据集
   */
  list: Solutions[];
  /**
   * 导航栏第一页
   */
  navigateFirstPage: number;
  /**
   * 导航栏最后一页
   */
  navigateLastPage: number;
  /**
   * 导航页码
   */
  navigatepageNums: number[];
  /**
   * 导航页个数
   */
  navigatePages: number;
  /**
   * 后一页
   */
  nextPage: number;
  /**
   * 第几页
   */
  pageNum: number;
  /**
   * 总页数
   */
  pages: number;
  /**
   * 一页几条数据
   */
  pageSize: number;
  /**
   * 前一页
   */
  prePage: number;
  /**
   * 数据量
   */
  size: number;
  /**
   * 开始行
   */
  startRow: number;
  /**
   * 总数据量
   */
  total: number;
}
