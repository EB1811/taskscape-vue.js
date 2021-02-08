<template>
    <div class="row mt-2 g-2" v-if="type === 'ongoing'">
        <div
            class="col-xm-12 col-md-6 col-lg-4 col-xl-3"
            v-for="quest in ongoingQuests"
            :key="quest.id"
        >
            <div class="card" style="text-align: left;left; height: 150px">
                <div class="card-body">
                    <h4 class="card-title">{{ quest.name }}</h4>
                    <h6 class="card-subtitle text-muted mb-2">
                        Status: Ongoing
                    </h6>
                    <h6 class="card-subtitle text-muted">
                        Reward: {{ quest.expReward }}xp
                    </h6>
                </div>
            </div>
        </div>
    </div>
    <div class="row mt-2 g-2" v-else-if="type === 'complete'">
        <div
            class="col-xm-12 col-md-6 col-lg-4 col-xl-3"
            v-for="quest in completedQuests"
            :key="quest.id"
        >
            <div class="card" style="text-align: left; width: auto">
                <div class="card-body">
                    <h5 class="card-title">{{ quest.name }}</h5>
                    <h6 class="card-subtitle text-muted mb-2">
                        Status: Complete
                    </h6>
                    <h6 class="card-subtitle text-muted">
                        Reward: {{ quest.expReward }}xp
                    </h6>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue";
import { mapGetters } from "vuex";

export default defineComponent({
    props: ["type"],
    computed: {
        ...mapGetters({
            ongoingQuests: "getOngoingQuests",
            completedQuests: "getCompletedQuests",
        }),
    },
});
</script>
