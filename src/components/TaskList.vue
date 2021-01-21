<template>
  <div class="row my-2 g-2">
      <div class="col-md-2" v-for="task in tasks" :key="task.name">
        <div class="card" style="text-align: left; width: auto">
            <div class="card-body">
                <h4 class="card-title">{{ task.name }}</h4>
                <h6 class="card-subtitle text-muted mb-2">Status: {{task.complete ? 'Complete' : 'Ongoing'}}</h6>
                <div class="mt-5">
                    <button class="btn btn-sm btn-outline-success" :disabled="task.complete" @click="finishTask(task)">
                        Complete
                    </button>
                    <button class="btn btn-sm btn-outline-danger ms-2" @click="deleteTask(task)">
                        Delete
                    </button>
                </div>
            </div>
        </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';
import { Task } from '@/types'

export default defineComponent({
    methods: {
        finishTask(task: Task) {
            if(!task.complete) {
                this.$store.dispatch('FINISH_TASK', {
                    finishedTaskId: task.id
                })
            }
            else {
                console.log("Error: task already complete");
            }
        },
        deleteTask(task: Task) {
            if(!task.complete) {
                this.$store.dispatch('DELETE_TASK', {
                    deletedTaskId: task.id
                })
            }
            else {
                console.log("Error: task already complete");
            }
        }
    },
    computed: {
        ...mapGetters({
            tasks: 'getTasks'
        })
    }
})
</script>