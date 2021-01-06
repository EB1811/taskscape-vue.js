<template>
  <div class="class">
        <h1>
            Tasks:
        </h1>
        <h1 v-for="task in tasks" :key="task.name">
            {{ task.name }}
        </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    computed: {
        ...mapGetters({
            tasks: 'getTasks'
        })
    }
})
</script>