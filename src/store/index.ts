import { createStore } from 'vuex'
import { Stats, Task } from '@/types'

export default createStore({
  state: {
    playerStats: {
      atk: 1,
      str: 1,
      def: 1,
    } as Stats,
    tasks: [] as Task[]
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
