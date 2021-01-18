<template>
  <div class="row my-4" style="text-align: left">
      <h4 style="width: auto" v-for="[name, level] in Object.entries(playerStats)" :key="name">
          {{ name }}: {{ level.level }} <br/> exp to next level: {{level.xpToNext}}
      </h4>
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