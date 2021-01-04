<template>
  <div>
    <StatList/>
    <CreateTask/>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src

import CreateTask from '../components/CreateTask.vue';
import StatList from '../components/StatList.vue';

export default defineComponent({
  components: { CreateTask, StatList },
});
</script>
