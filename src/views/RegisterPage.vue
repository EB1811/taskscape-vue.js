<template>
    <NavBar />
    <div class="container-fluid min-vh-100 formPage">
        <div
            class="row min-vh-100 justify-content-center align-items-center mx-1"
        >
            <div
                class="col-xs-12 col-sm-8 col-md-6 col-lg-5 col-xl-4 centerCard"
                style="max-width: 450px"
            >
                <Register />
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src
import Register from "@/components/Register.vue";
import NavBar from "@/components/NavBar.vue";

export default defineComponent({
    components: { Register, NavBar },
});
</script>
