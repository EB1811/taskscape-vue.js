//* Typescript interfaces.
// Format of Player Stats.
export interface Stats {
    atk: number;
    str: number;
    def: number;
}
  
// Format of a task.
export interface Task {
    name: string;
    desc?: string;
    difficulty: 1|2|3|4|5|6|7|8;
    length: number;
}