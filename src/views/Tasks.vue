<template>
  <div class="container-fluid min-vh-100">
      <div class="row min-vh-100">
          <div class="col-md-2 sidebar">
              <ul class="nav flex-column mt-4">
                  <li class="nav-item">
                      <router-link to="/dashboard" class="nav-link">
                        Dashboard
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/player" class="nav-link">
                        Player
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/quests" class="nav-link">
                        Quests
                      </router-link>
                  </li>
                  <li class="nav-item">
                      <router-link to="/tasks" class="nav-link"  id="active">
                        Tasks
                      </router-link>
                  </li>
                  <li class="nav-item mt-5">
                      <router-link to="/create" class="nav-link" id="create">
                        Create Task
                      </router-link>
                  </li>
              </ul>
          </div>
          <div class="col-md-10">
              <div class="container-fluid">
                <div class="row mt-5">
                    <h1 class="display-3" style="display: inline-block; width: auto">
                        Dashboard
                    </h1>
                </div>
                <div class="row mt-5">
                    <h1 class="display-6" style="display: inline-block; width: auto">
                        Ongoing Tasks
                    </h1>
                </div>
                <hr/>
                <TaskList/>
                <div class="row mt-5">
                    <h1 class="display-6" style="display: inline-block; width: auto">
                        Completed Tasks
                    </h1>
                </div>
                <hr/>
                <TaskList/>
              </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src
import TaskList from '@/components/TaskList.vue';

export default defineComponent({
  components: { TaskList },
});
</script>

<style lang="scss">
</style>