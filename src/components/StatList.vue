<template>
  <div class="class">
      <h1 v-for="[name, level] in Object.entries(playerStats)" :key="name">
          {{ name }}: {{ level.level }}
      </h1>
  </div>
</template>

<script>
import { defineComponent } from 'vue';

export default defineComponent({
    computed: {
        playerStats(){
            return this.$store.state.playerStats;
        }
    }
})
</script>