import { createStore } from 'vuex'
import { Stats, Task, Quest, Level } from '@/types'
import { db } from '@/firebaseConfig';
import { getLevel } from '@/composables/Levels'
import firebase from 'firebase';

const store = createStore({
  state: {
    playerStats: {} as Stats,
    tasks: [] as Task[],
    quests: [] as Quest[],
    user: {
      loggedIn: false,
      data: null
    }
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
    },
    getUser (state) {
      return state.user
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
    },

    // Clear data from state.
    CLEAR_STATE (state) {
      state.tasks = [] as Task[]
      state.quests = [] as Quest[] 
      state.playerStats = {} as Stats
    },

    // Auth
    SET_LOGGED_IN(state, value) {
      state.user.loggedIn = value;
    },
    SET_USER(state, data) {
      state.user.data = data;
    }
  },

  actions: {
    //* Authentication actions.
    CREATE_ACCOUNT ({dispatch}, payload) {
      firebase.auth()
      .createUserWithEmailAndPassword(payload.email, payload.password)
      .then((userObject) => {
        console.log("Registration success")

        // Then create a player with using the user id.
        dispatch('CREATE_PLAYER', { uId: userObject.user?.uid })
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    },
    LOGIN (state, payload) {
      firebase.auth()
      .signInWithEmailAndPassword(payload.email, payload.password)
      .then(() => {
        console.log("Login success")
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    },
    LOGOUT () {
      firebase.auth()
      .signOut()
      .then(() => {
        console.log("Logout success")
      })
      .catch((error) => {
        console.log("Error: ", error);
      });
    },
    FETCH_AUTH_STATUS({ commit, dispatch }, user) {
      commit("SET_LOGGED_IN", user !== null);
      if (user) {
        commit("SET_USER", {
          email: user.email,
          userId: user.uid
        });
      } else {
        commit("SET_USER", null);
      }

      // Fetch all data belonging to user (using user id)
      dispatch('FETCH_SKILLS')
      dispatch("FETCH_TASKS");
      dispatch("FETCH_QUESTS");
    },


    // Player actions
    CREATE_PLAYER ({ dispatch }, payload) {
      const newPlayerLevel: Level = getLevel(0);

      db.collection("PlayerStats")
      .doc(payload.uId)
      .set({
        atk: newPlayerLevel,
        str: newPlayerLevel,
        def: newPlayerLevel,
      })
      .then(() => {
          dispatch('FETCH_SKILLS')
          console.log("Player successfully created.");
      })
      .catch((error) => {
        console.error("Error creating player: ", error);
      })
    },


    //* Fetching from firestore.
    // Get tasks from firestore.
    FETCH_TASKS ({ commit, getters  }) {
      if(getters.getUser.loggedIn) {

        console.log("Logged in. Fetching tasks")
        db.collection("OngoingTasks")
        .where('owner', '==', getters.getUser.data.userId)
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
          console.log("Fetching tasks success")
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
      } else {
        commit('CLEAR_STATE');
      }
    },
    // Get quests from firestore.
    FETCH_QUESTS ({ commit, getters  }) {
      if(getters.getUser.loggedIn) {

        console.log("Logged in. Fetching quests")
        db.collection("OngoingQuests")
        .where('owner', '==', getters.getUser.data.userId)
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
            console.log("Fetching quests success")
          });
        })
        .catch((error) => {
            console.log("Error getting documents: ", error);
        });
      } else {
        commit('CLEAR_STATE');
      }
    },
    // Get player stats from firestore.
    FETCH_SKILLS ({ commit, getters }) {
      ////console.log('FETCH SKILLS Method: data:' + (getters.getUser.loggedIn))
      if(getters.getUser.loggedIn) {

        console.log("Logged in. Fetching Skills")
        db.collection("PlayerStats")
        .doc(getters.getUser.data.userId)
        .get()
        .then((doc) => {
          let playerStats = {} as Stats;
          const playerData = doc.data();
          if(playerData) {
            playerStats = {
              atk: playerData.atk,
              str: playerData.str,
            }

            commit('SET_STATS', { playerStats });

            console.log("Fetching skills success")
          }
        })
        .catch((error) => {
          console.log("Error getting documents: ", error);
        });
      } else {
        commit('CLEAR_STATE');
      }
    },


    //* Modifications to firestore
    // Create quest.
    CREATE_QUEST ({ dispatch, getters }, payload) {
      if(getters.getUser.loggedIn) {
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
          owner: getters.getUser.data.userId
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
          dataCreated: new Date(),
          owner: getters.getUser.data.userId
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
    FINISH_QUEST ({ dispatch, commit, getters }, payload) {
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

      // Firestore.
      if(this.state.user != null) {
        db.collection('PlayerStats')
        .doc(getters.getUser.data.userId)
        .update({
          //TODO Relevant stats will be updated (currently xp reward is just a number)
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
    }
  },

  modules: {
  }
});

firebase.auth().onAuthStateChanged(user => {
  store.dispatch("FETCH_AUTH_STATUS", user);
});

export default store;
