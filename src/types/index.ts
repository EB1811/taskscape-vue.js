//* Typescript interfaces.
// Level information format.
export interface Level {
    level: number;
    curExp: number;
    xpToNext: number;
}
// Format of Player Stats.
export interface Stats {
    atk: Level;
    str: Level;
    def: Level;
}
  
// Format of a task.
export interface Task {
    name: string;
    desc?: string;
    difficulty: 1|2|3|4|5|6|7|8;
    time: number;
}