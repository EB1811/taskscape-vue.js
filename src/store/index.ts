import { createStore } from 'vuex'
import { Stats, Task, Quest } from '@/types'
import { db } from '@/firebaseConfig';

const store = createStore({
  state: {
    playerStats: {} as Stats,
    tasks: [] as Task[],
    quests: [] as Quest[]
  },

  getters: {
    getTasks (state) {
      return state.tasks;
    },
    getQuests (state) {
      return state.quests;
    },
    getStats (state) {
      return state.playerStats;
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
    },
    SET_STATS (state, payload) {
      state.playerStats = payload.playerStats
    }
  },

  actions: {
    //* Fetching from firestore.
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
            time: doc.data().time,
            complete: doc.data().complete
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
    // Get player stats from firestore.
    //TODO get doc with user id equal to logged in user id.
    FETCH_SKILLS ({ commit }) {
      db.collection("PlayerStats")
      .get()
      .then((querySnapshot) => {
        let playerStats = {} as Stats;
        querySnapshot.forEach((doc) => {
          playerStats = {
            atk: doc.data().atk,
            str: doc.data().str,
          }
        });

        commit('SET_STATS', { playerStats });
      })
      .catch((error) => {
          console.log("Error getting documents: ", error);
      });
    },


    //* Modifications to firestore
    // Create quest.
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
    },
    // Complete a task.
    FINISH_TASK ({ dispatch }, payload) {
      db.collection('OngoingTasks')
      .doc(payload.taskId)
      .update({
        complete: true
      })
      .then(() => {
        console.log('Success');
        dispatch('FETCH_TASKS');
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })
    }
  },

  modules: {
  }
});

store.dispatch("FETCH_SKILLS");
store.dispatch("FETCH_TASKS");
store.dispatch("FETCH_QUESTS");

export default store;
