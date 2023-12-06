export interface Task {
  id: number;
  title: string;
  price: number;
  description: string;
  creationTime: string;
  startDate: string | null;
  endDate: string | null;
  userId: string;
  acceptedByUserId: string | null;
  category: number;
  image: string;
  completed: boolean;
}
