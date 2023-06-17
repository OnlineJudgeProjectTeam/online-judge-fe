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
}
