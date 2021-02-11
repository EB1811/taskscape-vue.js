import { Stats, Quest, Task } from "@/types";
import { getLevel } from "@/composables/Levels";
import moment from "moment";

// Helper Methods
const dateDiffInHours = (dateA: Date, dateB: Date): number => {
    const momentDateA = moment(dateA);
    const momentDateB = moment(dateB);
    return momentDateA.diff(momentDateB, "hours");
};
const dateDiffInDays = (dateA: Date, dateB: Date): number => {
    const momentDateA = moment(dateA);
    const momentDateB = moment(dateB);
    return momentDateA.diff(momentDateB, "days");
};

export const UpdateStats = (
    finishedQuest: Quest,
    finishedTask: Task,
    currentStats: Stats
): Stats => {
    // Helpers
    const dateCompleted: Date = new Date();

    const completedMinusCreated: number = dateDiffInHours(
        dateCompleted,
        finishedQuest.dateCreated
    );
    ////console.log("completedMinusCreated: " + completedMinusCreated);

    //* Exp amounts for each level.
    // Productivity
    const productivityExp: number = finishedQuest.expReward;
    // Efficiency
    console.log("Completed - created = " + completedMinusCreated);
    const efficiencyExp =
        completedMinusCreated > 0
            ? 100 - completedMinusCreated * 5 > 0
                ? 100 - completedMinusCreated * 5
                : 100 / completedMinusCreated
            : 100;
    // Anti-Procrastination: date created - date due is a scale that date completed falls into.
    let antiProcrastinationExp = 0;
    if (finishedTask.dueDate) {
        const dueMinusCompleted = dateDiffInDays(
            finishedTask.dueDate,
            dateCompleted
        );
        const dueMinusCreated = dateDiffInDays(
            finishedTask.dueDate,
            finishedQuest.dateCreated
        );
        console.log("dueMinusCompleted: " + dueMinusCompleted);
        console.log("dueMinusCreated: " + dueMinusCreated);
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
        finishedTask.difficulty < 4
            ? finishedTask.difficulty *
                  (completedMinusCreated / (4 - finishedTask.difficulty)) <
              100
                ? finishedTask.difficulty *
                  (completedMinusCreated / (4 - finishedTask.difficulty))
                : 100
            : 0;
    // Smart Worker
    const smartWorkerExp =
        finishedTask.difficulty > 3
            ? finishedTask.difficulty *
                  (17 -
                      (completedMinusCreated * 10 + 2) /
                          finishedTask.difficulty) >
              0
                ? finishedTask.difficulty *
                  (17 -
                      (completedMinusCreated * 10 + 2) /
                          finishedTask.difficulty)
                : 0
            : 0;
    //TODO Prioritization, add importance to task interface.

    console.log(
        "prod to smart xp order: " + productivityExp,
        +" " + efficiencyExp,
        +" " + antiProcrastinationExp,
        +" " + predictabilityExp,
        +" " + hardWorkerExp,
        +" " + smartWorkerExp
    );

    //* Build new stats.
    const newStats: Stats = {
        level: getLevel(
            Math.round(currentStats.level.curExp + finishedQuest.expReward),
            currentStats.level.name
        ),
        productivityL: getLevel(
            Math.round(currentStats.productivityL.curExp + productivityExp),
            currentStats.productivityL.name
        ),
        efficiencyL: getLevel(
            Math.round(currentStats.efficiencyL.curExp + efficiencyExp),
            currentStats.efficiencyL.name
        ),
        antiProcrastinationL: getLevel(
            Math.round(
                currentStats.antiProcrastinationL.curExp +
                    antiProcrastinationExp
            ),
            currentStats.antiProcrastinationL.name
        ),
        predictabilityL: getLevel(
            Math.round(currentStats.predictabilityL.curExp + predictabilityExp),
            currentStats.predictabilityL.name
        ),
        hardWorkerL: getLevel(
            Math.round(currentStats.hardWorkerL.curExp + hardWorkerExp),
            currentStats.hardWorkerL.name
        ),
        smartWorkerL: getLevel(
            Math.round(currentStats.smartWorkerL.curExp + smartWorkerExp),
            currentStats.smartWorkerL.name
        ),
        prioritizationL: getLevel(0, currentStats.prioritizationL?.name),
    };

    return newStats;
};
