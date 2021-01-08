//* Typescript interfaces.
// Level information format.
export interface Level {
    level: number;
    curExp: number;
    xpToNext: number;
}
// Format of Player Stats.
export interface Stats {
    level: Level;
    atk?: Level;
    str?: Level;
    def?: Level;
}
  
// Format of a task.
export interface Task {
    id?: string;
    name: string;
    desc?: string;
    difficulty: 1|2|3|4|5|6|7|8;
    time: number;
    complete: boolean;
}
// Format of a quest.
export interface Quest {
    id?: string;
    name: string;
    taskId: string;
    expReward: number;
    complete: boolean;
}