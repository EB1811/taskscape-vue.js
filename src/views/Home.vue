<template>
    <div class="container-fluid min-vh-100 mainPage">
        <div
            class="row justify-content-center align-items-center"
            style="min-height: 50vh"
        >
            <div class="col-xs-12 col-sm-3 m-3">
                <h1 class="mainTitle">TaskScape</h1>
                <h6 class="mainDesc">
                    Complete Tasks. Earn Experience. Level Up.
                </h6>
            </div>
        </div>
        <div
            class="row justify-content-center allign-items-center"
            style="min-height: 50vh"
        >
            <div class="col-sm-4" style="max-width: 750px">
                <div style="display: inline-block" class="mx-2">
                    <router-link to="/tasks">
                        <button class="btn btn-lg btn-outline-primary">
                            Go to Dashboard
                        </button>
                    </router-link>
                </div>
                <div style="display: inline-block" class="mx-2">
                    <router-link to="/register">
                        <button class="btn btn-lg btn-outline-primary">
                            Create Account
                        </button>
                    </router-link>
                </div>
            </div>
        </div>
    </div>
</template>

<script lang="ts">
import { defineComponent } from "vue"; // @ is an alias to /src

export default defineComponent({});
</script>

<style lang="scss">
.centerCard {
    background-color: #fff;
    padding: 100px 50px;
    box-shadow: 0 1px 4px #b3b3b3;
    font-size: 1rem;
    font-weight: 600;
}
.formPage {
    background-color: aliceblue;
}
.mainPage {
    background-color: #232324;
}
.mainTitle {
    font-size: 75px;
    color: #ff6f2c;
}
.mainDesc {
    font-size: 20px;
    color: #fff;
}
</style>
