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
    CREATE_QUEST ({ commit }, payload) {
      // Add to database then get id of that document or something.
      commit('ADD_TASK', {
        name: payload.name,
        desc: payload.desc,
        difficulty: payload.difficulty,
        time: payload.time
      })
      
      const xp: number = payload.difficulty * payload.time
      commit('ADD_QUEST', {
        name: 'Complete task: "' + payload.name + '"',
        id: 'id1',
        exp: xp
      })
    }
  },
  modules: {
  }
})
