<template>
  <div class="class">
        <h1>
            Tasks:
        </h1>
        <h1 v-for="task in tasks" :key="task.name">
            {{ task.name }} | Status: {{task.complete ? 'Complete' : 'Ongoing'}}
            <input type="checkbox" :checked="task.complete" :disabled="task.complete" @change="finishTask(task)"/>
        </h1>
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
        }
    },
    computed: {
        ...mapGetters({
            tasks: 'getTasks'
        })
    }
})
</script>