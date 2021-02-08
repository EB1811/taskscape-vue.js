<template>
    <NavBar />
    <div class="container-fluid min-vh-100">
        <div class="row min-vh-100">
            <div class="col-sm-4 col-md-4 col-lg-3 col-xl-2 sidebar">
                <div class="sidebarSticky navbarOverlap">
                    <ul class="nav flex-column">
                        <router-link
                            to="/dashboard"
                            class="nav-link"
                            style="padding: 0px"
                        >
                            <li class="sidebarBlockNav">
                                <span>Dashboard</span>
                            </li>
                        </router-link>
                        <router-link
                            to="/player"
                            class="nav-link"
                            style="padding: 0px"
                        >
                            <li class="sidebarBlockNav">
                                <span>Player</span>
                            </li>
                        </router-link>
                        <router-link
                            to="/quests"
                            class="nav-link"
                            style="padding: 0px"
                        >
                            <li class="sidebarBlockNav" id="active">
                                <span>Quests</span>
                            </li>
                        </router-link>
                        <router-link
                            to="/tasks"
                            class="nav-link"
                            style="padding: 0px"
                        >
                            <li class="sidebarBlockNav">
                                <span>Tasks</span>
                            </li>
                        </router-link>
                        <router-link
                            to="/create"
                            class="nav-link  mt-5"
                            style="padding: 0px"
                        >
                            <button class="btn btn-md btn-outline-dark">
                                <span>Create Task</span>
                            </button>
                        </router-link>
                    </ul>
                </div>
            </div>
            <div
                class="col-sm-8 col-md-8 col-lg-9 col-xl-10 ms-auto navbarOverlap"
                style="border-left: solid 1px #dddddd"
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
