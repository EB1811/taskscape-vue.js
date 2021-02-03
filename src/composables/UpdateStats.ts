import { Stats, Quest, Task } from "@/types";
import { getLevel } from "@/composables/Levels";
import moment, { Moment } from "moment";

export const UpdateStats = (
    finishedQuest: Quest,
    finishedTask: Task,
    currentStats: Stats
): Stats => {
    // Helpers
    const dateCompleted: Date = new Date();
    const completedMinusCreated: number = dateDiffInDays(
        dateCompleted,
        finishedQuest.dateCreated
    );

    //* Exp amounts for each level.
    // Productivity
    const productivityExp: number = finishedQuest.expReward;
    // Efficiency
    let efficiencyExp: number = 100;
    if (finishedQuest.dateCreated) {
        efficiencyExp =
            completedMinusCreated > 0
                ? 100 - completedMinusCreated * 5 > 0
                    ? 100 - completedMinusCreated * 5
                    : 100 / completedMinusCreated
                : 100;
    }
    // Anti-Procrastination: date created - date due is a scale that date completed falls into.
    let antiProcrastinationExp: number = 0;
    if (finishedTask.dueDate) {
        const dueMinusCompleted = dateDiffInDays(
            finishedTask.dueDate,
            dateCompleted
        );
        const dueMinusCreated = dateDiffInDays(
            finishedTask.dueDate,
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
    const predictabilityExp =
        100 - 5 * Math.abs(completedMinusCreated - finishedTask.time) > 0
            ? 100 - 5 * Math.abs(completedMinusCreated - finishedTask.time)
            : 0;
    // Hard Worker
    const hardWorkerExp =
        finishedTask.difficulty < 5
            ? finishedTask.difficulty *
                  (completedMinusCreated / (6 - finishedTask.difficulty)) <
              100
                ? finishedTask.difficulty *
                  (completedMinusCreated / (6 - finishedTask.difficulty))
                : 100
            : 0;
    // Smart Worker
    const smartWorkerExp =
        finishedTask.difficulty > 4
            ? finishedTask.difficulty *
                  (13 - completedMinusCreated / finishedTask.difficulty) >
              0
                ? finishedTask.difficulty *
                  (13 - completedMinusCreated / finishedTask.difficulty)
                : 0
            : 0;
    //TODO Prioritization, add importance to task interface.

    //* Build new stats.
    const newStats: Stats = {
        level: getLevel(
            currentStats.level.curExp + finishedQuest.expReward,
            currentStats.level.name
        ),
        productivityL: getLevel(
            currentStats.productivityL.curExp + productivityExp,
            currentStats.productivityL.name
        ),
        efficiencyL: getLevel(
            currentStats.efficiencyL.curExp + efficiencyExp,
            currentStats.efficiencyL.name
        ),
        antiProcrastinationL: getLevel(
            currentStats.antiProcrastinationL.curExp + antiProcrastinationExp,
            currentStats.antiProcrastinationL.name
        ),
        predictabilityL: getLevel(
            currentStats.predictabilityL.curExp + predictabilityExp,
            currentStats.predictabilityL.name
        ),
        hardWorkerL: getLevel(
            currentStats.hardWorkerL.curExp + hardWorkerExp,
            currentStats.hardWorkerL.name
        ),
        smartWorkerL: getLevel(
            currentStats.smartWorkerL.curExp + smartWorkerExp,
            currentStats.smartWorkerL.name
        ),
        prioritizationL: getLevel(0, currentStats.prioritizationL?.name),
    };

    return newStats;
};

// Helper Methods
const dateDiffInDays = (dateA: Date, dateB: Date): number => {
    const momentDateA = moment(dateA);
    const momentDateB = moment(dateB);
    console.log(momentDateB.diff(momentDateA, "hours"));

    return momentDateB.diff(momentDateA, "hours");
};
