<template>
  <div>
    <button class="class" @click="logout">
        Logout
    </button>
  </div>
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