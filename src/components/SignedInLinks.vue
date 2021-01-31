<template>
    <li class="nav-item">
        <span
            class="navLinkSize"
            style="padding: 0.5rem; margin: 0px; color: black; display: inline-block"
            >Logged In</span
        >
    </li>
    <li class="nav-item">
        <router-link to="/" @click="logout" class="nav-link navLinkSize"
            >Logout</router-link
        >
    </li>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src

export default defineComponent({
    methods: {
        logout() {
            this.$store.dispatch("LOGOUT");

            this.$router.push("/");
        },
    },
});
</script>

<style lang="scss"></style>
