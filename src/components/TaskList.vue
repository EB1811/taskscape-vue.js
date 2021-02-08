<template>
    <div class="row my-2 g-2" v-if="type === 'ongoing'">
        <div
            class="col-xm-12 col-md-6 col-lg-4 col-xl-2"
            v-for="task in ongoingTasks"
            :key="task.id"
        >
            <div class="card-group">
                <div class="card" style="text-align: left; width: auto">
                    <div class="card-body">
                        <h4 class="card-title">{{ task.name }}</h4>
                        <h6 class="card-subtitle text-muted mb-2">
                            Status: Ongoing
                        </h6>
                        <h6
                            class="card-subtitle text-muted mb-2"
                            v-if="task.dueDate"
                        >
                            Due:
                            {{ task.dueDate.toLocaleDateString() }}
                        </h6>
                        <div class="mt-5">
                            <button
                                class="btn btn-sm btn-outline-success"
                                @click="finishTask(task)"
                            >
                                Complete
                            </button>
                            <button
                                class="btn btn-sm btn-outline-danger m-2"
                                @click="deleteTask(task)"
                            >
                                Delete
                            </button>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    </div>
    <div class="row my-2 g-2" v-else-if="type === 'complete'">
        <div
            class="col-xm-12 col-md-6 col-lg-4 col-xl-2"
            v-for="task in completedTasks"
            :key="task.id"
        >
            <div class="card" style="text-align: left; width: auto">
                <div class="card-body">
                    <h5 class="card-title">{{ task.name }}</h5>
                    <h6 class="card-subtitle text-muted mb-2">
                        Status: Complete
                    </h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";
import { Task } from "@/types";

export default defineComponent({
    props: ["type"],
    methods: {
        finishTask(task: Task) {
            if (!task.complete) {
                this.$store.dispatch("FINISH_TASK", {
                    finishedTaskId: task.id,
                });
            } else {
                console.log("Error: task already complete");
            }
        },
        deleteTask(task: Task) {
            if (!task.complete) {
                this.$store.dispatch("DELETE_TASK", {
                    deletedTaskId: task.id,
                });
            } else {
                console.log("Error: task already complete");
            }
        },
    },
    computed: {
        ...mapGetters({
            ongoingTasks: "getOngoingTasks",
            completedTasks: "getCompletedTasks",
        }),
    },
});
</script>
