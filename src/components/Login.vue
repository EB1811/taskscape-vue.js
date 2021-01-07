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

      <button class="class">Login</button>
    </form>
    
    <div class="class">
        {{user}}
    </div>
  </div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src
import { mapGetters } from 'vuex';

export default defineComponent({
    data() {
        return {
            email: '',
            password: ''
        }
    },
    computed: {
        ...mapGetters({
            user: 'getUser'
        })
    },
    methods: {
        handleSubmit() {
            if(this.email && this.password) {
                this.$store.dispatch('LOGIN', {
                  email: this.email,
                  password: this.password
                })
            }
        }
    }
});
</script>