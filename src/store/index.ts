import { createStore } from "vuex";
import { Stats, Task, Quest } from "@/types";
import { db } from "@/firebaseConfig";
import { getLevel } from "@/composables/Levels";
import { UpdateStats } from "@/composables/UpdateStats";
import firebase from "firebase";

const store = createStore({
    state: {
        playerStats: {} as Stats,
        tasks: [] as Task[],
        quests: [] as Quest[],
        user: {
            loggedIn: null,
            data: null,
        },
    },

    getters: {
        //TODO get all ongoing and completed quests / tasks.
        //TODO get top x ongoing quests / tasks.
        getTasks(state) {
            return state.tasks;
        },
        getOngoingTasks(state) {
            return state.tasks.filter((task) => !task.complete);
        },
        getCompletedTasks(state) {
            return state.tasks.filter((task) => task.complete);
        },
        getQuests(state) {
            return state.quests;
        },
        getOngoingQuests(state) {
            return state.quests.filter((quests) => !quests.complete);
        },
        getCompletedQuests(state) {
            return state.quests.filter((quests) => quests.complete);
        },
        getStats(state) {
            return state.playerStats;
        },
        getUser(state) {
            return state.user;
        },
    },

    mutations: {
        ADD_TASK(state, payload) {
            if (payload.tasks.length < 100) {
                state.tasks = payload.tasks;
            }
        },
        ADD_QUEST(state, payload) {
            if (payload.quests.length < 100) {
                state.quests = payload.quests;
            }
        },
        SET_STATS(state, payload) {
            state.playerStats = payload.playerStats;
        },

        // Clear data from state.
        CLEAR_STATE(state) {
            state.tasks = [] as Task[];
            state.quests = [] as Quest[];
            state.playerStats = {} as Stats;
        },

        // Auth
        SET_LOGGED_IN(state, value) {
            state.user.loggedIn = value;
        },
        SET_USER(state, data) {
            state.user.data = data;
        },
    },

    actions: {
        //* Authentication actions.
        CREATE_ACCOUNT({ dispatch }, payload) {
            return new Promise((resolve, reject) => {
                firebase
                    .auth()
                    .createUserWithEmailAndPassword(
                        payload.email,
                        payload.password
                    )
                    .then((userObject) => {
                        console.log("Registration success");
                        // Then create a player with using the user id.
                        dispatch("CREATE_PLAYER", {
                            uId: userObject.user?.uid,
                        });
                        resolve("Success");
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                        reject;
                    });
            });
        },
        LOGIN(state, payload) {
            return new Promise((resolve, reject) => {
                firebase
                    .auth()
                    .signInWithEmailAndPassword(payload.email, payload.password)
                    .then(() => {
                        console.log("Login success");
                        resolve("Success");
                    })
                    .catch((error) => {
                        console.log("Error: ", error);
                        reject;
                    });
            });
        },
        LOGOUT() {
            firebase
                .auth()
                .signOut()
                .then(() => {
                    console.log("Logout success");
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
                    userId: user.uid,
                });
            } else {
                commit("SET_USER", null);
            }

            // Fetch all data belonging to user (using user id)
            dispatch("FETCH_SKILLS");
            dispatch("FETCH_TASKS");
            dispatch("FETCH_QUESTS");
        },

        //* Player actions
        CREATE_PLAYER({ dispatch }, payload) {
            const newStats: Stats = {
                level: getLevel(0, "Total Level"),
                productivityL: getLevel(0, "Productivity"),
                efficiencyL: getLevel(0, "Efficiency"),
                antiProcrastinationL: getLevel(0, "Anti-Procrastination"),
                predictabilityL: getLevel(0, "Predictability"),
                prioritizationL: getLevel(0, "Prioritization"),
                hardWorkerL: getLevel(0, "Hard Worker"),
                smartWorkerL: getLevel(0, "Smart Worker"),
            };

            db.collection("PlayerStats")
                .doc(payload.uId)
                .set({
                    stats: newStats,
                })
                .then(() => {
                    dispatch("FETCH_SKILLS");
                    console.log("Player successfully created.");
                })
                .catch((error) => {
                    console.error("Error creating player: ", error);
                });
        },

        //* Fetching from firestore.
        //TODO Fetch in some order.
        // Get tasks from firestore.
        FETCH_TASKS({ commit, getters }) {
            if (getters.getUser.loggedIn) {
                console.log("Logged in. Fetching tasks");
                db.collection("OngoingTasks")
                    .where("owner", "==", getters.getUser.data.userId)
                    .get()
                    .then((querySnapshot) => {
                        const tasks: Task[] = [];
                        querySnapshot.forEach((doc) => {
                            doc.data().dueDate
                                ? tasks.push({
                                      id: doc.id,
                                      name: doc.data().name,
                                      desc: doc.data().description,
                                      difficulty: doc.data().difficulty,
                                      time: doc.data().time,
                                      complete: doc.data().complete,
                                      dueDate: doc.data().dueDate.toDate(),
                                  })
                                : tasks.push({
                                      id: doc.id,
                                      name: doc.data().name,
                                      desc: doc.data().description,
                                      difficulty: doc.data().difficulty,
                                      time: doc.data().time,
                                      complete: doc.data().complete,
                                  });
                        });

                        commit("ADD_TASK", { tasks });
                        console.log("Fetching tasks success");
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            } else {
                commit("CLEAR_STATE");
            }
        },
        // Get quests from firestore.
        FETCH_QUESTS({ commit, getters }) {
            if (getters.getUser.loggedIn) {
                console.log("Logged in. Fetching quests");
                db.collection("OngoingQuests")
                    .where("owner", "==", getters.getUser.data.userId)
                    .get()
                    .then((querySnapshot) => {
                        const quests: Quest[] = [];
                        querySnapshot.forEach((doc) => {
                            quests.push({
                                id: doc.id,
                                name: doc.data().name,
                                taskId: doc.data().taskId,
                                expReward: doc.data().expReward,
                                complete: doc.data().complete,
                                dateCreated: doc.data().dateCreated.toDate(),
                            });
                        });

                        commit("ADD_QUEST", { quests });
                        console.log("Fetching quests success");
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            } else {
                commit("CLEAR_STATE");
            }
        },
        // Get player stats from firestore.
        FETCH_SKILLS({ commit, getters }) {
            ////console.log('FETCH SKILLS Method: data:' + (getters.getUser.loggedIn))
            if (getters.getUser.loggedIn) {
                console.log("Logged in. Fetching Skills");
                db.collection("PlayerStats")
                    .doc(getters.getUser.data.userId)
                    .get()
                    .then((doc) => {
                        let playerStats = {} as Stats;
                        const playerData = doc.data();
                        if (playerData) {
                            playerStats = playerData.stats;

                            commit("SET_STATS", { playerStats });
                            console.log("Fetching skills success");
                        }
                    })
                    .catch((error) => {
                        console.log("Error getting documents: ", error);
                    });
            } else {
                commit("CLEAR_STATE");
            }
        },

        //* Modifications to firestore
        // Create quest.
        CREATE_QUEST({ dispatch, commit, getters }, payload) {
            if (getters.getUser.loggedIn) {
                // Add to state first.
                const tasks: Task[] = [];
                tasks.push({
                    name: payload.name,
                    desc: payload.desc,
                    difficulty: payload.difficulty,
                    time: payload.time,
                    dueDate: payload.dueDate ? payload.dueDate : null,
                    complete: false,
                });
                commit("ADD_TASK", { tasks });

                // Add task to firestore.
                let newTaskId = "";
                db.collection("OngoingTasks")
                    .add(
                        payload.dueDate
                            ? {
                                  name: payload.name,
                                  desc: payload.desc,
                                  difficulty: payload.difficulty,
                                  time: payload.time,
                                  complete: false,
                                  dueDate: payload.dueDate,
                                  dateCreated: new Date(),
                                  owner: getters.getUser.data.userId,
                              }
                            : {
                                  name: payload.name,
                                  desc: payload.desc,
                                  difficulty: payload.difficulty,
                                  time: payload.time,
                                  complete: false,
                                  dateCreated: new Date(),
                                  owner: getters.getUser.data.userId,
                              }
                    )
                    .then((docRef) => {
                        console.log("Document successfully written!");
                        newTaskId = docRef.id;
                    })
                    .catch((error) => {
                        console.error("Error writing document: ", error);
                        ////console.log("DEMO website: rants are not being added to the database");
                    })
                    .then(() => {
                        // Then add quest.
                        // Add to state first.
                        const quests: Quest[] = [];
                        quests.push({
                            name: 'Complete task: "' + payload.name + '"',
                            taskId: newTaskId,
                            expReward: payload.difficulty * payload.time,
                            complete: false,
                            dateCreated: new Date(),
                        });
                        commit("ADD_QUEST", { quests });

                        // Add quest to firebase.
                        //TODO Create calculateQuestReward method which creates a object with specific level rewards.
                        //TODO Update FINISH_QUEST accordingly.
                        //TODO expReward: { atk: 20, str: 10, def: 0 }
                        db.collection("OngoingQuests")
                            .add({
                                name: 'Complete task: "' + payload.name + '"',
                                taskId: newTaskId,
                                expReward: payload.difficulty * payload.time,
                                complete: false,
                                dateCreated: new Date(),
                                owner: getters.getUser.data.userId,
                            })
                            .then(() => {
                                console.log("Document successfully written!");
                            })
                            .catch((error) => {
                                console.error(
                                    "Error writing document: ",
                                    error
                                );
                                ////console.log("DEMO website: rants are not being added to the database");
                            });
                    })
                    .then(() => {
                        // Then update state.
                        dispatch("FETCH_TASKS");
                        dispatch("FETCH_QUESTS");
                    });
            }
        },
        // Complete a task.
        FINISH_TASK({ dispatch }, payload) {
            //TODO update state first.

            // Complete task.
            db.collection("OngoingTasks")
                .doc(payload.finishedTaskId)
                .update({
                    complete: true,
                })
                .then(() => {
                    console.log("Task update success");
                    dispatch("FETCH_TASKS");
                    dispatch("FINISH_QUEST", {
                        taskId: payload.finishedTaskId,
                    });
                })
                .catch((error) => {
                    console.error("Error: ", error);
                    ////console.log("DEMO website: rants are not being added to the database");
                });
        },
        DELETE_TASK({ dispatch }, payload) {
            //TODO update state first.

            // Delete task.
            db.collection("OngoingTasks")
                .doc(payload.deletedTaskId)
                .delete()
                .then(() => {
                    console.log("Task deletion success");
                    dispatch("FETCH_TASKS");
                    dispatch("DELETE_QUEST", {
                        taskId: payload.deletedTaskId,
                    });
                })
                .catch((error) => {
                    console.error("Error: ", error);
                    ////console.log("DEMO website: rants are not being added to the database");
                });
        },
        // Complete a quest.
        FINISH_QUEST({ dispatch, commit, getters }, payload) {
            //TODO update state first.
            // Complete quest.
            db.collection("OngoingQuests")
                .where("owner", "==", getters.getUser.data.userId) // Firebase evaluates the query against its potential result set. https://firebase.google.com/docs/firestore/security/rules-query#secure_and_query_documents_based_on_authuid
                .where("taskId", "==", payload.taskId)
                .limit(1)
                .get()
                .then((docRef) => {
                    const storeQuest = docRef.docs[0];
                    storeQuest.ref
                        .update({
                            complete: true,
                            dateCompleted: new Date(),
                        })
                        .then(() => {
                            console.log("Finish quest success");

                            // Then update player stats. In state first.
                            // Get finished quest and task object from state.
                            const finishedQuest: Quest = this.state.quests.filter(
                                (quest) => {
                                    return quest.id === storeQuest.id;
                                }
                            )[0];
                            const finishedTask: Task = this.state.tasks.filter(
                                (task) => {
                                    return task.id === payload.taskId;
                                }
                            )[0];

                            ////console.log(finishedQuest.dateCreated);

                            // Finding what stats are increasing.
                            const newStats: Stats = UpdateStats(
                                finishedQuest,
                                finishedTask,
                                this.state.playerStats
                            );

                            // Commit to state.
                            const playerStats = newStats;
                            commit("SET_STATS", { playerStats });

                            // Firestore.
                            if (this.state.user != null) {
                                db.collection("PlayerStats")
                                    .doc(getters.getUser.data.userId)
                                    .update({
                                        //TODO Relevant stats will be updated (currently xp reward is just a number)
                                        stats: newStats,
                                    })
                                    .then(() => {
                                        dispatch("FETCH_SKILLS");
                                        dispatch("FETCH_QUESTS");
                                    })
                                    .catch((error) => {
                                        console.error("Error: ", error);
                                    });
                            }
                        });
                })
                .catch((error) => {
                    console.error("Error: ", error);
                });
        },
        // Delete a quest.
        DELETE_QUEST({ dispatch }, payload) {
            //TODO update state first.
            // Delete quest.
            db.collection("OngoingQuests")
                .where("taskId", "==", payload.taskId)
                .limit(1)
                .get()
                .then((docRef) => {
                    const storeQuest = docRef.docs[0];
                    storeQuest.ref.delete().then(() => {
                        dispatch("FETCH_QUESTS");

                        console.log("Delete quest success");
                    });
                });
        },
    },

    modules: {},
});

firebase.auth().onAuthStateChanged((user) => {
    store.dispatch("FETCH_AUTH_STATUS", user);
});

export default store;
