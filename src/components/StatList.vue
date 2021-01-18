<template>
  <div class="row mt-4">
      <div style="text-align: left" v-for="[name, level] in Object.entries(playerStats)" :key="name">
          <h4>{{ name }}</h4>
          <p>Level: {{ level.level }}<br/>Exp to next level: {{level.xpToNext}}</p>
      </div>
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