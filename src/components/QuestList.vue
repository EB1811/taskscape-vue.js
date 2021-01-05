<template>
  <div class="class">
        <h1>
            Quests
        </h1>
        <!--<h1 v-for="quest in quests" :key="quest.name">
            {{ quest.name }}: {{ quest.expReward }}
        </h1>-->
        <h1 v-for="task in tasks" :key="task.id">
            {{ task.name }}
        </h1>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import { mapGetters } from 'vuex';

export default defineComponent({
    computed: {
        /*quests() {
            return this.$store.state.quests;
        }*/

        ...mapGetters({
            tasks: 'getTasks'
        })
    }
})
</script>