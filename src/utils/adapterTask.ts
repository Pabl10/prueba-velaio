import { DataAdapter } from "src/models/data-adapter.model";
import { Task } from "src/models/task.model";


/**
 * 
 * @param data data
 * @returns data
 */
export const AdapterTask = (dataPlaceholder: Task[], tasks: any): DataAdapter[] => {
  let data: DataAdapter[] = dataPlaceholder.map(user => ({...user, peoples: []}));
  data = [...tasks, ...data].slice(0, 5);
  return data;
}