import { Level } from "@/types";

const Levels = [
    { startExp: 0, endExp: 100 },
    { startExp: 101, endExp: 300 },
    { startExp: 301, endExp: 600 },
    { startExp: 601, endExp: 1000 },
    { startExp: 1001, endExp: 1500 },
    { startExp: 1501, endExp: 2200 },
    { startExp: 2201, endExp: 3000 },
    { startExp: 3001, endExp: 4500 },
    { startExp: 4501, endExp: 7000 },
    { startExp: 7001, endExp: 10000 },
];

export const getLevel = (exp: number, levelName: string): Level => {
    const correctLevel: number = Levels.findIndex((level) => {
        ////console.log("Inside filter function: exp parameter = " + exp)
        return level.endExp > exp;
    });
    ////console.log('Get level function: correctLevel = ' + correctLevel)

    const newLevel = {
        name: levelName,
        level: correctLevel === -1 ? 10 : correctLevel + 1,
        curExp: exp,
        xpToNext: Levels[correctLevel] ? Levels[correctLevel].endExp - exp : 0,
    };

    return newLevel;
};
