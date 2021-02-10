<template>
    <form @submit.prevent="handleSubmit" style="text-align: left">
        <div class="mb-3">
            <label class="form-label">Email</label>
            <input
                class="form-control form-control-sm"
                type="email"
                required
                v-model="email"
            />
        </div>
        <div class="mb-4">
            <label class="form-label">Password</label>
            <input
                class="form-control form-control-sm"
                type="password"
                required
                v-model="password"
            />
        </div>
        <div class="alert alert-danger" role="alert" v-if="error">
            <span style="font-size: 0.9rem; font-weight: 400">{{ error }}</span>
        </div>

        <div style="text-align: center">
            <button class="btn btn-outline-dark">Login</button>
        </div>
    </form>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src
export default defineComponent({
    data() {
        return {
            email: "",
            password: "",
            error: "",
        };
    },
    methods: {
        //TODO Cant login if already logged in + styling if login error e.g., wrong password.
        handleSubmit() {
            if (this.email && this.password) {
                this.$store
                    .dispatch("LOGIN", {
                        email: this.email,
                        password: this.password,
                    })
                    .then(() => {
                        this.$router.push("dashboard");
                    })
                    .catch((err: Error) => {
                        this.error = "Login Error: " + err.message;
                    });
            }
        },
    },
});
</script>
