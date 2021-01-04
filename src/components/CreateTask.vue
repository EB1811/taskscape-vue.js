<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="class">
        <label>Name</label>
        <input type="text" required v-model="name">
      </div>
      <div class="class">
        <label>Difficulty</label>
        <input type="number" required v-model="difficulty">
      </div>
      <div class="class">
        <label>Estimated time</label>
        <input type="number" required v-model="time">
      </div>

      <button class="class">Create Task</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src

export default defineComponent({
    data() {
        return {
            name: '',
            difficulty: 0,
            time: 0
        }
    },
    methods: {
        handleSubmit() {
            if(this.name && this.difficulty && this.time) {
                console.log(this.name + " " + this.difficulty + " " + this.time)
            }
        }
    }
});
</script>