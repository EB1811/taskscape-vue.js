<template>
  <div>
    <form @submit.prevent="handleSubmit">
      <div class="class">
        <label>Email</label>
        <input type="email" required v-model="email">
      </div>
      <div class="class">
        <label>Password</label>
        <input type="password" required v-model="password">
      </div>

      <button class="class">Create Account</button>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src

export default defineComponent({
    data() {
        return {
            email: '',
            password: ''
        }
    },
    methods: {
        handleSubmit() {
            if(this.email && this.password) {
                this.$store.dispatch('CREATE_ACCOUNT', {
                  email: this.email,
                  password: this.password
                })
            }
        }
    }
});
</script>