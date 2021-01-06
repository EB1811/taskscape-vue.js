<template>
  <div class="class">
        <h1>
            Quests:
        </h1>
        <h1 v-for="quest in quests" :key="quest.name">
            {{ quest.name }} | Reward: {{ quest.expReward }} | Status: {{quest.complete ? 'Complete' : 'Ongoing'}}
        </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    computed: {
        ...mapGetters({
            quests: 'getQuests'
        })
    }
})
</script>