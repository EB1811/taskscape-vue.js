<template>
    <li class="nav-item">
        <span style="padding: 0.5rem; margin: 0px; font-size: 1rem; color: white; display: inline-block">Logged In</span>
    </li>
    <li class="nav-item">
        <router-link to="/" @click="logout" class="nav-link">Logout</router-link>
    </li>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src

export default defineComponent({
    methods: {
        logout() {
            this.$store.dispatch('LOGOUT')
        }
    }
});
</script>

<style lang="scss">

</style>