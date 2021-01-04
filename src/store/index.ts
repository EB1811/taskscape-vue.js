import { createStore } from 'vuex'
import { Stats, Task } from '@/types'

export default createStore({
  state: {
    playerStats: {
      atk: {level: 2, curExp: 150, xpToNext: 150},
      str: {level: 2, curExp: 150, xpToNext: 150},
      def: {level: 2, curExp: 150, xpToNext: 150},
    } as Stats,
    tasks: [] as Task[],
    quests: []
  },
  mutations: {
    ADD_TASK (state, payload) {
      const task = {
        name: payload.name,
        desc: payload.desc,
        difficulty: payload.difficulty,
        time: payload.time
      }
      state.tasks.push(task)
    }
  },
  actions: {
  },
  modules: {
  }
})
