<template>
    <NavBar />
    <div class="container-fluid min-vh-100 formPage">
        <div
            class="row navbarOverlap justify-content-center align-items-center min-vh-100"
        >
            <div
                class="col-10 col-sm-8 col-md-6 col-lg-5 col-xl-4 centerCard m-3"
                style="max-width: 500px"
            >
                <CreateTask />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src
import CreateTask from "@/components/CreateTask.vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
    components: { CreateTask, NavBar },
});
</script>
