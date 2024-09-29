interface People {
  name: string;
  age: number;
  skills: string[];
}

export interface DataAdapter {
  userId: number | string;
  id: number | string;
  title: string;
  completed: boolean;
  name?: string;
  datePicker?: string;
  peoples?: People[];
}