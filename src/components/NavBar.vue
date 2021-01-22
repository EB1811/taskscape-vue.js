<template>
    <nav class="navbar navbar-expand navbar-dark justify-content-center align-items-start" style="background-color: #555555;">
        <div class="me-auto order-0">
            <router-link to="/" class="navbar-brand ms-4" id="active" style="font-size: 27.5px">TaskScape</router-link>
        </div>
        <div class="order-1 me-4" style="height: 41px">
            <ul class="navbar-nav ms-auto">
                <SignedInLinks v-if="user.LoggedIn"/>
                <SignedOutLinks v-else />
            </ul>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from 'vue';// @ is an alias to /src
import { mapGetters } from 'vuex';
import SignedInLinks from '@/components/SignedInLinks.vue';
import SignedOutLinks from '@/components/SignedOutLinks.vue';


export default defineComponent({
    components: { SignedInLinks, SignedOutLinks },
    computed: {
        ...mapGetters({
            user: 'getUser'
        })
    }
});
</script>

<style lang="scss">

</style>