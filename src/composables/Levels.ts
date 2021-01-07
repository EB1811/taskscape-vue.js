import { Level } from '@/types'

const Levels = [
    {startExp: 0, endExp: 100},
    {startExp: 101, endExp: 300},
    {startExp: 301, endExp: 600},
    {startExp: 601, endExp: 1000},
    {startExp: 1001, endExp: 1500},
]

export const getLevel = (exp: number): Level => {
    const correctLevel: number = Levels.findIndex((level) => {
        ////console.log("Inside filter function: exp parameter = " + exp)
        return (level.endExp > exp)
    })

    ////console.log('Get level function: correctLevel = ' + correctLevel)

    const newLevel = {
        level: correctLevel + 1,
        curExp: exp,
        xpToNext: Levels[correctLevel].endExp - exp
    }

    return newLevel
}