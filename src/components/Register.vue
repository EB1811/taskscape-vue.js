<template>
  <div>
    <form @submit.prevent="handleSubmit" style="text-align: left">
      <div class="mb-3">
        <label class="form-label">Email</label>
        <input class="form-control form-control-sm" type="email" required v-model="email">
      </div>
      <div class="mb-3">
        <label class="form-label">Password</label>
        <input class="form-control form-control-sm" type="password" required v-model="password">
      </div>

      <div style="text-align: center" class="mt-5">
        <button class="btn btn-outline-dark">Create Account</button>
      </div>
    </form>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src

//TODO Add Player name, etc. 
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

                this.$router.push('dashboard')
            }
        }
    }
});
</script>