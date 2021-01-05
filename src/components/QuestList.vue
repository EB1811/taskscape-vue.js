<template>
  <div class="class">
      <h1>
          Quests
      </h1>
      
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';

export default defineComponent({
    computed: {
        quests() {
            return this.$store.state.quests;
        }
    }
})
</script>