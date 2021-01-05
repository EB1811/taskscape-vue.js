import { createStore } from 'vuex'
import { Stats, Task, Quest } from '@/types'

export default createStore({
  state: {
    playerStats: {
      atk: {level: 2, curExp: 150, xpToNext: 150},
      str: {level: 2, curExp: 150, xpToNext: 150},
      def: {level: 2, curExp: 150, xpToNext: 150},
    } as Stats,
    tasks: [] as Task[],
    quests: [] as Quest[]
  },
  mutations: {
    ADD_TASK (state, payload) {
      const task: Task = {
        name: payload.name,
        desc: payload.desc,
        difficulty: payload.difficulty,
        time: payload.time
      }
      state.tasks.push(task)
    },
    ADD_QUEST (state, payload) {
      const quest: Quest = {
        name: payload.name,
        taskId: payload.id,
        expReward: payload.exp
      }
      state.quests.push(quest)
    }
  },
  actions: {
  },
  modules: {
  }
})
