<template>
  <div>
    <StatList/>
    <CreateTask/>
    <QuestList/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src

import CreateTask from '../components/CreateTask.vue';
import StatList from '../components/StatList.vue';
import QuestList from '../components/QuestList.vue';

export default defineComponent({
  components: { CreateTask, StatList, QuestList },
});
</script>
