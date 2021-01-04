<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="class">
        <label>Name</label>
        <input type="text" required v-model="name">
      </div>
      <div class="class">
        <label>Description (optional)</label>
        <textarea v-model="desc"/>
      </div>
      <div class="class">
        <label>Difficulty {{selectedDifficulty}}</label>
        <select v-model="selectedDifficulty" required>
          <option disabled value="">Please select one</option>
          <option v-for="option in difficulty" :value="option.value" :key="option.text">
            {{ option.text }}
          </option>
        </select>
      </div>
      <div class="class">
        <label>Estimated length</label>
        <input type="number" required v-model="time">
      </div>

      <button class="class">Create Task</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src
import { Task } from '@/types';

export default defineComponent({
    data() {
        return {
            name: '',
            desc: '',
            difficulty: [
              { text: 'Easy', value: 1 },
              { text: 'Medium', value: 2 },
              { text: 'Hard', value: 3 }
            ],
            selectedDifficulty: 0,
            time: ''
        }
    },
    methods: {
        handleSubmit() {
            if(this.name && this.difficulty && this.time) {
                this.$store.commit('ADD_TASK', {
                  name: this.name,
                  desc: this.desc,
                  difficulty: this.selectedDifficulty,
                  time: parseInt(this.time)
                } as Task)

                ////console.log(this.$store.state.tasks)
            }
        }
    }
});
</script>