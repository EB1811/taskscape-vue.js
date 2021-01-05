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
    id?: string;
    name: string;
    desc?: string;
    difficulty: 1|2|3|4|5|6|7|8;
    time: number;
}
// Format of a quest.
export interface Quest {
    name: string;
    taskId: string;
    expReward: number;
}