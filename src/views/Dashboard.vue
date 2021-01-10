<template>
  <div class="container-fluid min-vh-100">
      <div class="row min-vh-100">
          <div class="col-md-2 sidebar">
              <ul class="nav flex-column mt-4">
                  <li class="nav-item">
                      <router-link to="/" class="nav-link">
                        Dashboard
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/" class="nav-link">
                        Player
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/" class="nav-link">
                        Quests
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/" class="nav-link">
                        Tasks
                      </router-link>
                  </li>
                  <li class="nav-item mt-5">
                      <router-link to="/" class="nav-link" id="create">
                        Create Task
                      </router-link>
                  </li>
              </ul>
          </div>
          <div class="col-md-9">
              <h1 class="display-3 mt-5">
                  Dashboard
              </h1>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src

/*
import CreateTask from '@/components/CreateTask.vue';
import StatList from '@/components/StatList.vue';
import TaskList from '@/components/TaskList.vue';
import QuestList from '@/components/QuestList.vue';
*/

export default defineComponent({
  //components: { CreateTask, StatList, TaskList, QuestList},
});
</script>

<style lang="scss">
.sidebar {
    background-color: #f8f9fa;
    border-right: solid 1px #c7c7c7;
    font-size: 0.900rem;
}
.sidebar .nav-link {
    font-weight: 700;
    color: #777777;
}
.sidebar .nav-link:hover {
    color: #51cc67;
}
#create {
    background-color: #e9ebec;
    color: #666666;
}
#create:hover {
    background-color: #7af190;
}

</style>