import { createStore } from 'vuex'
import { Stats, Task, Quest } from '@/types'
import { db } from '@/firebaseConfig';

const store = createStore({
  state: {
    playerStats: {
      atk: {level: 2, curExp: 150, xpToNext: 150},
      str: {level: 2, curExp: 150, xpToNext: 150},
      def: {level: 2, curExp: 150, xpToNext: 150},
    } as Stats,
    tasks: [] as Task[],
    quests: [] as Quest[]
  },

  getters: {
    getTasks (state) {
      return state.tasks;
  }
  },

  mutations: {
    ADD_TASK (state, payload) {
      const task: Task = {
        name: payload.name,
        desc: payload.desc,
        difficulty: payload.difficulty,
        time: payload.time
      }
      if(state.tasks.length < 100) {
        state.tasks.push(task)
      }
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
    // Get tasks from firestore.
    FETCH_TASKS ({ commit }) {
      db.collection("OngoingTasks")
      .get()
      .then((querySnapshot) => {
        
        querySnapshot.forEach((doc) => {
           {
            commit('ADD_TASK', {
                id: doc.id,
                name: doc.data().name,
                desc: doc.data().description,
                difficulty: doc.data().difficulty,
                time: doc.data().time
            });
          }
        });

      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },

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
});

store.dispatch("FETCH_TASKS");

export default store;
