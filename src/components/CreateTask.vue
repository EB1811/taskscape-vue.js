<template>
    <form @submit.prevent="handleSubmit" style="text-align: left">
        <div class="mb-3">
            <label class="form-label">Name</label>
            <input
                class="form-control form-control-sm"
                type="text"
                required
                v-model="name"
            />
        </div>
        <div class="mb-3">
            <label class="form-label">Description (optional)</label>
            <textarea class="form-control form-control-sm" v-model="desc" />
        </div>
        <div class="mb-3">
            <label class="form-label me-4">Difficulty: </label>
            <select
                v-model="selectedDifficulty"
                required
                class="form-select form-select-sm"
            >
                <option disabled value="">Please select one</option>
                <option
                    v-for="option in difficulty"
                    :value="option.value"
                    :key="option.text"
                >
                    {{ option.text }}
                </option>
            </select>
        </div>
        <div class="mb-5">
            <label class="form-label me-4">Estimated length: </label>
            <input
                type="number"
                class="form-control form-control-sm"
                required
                v-model="time"
            />
        </div>

        <div style="text-align: center">
            <button class="btn btn-outline-dark">Create Task</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src

export default defineComponent({
    data() {
        return {
            name: "",
            desc: "",
            difficulty: [
                { text: "Easy", value: 1 },
                { text: "Medium", value: 2 },
                { text: "Hard", value: 3 },
            ],
            selectedDifficulty: 0,
            time: "",
        };
    },
    methods: {
        handleSubmit() {
            if (this.name && this.difficulty && this.time) {
                this.$store.dispatch("CREATE_QUEST", {
                    name: this.name,
                    desc: this.desc,
                    difficulty: this.selectedDifficulty,
                    time: parseInt(this.time),
                });

                this.$router.push("/dashboard");

                ////console.log(this.$store.state.tasks)
                ////console.log(this.$store.state.quests)
            }
        },
    },
});
</script>
