<template>
    <NavBar />
    <div class="container-fluid min-vh-100">
        <div class="row min-vh-100">
            <div
                class="col-sm-4 col-md-4 col-lg-3 col-xl-2 sidebar navbarOverlap"
            >
                <div class="container-fluid sidebarSticky">
                    <ul class="nav flex-column mt-4">
                        <li class="nav-item">
                            <router-link
                                to="/dashboard"
                                class="nav-link"
                                id="active"
                            >
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
                            <router-link
                                to="/create"
                                class="nav-link mx-auto"
                                id="create"
                            >
                                Create Task
                            </router-link>
                        </li>
                    </ul>
                </div>
            </div>
            <div
                class="col-sm-8 col-md-8 col-lg-9 col-xl-10 navbarOverlap ms-auto"
            >
                <div class="container-fluid">
                    <div class="row mt-3">
                        <h1
                            class="display-3"
                            style="display: inline-block; width: auto"
                        >
                            Dashboard
                        </h1>
                    </div>
                    <div class="row mt-5">
                        <h1
                            class="display-6"
                            style="display: inline-block; width: auto"
                        >
                            Stats
                        </h1>
                    </div>
                    <hr />
                    <StatList />
                    <div class="row mt-5">
                        <h1
                            class="display-6"
                            style="display: inline-block; width: auto"
                        >
                            Ongoing Quests
                        </h1>
                    </div>
                    <hr />
                    <QuestList type="ongoing" />
                    <div class="row mt-5">
                        <h1
                            class="display-6"
                            style="display: inline-block; width: auto"
                        >
                            Ongoing Tasks
                        </h1>
                    </div>
                    <hr />
                    <TaskList type="ongoing" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src
import StatList from "@/components/StatList.vue";
import TaskList from "@/components/TaskList.vue";
import QuestList from "@/components/QuestList.vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
    components: { StatList, TaskList, QuestList, NavBar },
});
</script>

<style lang="scss">
.sidebar {
    background-color: #f8f9fa;
    border-right: solid 1px #c7c7c7;
    font-size: 0.9rem;
    position: fixed;
    top: 0;
    bottom: 0;
    left: 0;
    z-index: 100;
    padding: 0;
}
.sidebar .nav-link {
    font-weight: 700;
    color: #777777;
}
.sidebarSticky {
    position: sticky;
}
#active {
    color: #ff6f2c;
}
.sidebar .nav-link:hover {
    color: #ff6f2c;
}
#create {
    background-color: #e2e2e2;
    color: #4d4d4d;
    max-width: 175px;
}
#create:hover {
    background-color: #ff6f2c;
    color: #fff;
}
.navbarOverlap {
    margin-top: 57px;
}

@media only screen and (max-width: 575px) {
    .sidebar {
        border-right: none;
        padding-bottom: 10px;
        position: relative;
    }
}
</style>
