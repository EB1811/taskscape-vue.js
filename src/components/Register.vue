<template>
    <div>
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
                <span style="font-size: 0.9rem; font-weight: 400">{{
                    error
                }}</span>
            </div>
            <div style="text-align: center">
                <button class="btn btn-outline-dark">Create Account</button>
            </div>
        </form>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src

//TODO Add Player name, etc.
export default defineComponent({
    data() {
        return {
            email: "",
            password: "",
            error: "",
        };
    },
    methods: {
        handleSubmit() {
            if (this.email && this.password) {
                this.$store
                    .dispatch("CREATE_ACCOUNT", {
                        email: this.email,
                        password: this.password,
                    })
                    .then(() => {
                        this.$router.push("dashboard");
                    })
                    .catch((err: Error) => {
                        this.error = "Signup Error: " + err.message;
                    });
            }
        },
    },
});
</script>
