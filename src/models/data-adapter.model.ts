interface People {
  name: string;
  age: number;
  skills: string[];
}

export interface DataAdapter {
  userId: number;
  id: number;
  title: string;
  completed: boolean;
  name?: string;
  datePicker?: string;
  peoples?: People[];
}