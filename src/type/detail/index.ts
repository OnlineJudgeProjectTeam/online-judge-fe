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
