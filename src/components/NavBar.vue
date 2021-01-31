<template>
    <nav
        class="navbar navbar-expand navbar-light justify-content-center align-items-start"
        style="background-color: #fff; border-bottom: solid 1px #dddddd"
    >
        <div class="ms-auto me-3 navBarSize">
            <ul class="navbar-nav ms-auto">
                <SignedInLinks v-if="user.loggedIn" />
                <SignedOutLinks v-else />
            </ul>
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
