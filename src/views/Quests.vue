<template>
    <NavBar />
    <div class="container-fluid min-vh-100">
        <div class="row min-vh-100">
            <div
                class="col-sm-4 col-md-4 col-lg-3 col-xl-2 sidebar navbarOverlap"
            >
                <div class="container-fluid">
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
                            <router-link
                                to="/quests"
                                class="nav-link"
                                id="active"
                            >
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
                            Quests
                        </h1>
                    </div>
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
                            Completed Quests
                        </h1>
                    </div>
                    <hr />
                    <QuestList type="complete" />
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src
import QuestList from "@/components/QuestList.vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
    components: { QuestList, NavBar },
});
</script>

<style lang="scss"></style>
