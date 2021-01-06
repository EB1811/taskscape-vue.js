<template>
  <div>
    <StatList/>
    <CreateTask/>
    <TaskList/>
    <QuestList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src

import CreateTask from '@/components/CreateTask.vue';
import StatList from '@/components/StatList.vue';
import TaskList from '@/components/TaskList.vue';
import QuestList from '@/components/QuestList.vue';

export default defineComponent({
  components: { CreateTask, StatList, TaskList, QuestList },
});
</script>
