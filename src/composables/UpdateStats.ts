import { Level, Stats, Quest } from "@/types";
import { getLevel } from "@/composables/Levels";
import moment, { Moment } from "moment";

export const UpdateStats = (
    finishedQuest: Quest,
    currentStats: Stats
): Stats => {
    // Helpers
    const dateCompleted = new Date();

    //* Exp amounts for each level.
    // Productivity
    const productivityExp: number = finishedQuest.expReward;
    // Efficiency
    let efficiencyExp: number = 100;
    if (finishedQuest.dateCreated) {
        const completedMinusCreated = dateDiffInDays(
            dateCompleted,
            finishedQuest.dateCreated
        );
        efficiencyExp =
            completedMinusCreated > 0
                ? 100 - completedMinusCreated * 5 > 0
                    ? 100 - completedMinusCreated * 5
                    : 100 / completedMinusCreated
                : 100;
    }
    // Anti-Procrastination: date created - date due is a scale that date completed falls into.
    let antiProcrastinationExp: number = 0;
    if (finishedQuest.taskDueDate && finishedQuest.dateCreated) {
        const dueMinusCompleted = dateDiffInDays(
            finishedQuest.taskDueDate,
            dateCompleted
        );
        const dueMinusCreated = dateDiffInDays(
            finishedQuest.taskDueDate,
            finishedQuest.dateCreated
        );
        if (dueMinusCreated > 0) {
            antiProcrastinationExp =
                dueMinusCompleted > 0
                    ? (dueMinusCompleted / dueMinusCreated) * 100
                    : 0;
        }
    }
    // Predictability

    // Hard Worker

    // Smart Worker

    // Prioritization

    //* Build new stats.
    const newStats: Stats = {
        level: getLevel(
            currentStats.level.curExp + finishedQuest.expReward,
            currentStats.level.name
        ),
        productivityL: getLevel(
            productivityExp,
            currentStats.productivityL.name
        ),
        efficiencyL: getLevel(efficiencyExp, currentStats.efficiencyL.name),
        antiProcrastinationL: getLevel(
            antiProcrastinationExp,
            currentStats.antiProcrastinationL.name
        ),
    };

    return newStats;
};

/*
level: Level; // Total
productivityL: Level; // How much work done.
efficiencyL: Level; // How quickly you do the work.
antiProcrastinationL: Level; // When you finish the work in relation to the due date.
predictabilityL: Level; // How close your estimated time to complete is to the actual time it took.
hardWorkerL: Level; // Do low difficulty but time consuming task. OR just time consuming tasks.
smartWorkerL: Level; // Do high difficulty but quick task. OR just difficult tasks.
prioritizationL: Level; // How well you prioritize important work. When you finish important tasks while having unimportant tasks to do.
*/
const dateDiffInDays = (dateA: Date, dateB: Date): number => {
    const momentDateA = moment(dateA);
    const momentDateB = moment(dateB);
    console.log(momentDateB.diff(momentDateA, "hours"));

    return momentDateB.diff(momentDateA, "hours");
};
