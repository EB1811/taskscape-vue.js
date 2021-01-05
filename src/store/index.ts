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
    },
    getQuests (state) {
      return state.quests;
    }
  },

  mutations: {
    ADD_TASK (state, payload) {
      if(payload.tasks.length < 100) {
        state.tasks = payload.tasks
      }
    },
    ADD_QUEST (state, payload) {
      if(payload.quests.length < 100) {
        state.quests = payload.quests
      }
    }
  },

  actions: {
    // Get tasks from firestore.
    FETCH_TASKS ({ commit }) {
      db.collection("OngoingTasks")
      .get()
      .then((querySnapshot) => {
        const tasks: Task[] = [];
        querySnapshot.forEach((doc) => {
          tasks.push({
            id: doc.id,
            name: doc.data().name,
            desc: doc.data().description,
            difficulty: doc.data().difficulty,
            time: doc.data().time
          })
        });

        commit('ADD_TASK', { tasks });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },
    // Get quests from firestore.
    FETCH_QUESTS ({ commit }) {
      db.collection("OngoingQuests")
      .get()
      .then((querySnapshot) => {
        const quests: Quest[] = [];
        querySnapshot.forEach((doc) => {
          quests.push({
            id: doc.id,
            name: doc.data().name,
            taskId: doc.data().taskId,
            expReward: doc.data().expReward
          })

          commit('ADD_QUEST', { quests });
        });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },

    CREATE_QUEST ({ dispatch }, payload) {
      // Add task.
      let newTaskId = '';
      db.collection("OngoingTasks")
      .add({
        name: payload.name,
        desc: payload.desc,
        difficulty: payload.difficulty,
        time: payload.time,
        dataCreated: new Date()
      })
      .then((docRef) => {
          console.log("Document successfully written!");
          newTaskId = docRef.id;
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        ////console.log("DEMO website: rants are not being added to the database");
      }).then(() => {

      // Then add quest.
      db.collection("OngoingQuests")
      .add({
        name: 'Complete task: "' + payload.name + '"',
        desc: payload.desc,
        taskId: newTaskId,
        expReward: payload.difficulty * payload.time,
        dataCreated: new Date()
      })
      .then(() => {
        console.log("Document successfully written!");
      })
      .catch((error) => {
        console.error("Error writing document: ", error);
        ////console.log("DEMO website: rants are not being added to the database");
      })
      })
      .then(() => {
      // Then update state.
      dispatch("FETCH_TASKS");
      dispatch("FETCH_QUESTS");
      })
    }
  },

  modules: {
  }
});

store.dispatch("FETCH_TASKS");
store.dispatch("FETCH_QUESTS");

export default store;
