<template>
  <div>
    <Register/>
    <Login/>
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
import Login from '@/components/Login.vue';
import Register from '@/components/Register.vue';

export default defineComponent({
  components: { CreateTask, StatList, TaskList, QuestList, Login, Register },
});
</script>

<style lang="scss">
.centerCard {
  background-color: #fff;
  padding: 100px 50px;
  box-shadow: 0 1px 4px #b3b3b3;
  font-size: 1rem;
  font-weight: 600;
}
.formPage {
  background-color: aliceblue;
}
</style>
