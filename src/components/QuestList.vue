<template>
    <div class="row mt-2 g-2">
        <div class="col-md-3" v-for="quest in quests" :key="quest.name">
            <div class="card" style="text-align: left; width: auto">
                <div class="card-body">
                    <h4 class="card-title">{{ quest.name }}</h4>
                    <h6 class="card-subtitle text-muted mb-2">Status: {{quest.complete ? 'Complete' : 'Ongoing'}}</h6>
                    <h6 class="card-subtitle text-muted">Reward: {{ quest.expReward }}xp</h6>
                </div>
            </div>
        </div>
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