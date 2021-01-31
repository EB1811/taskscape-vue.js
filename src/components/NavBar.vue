<template>
    <nav
        class="navbar navbar-expand fixed-top navbar-dark justify-content-center align-items-start"
        style="background-color: #393939; border-bottom: solid 1px #dddddd"
    >
        <div class="container-fluid">
            <div class="me-auto order-0">
                <router-link
                    to="/"
                    class="navbar-brand ms-1"
                    style="color: #ff6f2c"
                    >TaskScape</router-link
                >
            </div>
            <div class="order-1 me-1 navBarSize" style="">
                <ul class="navbar-nav ms-auto">
                    <SignedInLinks v-if="user.loggedIn" />
                    <SignedOutLinks v-else />
                </ul>
            </div>
        </div>
    </nav>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src
import { mapGetters } from "vuex";
import SignedInLinks from "@/components/SignedInLinks.vue";
import SignedOutLinks from "@/components/SignedOutLinks.vue";

export default defineComponent({
    components: { SignedInLinks, SignedOutLinks },
    computed: {
        ...mapGetters({
            user: "getUser",
        }),
    },
});
</script>

<style lang="scss">
.navBarSize {
    height: 41px;
}
.navbar-brand {
    font-size: 27.5px;
}
@media only screen and (max-width: 375px) {
    .navLinkSize {
        font-size: 0.825em;
    }
}
</style>
