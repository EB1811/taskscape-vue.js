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
            <label class="form-label me-4">Estimated length in hours: </label>
            <input
                type="number"
                class="form-control form-control-sm"
                required
                v-model="time"
            />
        </div>
        <div class="mb-5">
            <label class="form-label me-4">Due Date (Optional): </label>
            <input
                type="date"
                class="form-control form-control-sm"
                v-model="dueDate"
            />
        </div>

        <div style="text-align: center">
            <button class="btn btn-outline-dark">Create Task</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src

//TODO Due date validation: can't be before todays date.

export default defineComponent({
    data() {
        return {
            name: "",
            desc: "",
            difficulty: [
                { text: "Very Easy", value: 1 },
                { text: "Easy", value: 2 },
                { text: "Slightly Challenging", value: 3 },
                { text: "Challenging", value: 4 },
                { text: "Very Hard", value: 5 },
                { text: "Extremely Hard", value: 6 },
            ],
            selectedDifficulty: 0,
            time: "",
            dueDate: "",
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
                    dueDate: this.dueDate ? new Date(this.dueDate) : null,
                });

                this.$router.push("/dashboard");
                ////console.log(this.$store.state.tasks)
                ////console.log(this.$store.state.quests)
            }
        },
    },
});
</script>
