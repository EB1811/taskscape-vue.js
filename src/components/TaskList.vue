<template>
  <div class="class">
        <h1>
            Tasks:
        </h1>
        <h1 v-for="task in tasks" :key="task.name">
            {{ task.name }} | Status: {{task.complete ? 'Complete' : 'Ongoing'}}
            <input type="checkbox" @change="finishTask(task.id)"/>
        </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    methods: {
        finishTask(taskId: string) {
            this.$store.dispatch('FINISH_TASK', {
                taskId: taskId
            })
        }
    },
    computed: {
        ...mapGetters({
            tasks: 'getTasks'
        })
    }
})
</script>