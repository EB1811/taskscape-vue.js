//* Typescript interfaces.
// Level information format.
export interface Level {
    name: string;
    level: number;
    curExp: number;
    xpToNext: number;
}
// Format of Player Stats.
//? Possibly graph stat history.
export interface Stats {
    level: Level; // Total
    productivityL: Level; // How much work done.
    efficiencyL: Level; // How quickly you do the work.
    antiProcrastinationL: Level; // When you finish the work in relation to the due date.
    predictabilityL: Level; // How close your estimated time to complete is to the actual time it took.
    hardWorkerL: Level; // Do low difficulty but time consuming task. OR just time consuming tasks.
    smartWorkerL: Level; // Do high difficulty but quick task. OR just difficult tasks.
    prioritizationL: Level; // How well you prioritize important work. When you finish important tasks while having unimportant tasks to do.
    //? More ideas: Focus - looking at type of tasks, Throughput - how much work (productivity) / how much time (efficiency), questins - looking at how much you complete quests,
}

// Format of a task.
//TODO Add importance and due date.
export interface Task {
    id?: string;
    name: string;
    desc?: string;
    difficulty: 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;
    time: number;
    dueDate?: Date;
    complete: boolean;
}
// Format of a quest.
export interface Quest {
    id?: string;
    name: string;
    taskId: string;
    expReward: number;
    complete: boolean;
    taskDueDate?: Date;
    dateCreated?: Date;
    dateCompleted?: Date;
}
