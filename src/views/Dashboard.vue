<template>
    <NavBar/>
  <div class="container-fluid min-vh-100">
      <div class="row min-vh-100">
          <div class="col-md-2 sidebar navbarOverlap">
              <div class="container-fluid">
                <ul class="nav flex-column mt-4">
                    <li class="nav-item">
                        <router-link to="/dashboard" class="nav-link" id="active">
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
                        <router-link to="/tasks" class="nav-link">
                            Tasks
                        </router-link>
                    </li>
                    <li class="nav-item mt-5">
                        <router-link to="/create" class="nav-link mx-auto" id="create">
                            Create Task
                        </router-link>
                    </li>
              </ul>
              </div>
          </div>
          <div class="col-md-10 navbarOverlap">
              <div class="container-fluid">
                <div class="row mt-3">
                    <h1 class="display-3" style="display: inline-block; width: auto">
                        Dashboard
                    </h1>
                </div>
                <div class="row mt-5">
                    <h1 class="display-6" style="display: inline-block; width: auto">
                        Stats
                    </h1>
                </div>
                <hr/>
                <StatList/>
                <div class="row mt-5">
                    <h1 class="display-6" style="display: inline-block; width: auto">
                        Ongoing Quests
                    </h1>
                </div>
                <hr/>
                <QuestList type="ongoing"/>
                <div class="row mt-5">
                    <h1 class="display-6" style="display: inline-block; width: auto">
                        Ongoing Tasks
                    </h1>
                </div>
                <hr/>
                <TaskList type="ongoing"/>
              </div>
          </div>
      </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src
import StatList from '@/components/StatList.vue';
import TaskList from '@/components/TaskList.vue';
import QuestList from '@/components/QuestList.vue';
import NavBar from '@/components/NavBar.vue';

export default defineComponent({
  components: { StatList, TaskList, QuestList, NavBar },
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
#active {
    color: #51cc67;
}
.sidebar .nav-link:hover {
    color: #51cc67;
}
#create {
    background-color: #e2e2e2;
    color: #4d4d4d;
    max-width: 175px;
}
#create:hover {
    background-color: #7af190;
}
.navbarOverlap {
    margin-top: 57px;
}
</style>