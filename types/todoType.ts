export type responseType = {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  description?: string;
};

export type todoType = {
  id: number;
  title: string;
  description: string;
};
