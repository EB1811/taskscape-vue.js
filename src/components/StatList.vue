<template>
  <div class="class">
      <h1 v-for="[name, level] in Object.entries(playerStats)" :key="name">
          {{ name }}: {{ level.level }}, exp to next level: {{level.xpToNext}}
      </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    computed: {
        ...mapGetters({
            playerStats: 'getStats'
        })
    }
})
</script>