import { createStore } from 'vuex'
import { Stats, Task, Quest } from '@/types'
import { db } from '@/firebaseConfig';
import { getLevel } from '@/composables/Levels'

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
            expReward: doc.data().expReward,
            complete: doc.data().complete
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
        complete: false,
        dataCreated: new Date(),
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
        complete: false,
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
      //TODO update state first.

      // Complete task.
      db.collection('OngoingTasks')
      .doc(payload.finishedTaskId)
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
      .then(() => {
        // Then check if a quest is now complete. Dispatch if it is.
        db.collection('OngoingQuests')
        .get()
        .then((querySnapshot) => {
          let finishedQuestId = '';
          querySnapshot.forEach((doc) => {
            if(doc.data().taskId == payload.finishedTaskId) {
              finishedQuestId = doc.id;
            }
          })

          dispatch('FINISH_QUEST', {
            finishedQuestId: finishedQuestId
          });
        })
        .catch((error) => {
          console.error("Error reading document: ", error);
          ////console.log("DEMO website: rants are not being added to the database");
        })
      })
    },
    // Complete a quest.
    FINISH_QUEST ({ dispatch, commit }, payload) {
      //TODO update state first.

      // Complete quest.
      db.collection('OngoingQuests')
      .doc(payload.finishedQuestId)
      .update({
        complete: true
      })
      .then(() => {
        console.log('Success');
        dispatch('FETCH_QUESTS');
      })
      .catch((error) => {
        console.error("Error updating document: ", error);
      })

      // Then update player stats. In state first.
      const expReward: number = this.state.quests.filter((quest) => {
        return quest.id === payload.finishedQuestId
      })[0].expReward
      const newStats: Stats = {
        atk: getLevel(this.state.playerStats.atk.curExp + expReward),
        str: getLevel(this.state.playerStats.str.curExp + expReward)
      }

      // Commit to state.
      const playerStats = newStats
      commit('SET_STATS', { playerStats })

      console.log('Line 227: expReward = ' + expReward.toString + ', newStats.curAtkXp: ' + newStats.atk.curExp.toString + ', state stats: ' + this.state.playerStats.atk.level.toString)

      // Firestore.
      db.collection('PlayerStats')
      //! doc will be based on player login id.
      .doc('nAmU1YGRYmYTbxTBLNs6')
      .update({
        //! Relevant stats will be updated (currently xp reward is just a number)
        atk: newStats.atk,
        str: newStats.str
      })
      .then(() => {
        dispatch("FETCH_SKILLS");
      })
      .catch((error) => {
        console.error("Error: ", error);
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
